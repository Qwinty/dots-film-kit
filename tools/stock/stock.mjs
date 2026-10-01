#!/usr/bin/env node
// Free stock video and photos: Pexels, Pixabay, Coverr. Zero dependencies (Node 18+); needs ffmpeg and ffprobe on PATH.
//
//   node stock.mjs search "<query>" [--type video|photo] [--provider pexels,pixabay,coverr] [--n 6]
//        [--orientation landscape|portrait] [--sheet out.jpg] [--with frame.png]
//   node stock.mjs get <provider:id> [--type video|photo] [--out assets/stock] [--max-height 2160]
//
// search prints a JSON array of candidates. --sheet saves a numbered contact sheet; --with puts your own
// image (e.g. a frame of the original) first, labelled 0.
// get downloads the best rendition up to --max-height, probes it, fully decodes video, saves a 5-frame strip
// next to the file and appends a record to assets/manifest.jsonl. Prints the record as JSON.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

function parseArgs(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (!k.startsWith("--")) { a._.push(k); continue; }
    const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    a[k.slice(2)] = val;
  }
  return a;
}

function loadEnv() {
  let dir = process.cwd();
  for (;;) {
    const f = path.join(dir, ".env");
    if (fs.existsSync(f)) {
      for (const line of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
        if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
      return;
    }
    const up = path.dirname(dir);
    if (up === dir) return;
    dir = up;
  }
}

const KEYS = ["PEXELS_API_KEY", "PIXABAY_API_KEY", "COVERR_API_KEY"];
const scrub = (s) => KEYS.reduce((acc, k) => (process.env[k] ? acc.split(process.env[k]).join("***") : acc), String(s));
function key(name) {
  if (!process.env[name]) throw new Error(`${name} not found in .env`);
  return process.env[name];
}

async function getJSON(url, headers = {}) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(60_000) });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url.split("?")[0]}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

const enc = encodeURIComponent;
const pexelsTitle = (url) => (url?.match(/\/(?:video|photo)\/(.+)-\d+\/?$/)?.[1] ?? "").replace(/-/g, " ");

// Each normalizer returns { ref, type, title, author, page, width, height, duration, fps, thumb, files[], ai, license }.
const norm = {
  pexelsVideo: (v) => {
    const files = v.video_files.filter((f) => f.file_type === "video/mp4" && f.link)
      .map((f) => ({ url: f.link, width: f.width, height: f.height, fps: f.fps ?? null }));
    return { ref: `pexels:${v.id}`, type: "video", title: pexelsTitle(v.url), author: v.user?.name, page: v.url,
      width: v.width, height: v.height, duration: v.duration, fps: [...new Set(files.map((f) => f.fps).filter(Boolean))],
      thumb: v.image, files, ai: null, license: "Pexels License" };
  },
  pexelsPhoto: (p) => ({ ref: `pexels:${p.id}`, type: "photo", title: p.alt || pexelsTitle(p.url), author: p.photographer,
    page: p.url, width: p.width, height: p.height, duration: null, fps: null, thumb: p.src.medium,
    files: [{ url: p.src.original, width: p.width, height: p.height }], ai: null, license: "Pexels License" }),
  pixabayVideo: (h) => {
    const files = Object.values(h.videos || {}).filter((f) => f?.url)
      .map((f) => ({ url: f.url, width: f.width, height: f.height, fps: null }));
    const big = files.reduce((a, b) => (b.height > (a?.height ?? 0) ? b : a), null);
    return { ref: `pixabay:${h.id}`, type: "video", title: h.tags, author: h.user, page: h.pageURL,
      width: big?.width, height: big?.height, duration: h.duration, fps: null,
      thumb: h.videos?.medium?.thumbnail || h.videos?.large?.thumbnail, files, ai: h.isAiGenerated ?? null,
      license: "Pixabay Content License" };
  },
  pixabayPhoto: (h) => {
    const s = Math.min(1, 1280 / Math.max(h.imageWidth, h.imageHeight));
    return { ref: `pixabay:${h.id}`, type: "photo", title: h.tags, author: h.user, page: h.pageURL,
      width: h.imageWidth, height: h.imageHeight, duration: null, fps: null, thumb: h.webformatURL,
      files: [{ url: h.largeImageURL, width: Math.round(h.imageWidth * s), height: Math.round(h.imageHeight * s) }],
      ai: h.isAiGenerated ?? null, license: "Pixabay Content License" };
  },
  coverrVideo: (h) => ({ ref: `coverr:${h.id}`, type: "video", title: h.title, author: "Coverr",
    page: `https://coverr.co/videos/${h.slug}`, width: h.max_width, height: h.max_height, duration: Number(h.duration),
    fps: h.fps ?? null, thumb: h.thumbnail || h.poster,
    files: [{ url: h.urls?.mp4_download || h.urls?.mp4, width: h.max_width, height: h.max_height, fps: h.fps ?? null }],
    ai: h.is_ai_generated ?? null, premium: h.is_premium, license: "Coverr License" }),
};

const providers = {
  pexels: {
    video: {
      search: async (q, n, o) => (await getJSON(`https://api.pexels.com/videos/search?query=${enc(q)}&per_page=${n}${o ? `&orientation=${o}` : ""}`,
        { Authorization: key("PEXELS_API_KEY") })).videos.map(norm.pexelsVideo),
      byId: async (id) => norm.pexelsVideo(await getJSON(`https://api.pexels.com/videos/videos/${id}`, { Authorization: key("PEXELS_API_KEY") })),
    },
    photo: {
      search: async (q, n, o) => (await getJSON(`https://api.pexels.com/v1/search?query=${enc(q)}&per_page=${n}${o ? `&orientation=${o}` : ""}`,
        { Authorization: key("PEXELS_API_KEY") })).photos.map(norm.pexelsPhoto),
      byId: async (id) => norm.pexelsPhoto(await getJSON(`https://api.pexels.com/v1/photos/${id}`, { Authorization: key("PEXELS_API_KEY") })),
    },
  },
  pixabay: {
    video: {
      search: async (q, n) => (await getJSON(`https://pixabay.com/api/videos/?key=${key("PIXABAY_API_KEY")}&q=${enc(q)}&per_page=${Math.max(3, n)}`))
        .hits.slice(0, n).map(norm.pixabayVideo),
      byId: async (id) => norm.pixabayVideo((await getJSON(`https://pixabay.com/api/videos/?key=${key("PIXABAY_API_KEY")}&id=${id}`)).hits[0]),
    },
    photo: {
      search: async (q, n, o) => (await getJSON(`https://pixabay.com/api/?key=${key("PIXABAY_API_KEY")}&q=${enc(q)}&image_type=photo&per_page=${Math.max(3, n)}${o === "landscape" ? "&orientation=horizontal" : o === "portrait" ? "&orientation=vertical" : ""}`))
        .hits.slice(0, n).map(norm.pixabayPhoto),
      byId: async (id) => norm.pixabayPhoto((await getJSON(`https://pixabay.com/api/?key=${key("PIXABAY_API_KEY")}&id=${id}`)).hits[0]),
    },
  },
  coverr: {
    video: {
      search: async (q, n) => (await getJSON(`https://api.coverr.co/videos?query=${enc(q)}&page_size=${n * 2}&urls=true`,
        { Authorization: `Bearer ${key("COVERR_API_KEY")}` })).hits.filter((h) => !h.is_premium).slice(0, n).map(norm.coverrVideo),
      byId: async (id) => norm.coverrVideo(await getJSON(`https://api.coverr.co/videos/${id}?urls=true`,
        { Authorization: `Bearer ${key("COVERR_API_KEY")}` })),
    },
  },
};

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (r.error) throw new Error(`${cmd} failed to start: ${r.error.message}`);
  return r;
}

async function download(url, file) {
  const res = await fetch(url, { signal: AbortSignal.timeout(900_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url.split("?")[0]}`);
  const tmp = `${file}.part`;
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(tmp));
  fs.renameSync(tmp, file);
}

const FONT = "C:/Windows/Fonts/arial.ttf";
const label = (text) => (fs.existsSync(FONT)
  ? `,drawtext=fontfile='${FONT.replace(":", "\\:")}':text='${text}':x=8:y=6:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=6`
  : "");

async function contactSheet(items, withImage, out) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "stock-sheet-"));
  const tiles = [];
  if (withImage) tiles.push({ src: withImage, text: "0 REF" });
  for (const it of items) {
    if (!it.thumb) continue;
    const src = path.join(dir, `thumb_${it.n}`);
    try { await download(it.thumb, src); tiles.push({ src, text: String(it.n) }); } catch (e) { console.error(`thumb ${it.ref}: ${scrub(e.message)}`); }
  }
  tiles.forEach((t, i) => {
    const r = run("ffmpeg", ["-v", "error", "-y", "-i", t.src, "-frames:v", "1", "-vf",
      `scale=480:270:force_original_aspect_ratio=decrease,pad=480:270:(ow-iw)/2:(oh-ih)/2:color=black${label(t.text)}`,
      path.join(dir, `tile_${String(i).padStart(3, "0")}.png`)]);
    if (r.status !== 0) console.error(`tile ${t.text}: ${r.stderr.trim()}`);
  });
  const count = fs.readdirSync(dir).filter((f) => f.startsWith("tile_")).length;
  if (!count) throw new Error("no thumbnails to build a sheet");
  const cols = Math.min(4, count), rows = Math.ceil(count / cols);
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  const r = run("ffmpeg", ["-v", "error", "-y", "-start_number", "0", "-i", path.join(dir, "tile_%03d.png"),
    "-vf", `tile=${cols}x${rows}:padding=4:color=white`, "-frames:v", "1", out]);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.status !== 0) throw new Error(`sheet: ${r.stderr.trim()}`);
  return path.resolve(out);
}

async function search(a) {
  const query = a._[1];
  if (!query) throw new Error('usage: search "<query>" [--type video|photo]');
  const type = a.type || "video";
  const n = Number(a.n || 6);
  const names = (a.provider ? String(a.provider).split(",") : Object.keys(providers)).filter((p) => providers[p]?.[type]);
  const results = [];
  await Promise.all(names.map(async (p) => {
    try { results.push(...(await providers[p][type].search(query, n, a.orientation)).map((r) => ({ ...r, provider: p }))); }
    catch (e) { console.error(`${p}: ${scrub(e.message)}`); }
  }));
  results.sort((x, y) => names.indexOf(x.provider) - names.indexOf(y.provider));
  const items = results.map((r, i) => ({ n: i + 1, ...r, files: undefined, renditions: r.files.map((f) => `${f.width}x${f.height}${f.fps ? `@${f.fps}` : ""}`) }));
  const out = { query, type, count: items.length, items };
  if (a.sheet) out.sheet = await contactSheet(items, a.with, a.sheet);
  console.log(JSON.stringify(out, null, 1));
}

async function get(a) {
  const ref = a._[1];
  const [provider, id] = String(ref || "").split(":");
  const type = a.type || "video";
  if (!providers[provider]?.[type] || !id) throw new Error("usage: get <pexels|pixabay|coverr>:<id> [--type video|photo]");
  const item = await providers[provider][type].byId(id);
  const maxH = Number(a["max-height"] || 2160);
  const byQuality = [...item.files].sort((x, y) => (y.height - x.height) || (Math.abs((x.fps ?? 25) - 25) - Math.abs((y.fps ?? 25) - 25)));
  const pick = byQuality.find((f) => f.height <= maxH) || byQuality[byQuality.length - 1];
  if (!pick?.url) throw new Error(`no downloadable file for ${ref}`);

  const outDir = a.out || path.join("assets", "stock");
  fs.mkdirSync(outDir, { recursive: true });
  const ext = (path.extname(new URL(pick.url).pathname) || (type === "video" ? ".mp4" : ".jpg")).toLowerCase();
  let file = path.join(outDir, `${provider}_${id}_${pick.height}p${ext}`);
  if (!fs.existsSync(file)) await download(pick.url, file);

  const probe = run("ffprobe", ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", file]);
  if (probe.status !== 0) throw new Error(`ffprobe failed: ${probe.stderr.trim()}`);
  const info = JSON.parse(probe.stdout);
  const vs = info.streams.find((s) => s.codec_type === "video") || {};
  // Provider metadata can overstate the resolution (Coverr lists its maximum, the download is often 1080p).
  if (vs.height && vs.height !== pick.height) {
    const actual = path.join(outDir, `${provider}_${id}_${vs.height}p${ext}`);
    if (fs.existsSync(actual)) fs.rmSync(file); else fs.renameSync(file, actual);
    file = actual;
  }
  const sha256 = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  const rate = vs.avg_frame_rate && vs.avg_frame_rate !== "0/0" ? vs.avg_frame_rate : vs.r_frame_rate;
  const [num, den] = String(rate || "").split("/").map(Number);
  const fps = type === "video" && num ? Number((den ? num / den : num).toFixed(3)) : null;
  const duration = type === "video" && info.format?.duration ? Number(Number(info.format.duration).toFixed(3)) : null;

  const record = { time: new Date().toISOString(), ref, type, file: file.replace(/\\/g, "/"), sha256,
    bytes: fs.statSync(file).size, width: vs.width, height: vs.height, fps, duration, codec: vs.codec_name,
    title: item.title, author: item.author, page: item.page, license: item.license, ai_generated: item.ai };

  if (type === "video") {
    const dec = run("ffmpeg", ["-v", "error", "-i", file, "-f", "null", "-"]);
    record.decode_ok = dec.status === 0 && !dec.stderr.trim();
    if (!record.decode_ok) record.decode_errors = dec.stderr.trim().split("\n").slice(0, 5);
    const strip = `${file}.strip.jpg`;
    const s = run("ffmpeg", ["-v", "error", "-y", "-i", file, "-vf", `fps=${(5 / Math.max(duration || 5, 0.5)).toFixed(4)},scale=480:-2,tile=5x1:padding=4:color=white`, "-frames:v", "1", strip]);
    if (s.status === 0) record.strip = strip.replace(/\\/g, "/");
  }

  const manifest = path.join("assets", "manifest.jsonl");
  fs.mkdirSync(path.dirname(manifest), { recursive: true });
  fs.appendFileSync(manifest, JSON.stringify(record) + "\n");
  console.log(JSON.stringify(record, null, 1));
}

async function main() {
  const a = parseArgs(process.argv.slice(2));
  loadEnv();
  const cmd = a._[0];
  if (cmd === "search") return search(a);
  if (cmd === "get") return get(a);
  console.log(fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").slice(1, 12).join("\n"));
  process.exit(cmd ? 1 : 0);
}

main().catch((e) => {
  console.error(scrub(e.message || e));
  process.exit(1);
});
