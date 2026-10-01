# Media tools (optional)

The film may be pure code, or it may use free stock media. Using stock is allowed, not required. Every file you use
from outside this folder goes into `assets/manifest.jsonl` (the stock script does this for you). Never print key values.

## Stock photos and video: Pexels, Pixabay, Coverr

`tools/stock/stock.mjs` needs Node 18+ and ffmpeg/ffprobe on PATH. It reads its keys from `.env` in this folder.

```bash
node tools/stock/stock.mjs search "soft pastel gradient abstract" --type video --n 6 --sheet tmp/stock/sheet.jpg
node tools/stock/stock.mjs get pexels:123 --type video --out assets/stock --max-height 2160
```

- `search` prints JSON candidates and can save a numbered contact sheet (`--sheet`). Add `--with frame.png` to put your
  own frame first for comparison. Other flags: `--provider pexels,pixabay,coverr`, `--orientation portrait|landscape`,
  `--type photo|video`.
- `get` downloads the best version up to `--max-height`, checks it (ffprobe, full decode, sha256), saves a 5-frame
  `.strip.jpg` next to it and appends to `assets/manifest.jsonl`. Look at the strip before you use a clip.
- Pexels often gives 50 or 59.94 fps. Convert to 30 fps with ffmpeg yourself. Pixabay photos are ≤1280 px, so take big
  photos from Pexels. Limits: Pexels 200 requests/h, Pixabay 100/min, Coverr 1000/month for the whole key.
- All three licences are free for commercial use and need no attribution.

## Sound effects: Freesound

`FREESOUND_API_KEY` is in `.env` (token auth: `Authorization: Token <key>`). Search:
`https://freesound.org/apiv2/search/text/?query=<q>&fields=id,name,duration,license,previews&filter=duration:[0 TO 5]`.
With a token you can download the HQ MP3 previews (`previews.preview-hq-mp3`). Keep only CC0 or CC-BY, and record the
license and author in `assets/manifest.jsonl`. A pack of candidate SFX is already in `sfx/` (see `sfx/README.md`).

## Pinterest (references or images): Apify

The Apify token is in the Windows user environment (`APIFY_API_TOKEN`). Cost is ~$0.002 per pin, so keep `maxItems` ≤ 30.

```bash
PYTHONIOENCODING=utf-8 python <path-to>/apify/scripts/apify.py run silentflow/pinterest-scraper-ppr --input '{"search":"fuzzy pastel 3d character","maxItems":20}' --max 20
```

Each line of JSON has `imageUrl` (original), `altText`, `saves`, `width`/`height` and `isVideo`. Download with curl.
Pins belong to their authors. Use them as references to look at. Don't put them into the film unless the licence is clear.
