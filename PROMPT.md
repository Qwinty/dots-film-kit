# Launch prompt: "dots" unofficial launch video (two-model comparison)

Two runs, one per model, each in its own folder, with the same prompt. Open a Claude Code session with **Sonnet 5.5,
medium effort** in `...\dots-a\`, and a Codex session with **GPT 6.1 Sol, xhigh**
in `...\dots-b\`, and paste into each:

> Read `PROMPT.md` in this folder and make the film it describes, from "## Role" to the end, in the current folder.
> Stop and ask me before anything that goes public.

Each working folder has a copy of this file as `PROMPT.md`, plus `refs/`, `research/`, `sfx/`, `tools/`, `vo/`, `.env`
and the music. Originals live in `<socials>\posts\2026-09-30-dots-launch\`. Written 2026-09-30 (Claude
Socials/1f64bbc4), adapted from the Engraver prompt. Same day: the track changed to messwave "skeptical" (the first
4 bars cut), and a voiceover was added.

---

## Role

You are a director and motion designer who makes launch films for tech products, entirely in code: every frame is a
function of time, rendered from your own HTML, canvas, WebGL or three.js scenes. You work like the studios behind
Apple, OpenAI and Meta launch films: every shot sells one idea, and polish is the point. A beautiful frame that sells
nothing is a defect.

## Purpose

A ~60 s **unofficial launch film for OpenAI's "dots"**, for an X post by Maxim. It is a fan-made ad, not made by or
with OpenAI. It autoplays muted in a phone feed, so the first 2 s must stop a scrolling thumb with no sound, and the
film must sell the product with no sound. The viewer should come away knowing what a dot is (a cute, always-on agent
that does real errands for you and asks before it acts), and wanting one.

The same prompt is being run by two different models, to compare them. Work only in the current folder. Your folder's
letter (`a` or `b`, from the folder name `dots-a` / `dots-b`) is `<L>` below.

## The product (facts; don't invent others)

`research/dots-facts.md` has the facts with sources. The short version:

- **dots** (always lowercase) are personal AI agents in ChatGPT, announced on 2026-09-29 at OpenAI DevDay. Each dot is
  always on, has its own cloud computer and browser, connects to 4,000+ apps, works in the background 24/7, pings you
  only when something needs your review, and asks permission before sensitive actions.
- You reach your dot in ChatGPT, Slack, Teams, Codex or by voice call. Each user starts with one "primary dot", gives
  it a name and picks its shape.
- **The mascots:** plush, fuzzy 3D creatures with dot eyes. Alfred is a yellow gumdrop with round glasses and a bow tie.
  Felipe is a blue cloud in a black beret. Todd is a green frog with a bow tie. Jojo is a hot-pink heart in sunglasses.
  Iggy is pink, with headphones.
- **The wordmark:** lowercase "dots" on white, each letter with its own soft pastel gradient and glow. d is periwinkle
  to cyan, o lemon to peach, t magenta, s mint (the hex values are in the facts file).
- Official lines you may use: "Always-on intelligence", "Remarkably capable", "Remarkably cute", "Your dot is ready to
  meet you." Rollout: ChatGPT Pro and Business Premium.
- Don't use the OpenAI logo, and don't make any claim that isn't in the facts file.

## References

`refs/` holds three launch films of the same genre, and `refs/README.md` says what each does: Meta **Muse** (82 s, the
full template), **Grok Bot** (10 s, one idea and a logo from a dot) and **Krea** (20 s, prompt bar and agent status
list). Watch all three frame by frame with ffmpeg before you design, and write in `story.md` what you took from each.
Then study OpenAI's own dots teaser (`refs/official-teaser.mp4`, 30 s) and film (`refs/official-film.mp4`, 2:28)
for the characters and the look. `research/official-frames/` has their contact sheets and key stills (the group shot,
the chat UI, the wordmark), and `research/dots-facts.md` describes them. **`research/official-page/`** holds the
images from OpenAI's announcement page: each mascot with its real fur colour, peeking into a pastel frame next to flat
UI. Its `README.md` has the sampled fur colours. It is the main reference for how the characters must look.
`research/ui-refs/` has 25 screenshots of
the real dots UI (mobile and desktop chat, call screens, onboarding modals, the sidebar, Slack), and its `README.md`
describes the UI language, with sampled colours. The refs are for looking only: the film must not load, trace or copy
their frames or screenshots, and must not reuse real people's names or emails seen in them.

## Concept: an honest launch film

Play it straight. The film is a real launch ad in the genre of the refs, made as well as a top studio would make it.
The joke is the post around it: two models making OpenAI's launch film. It is not a joke inside the film. Light wit
fits the brand ("Remarkably cute"), but no parody, no memes and no mockery of the product.

## Visual identity

- **World.** Bright, soft, premium. A white to pale pastel studio, with soft light, gentle contact shadows and a shallow
  depth of field. Colour comes from the characters and the wordmark. A frame's background may be a pale tint of its
  character's colour, as on the official page. Light it high-key: no dark, moody studio.
- **The characters.** They are the stars and the hardest part. They must read as plush and fuzzy (fur, sheen, a soft
  silhouette), not as glossy plastic spheres. **The fur is bright, saturated and clean**, in the colours of
  `research/official-page/README.md` (Alfred warm yellow, Felipe vivid blue, Todd lime, Jojo hot magenta, Iggy pink):
  light, airy and fluffy, with a soft glowing edge. The shadow side stays the same hue, only a little deeper. Dark,
  grey, brown, muddy or desaturated fur is a defect, in every shot, including the night. They have dot eyes that blink, squash and stretch that shows weight, and
  small accessories that tell them apart. Make at least three of the five. `research/fuzzy-3d-techniques.md` is a
  technique guide for fur, soft light, depth of field and crisp text in three.js.
- **UI.** Rebuild the real dots UI language from `research/ui-refs/`: the dot's 3D avatar centred over a name pill,
  grey incoming bubbles, outgoing bubbles in the dot's own colour, round buttons in the corners, a clean white (or
  dark) chat. Add cards for the errands (calendar, a message sent, a checkout that waits for "Allow", a flight) and
  status lines ("Working on it…", "Waiting for your OK", "✓ Done"). The real product has no published permission card
  or shape picker, so design those in the same language. Crisp text, real hierarchy, soft shadows. Avoid the generic
  glassmorphism look (frosted cards floating in a void). The UI should look like the product, not a template.
- **Phones: flat 2D only.** OpenAI's own films show UI flat: a front-on phone on white with a thin black bezel, UI on
  screens in the room, or frameless floating UI. Do the same. No 3D phone models or 3D mockups: a phone is a flat
  front-on frame (or no frame at all), built in HTML/CSS, which may move in 2D (slide, scale, a slight tilt is fine)
  and may sit in front of or beside the 3D characters. `research/phone-and-ui.md` has notes on flat phones and on
  keeping UI crisp.
- **Type.** A clean geometric or grotesque sans for supers, large, centred, built word by word as in the refs. The
  wordmark is the one place with gradients and glow.
- **People.** Allowed (hands on a phone, a person reacting, a real life the dot fits into), drawn, 3D or from stock
  footage. If you use them, they serve the dots and never take the frame away from them.
- **Format.** 1080×1350 (4:5), 30 fps. Keep faces, UI text and the wordmark out of the bottom 12% (X's player UI).

## Story

**Promise.** Your dot takes the small errands off your hands, day and night, and it's adorable while doing it.

**Shape.** Use the genre template, but with a spine: one person's day, handled. Hook, then introduce, then errands that
grow in scale (a small one, one that needs your OK, one done while you sleep), then a payoff and the end card. Each
errand is a mini story: a need, the dot at work, the result. The voiceover (see Voiceover) carries this spine; the
pictures must tell it on their own too, for muted viewers.

**Shots.** A proposal, laid out on the music and the voiceover. Times are targets. You may restructure the shots if you
find a stronger film, as long as the hook, the three errands, the drop, the night beat in the silence and the payoff
survive. Say what you changed and why in `story.md`.

| # | t (s) | purpose | framing and camera (and why) | start → one action → end |
|---|---|---|---|---|
| 1 | 0–1.9 | hook | extreme macro of bright, saturated fur filling the frame (for example Alfred's warm yellow), soft high-key light, slow push (texture first) | frame 0 already shows moving fur → the fur turns: two dot eyes blink straight into the lens → hard cut on the downbeat |
| 2 | 1.9–5.7 | introduce (VO "Introducing dots.") | white studio, locked off | "Introducing" builds word by word → a dot bounces into frame and lands with a squash → the wordmark forms beside it, letter by letter, each letter with its glow |
| 3 | 5.7–7.55 | the cast, then yours (VO "This is your dot.") | wide group shot, quick dolly-in (to present them) | the characters pop in on the beats, each with its own small gesture (glasses, beret, sunglasses) → one steps forward and waves at the viewer; the groove starts at the cut to shot 4 |
| 4 | 7.55–15.1 | errand 1: small (VO "It takes care of the little things,") | phone chat UI, close; a cut to the dot at work | "Can you move my 3pm and tell the team?" → the dot hops onto a calendar card and drags the event → Slack message sent → "✓ Done" |
| 5 | 15.1–22.65 | errand 2: needs your OK (VO "and checks with you before the big ones.") | UI cards; the dot beside a checkout card | "Find a gift for Mom under $50" → the dot flips through three cards and picks one → "Waiting for your OK" → a thumb taps Allow → "✓ Ordered" on the last bar before the drop |
| 6 | 22.65–37.95 | the drop. **The one big moment of the film goes here.** | white studio, the fastest camera of the film | on the drop's first frame, every character bursts into frame at once, in a coordinated jump → quick cuts of each character's best moment on the beats, with the supers "Always-on intelligence" → "Remarkably capable" → from ~30 s a fast montage of dots doing many errands at once (it connects to 4,000+ apps), rising to the hard stop |
| 7 | 37.95–41.55 | errand 3: while you sleep, in the track's 3 s silence (VO "And while you sleep, it keeps working.") | the cut to silence is a cut to night: dark room, the phone face down, locked off | 3:12 AM: an alert, "Flight delayed 2 h" → the dot, wide awake in the dark and lit by the phone's glow so its fur keeps its colour, rebooks the flight → on the beat's return at 41.55, morning light floods the frame with one calm message, "Rebooked you on the 9:40. Slept well?" |
| 8 | 41.55–52.87 | payoff | all characters, white studio | the morning message resolves into the group → "Remarkably cute" on the cutest moment → the characters jump together, land and turn into the wordmark's glow → "dots" |
| 9 | 52.87–60 | end card (VO "Your dot is ready to meet you.") | locked off | "dots" wordmark, "Rolling out in ChatGPT Pro" beneath it → hold while the music fades out (see Music) |

**Unofficial label.** From shot 8 to the end, small, low-contrast text at the bottom of the safe area: `Unofficial ad.
Not affiliated with OpenAI. Made in code by [MODEL].` Replace `[MODEL]` with your exact model name as your environment
states it; if you are not sure, leave `[MODEL]`. It must be readable on a phone when paused, but it must not compete
with the wordmark (for example 22–26 px, ~45 % opacity).

Before any code, and after the music analysis, write `story.md`: the promise in your own words, the shot table with
your final timings, what you took from which reference, how you will make the characters (and why that technique),
and one cold-open alternative. Keep the table's opening unless the alternative clearly wins, and say why.

## Style frames: stop here once

After `story.md`, render three style frames at full size: shot 2 or 3 (a character and the wordmark in the white
studio), shot 5 (a character next to product UI) and shot 1 (the fur macro). Save them as `out/style/1.png`,
`2.png`, `3.png`, score them as in Review below, and **stop and show them to Maxim** with one line on what you intend
to improve. Continue only after his reply. This is the only planned stop.

## Motion

- The genre moves fast, but a first-time viewer must follow every move. A move takes 0.4–1.0 s, and after a move
  lands, hold ≥0.6 s before the next begins. About 3 beats per 10 s. One main thing moves at a time; ambient motion
  (breathing, fur, blinking) doesn't count.
- Characters: squash and stretch with weight, anticipation before a jump, overlapping action on fur and accessories.
  They should feel alive in every hold (breathe, blink, look around).
- A shot longer than ~6 s needs an internal change, or it reads as a slideshow.
- Camera: name a move for every shot (locked off, push, dolly, orbit, rack focus) and give its reason. No constant drift.
- Transitions: vary them, and let each one come from the story. Use three kinds:
  - **Shape transitions.** A symbol from the frame carries the cut. A dot grows and floods the frame in its colour in
    ~0.3–0.4 s. A ✓ splits into the three dots of a typing indicator. A chat bubble becomes the next shot's card.
  - **Match cuts.** A dot's shape, position or motion continues into the next shot, for example a typing dot becomes a
    character.
  - **Hard cuts** on the beat.
  Don't use one kind for every transition. No dissolves as filler.
- Easing: springs or ease-out curves. Overshoot is allowed on the characters, but not on UI or type.

## Text on screen

Supers, UI text and the end card only. Every word has to be readable at phone size and stay on screen long enough to
read twice. All UI copy must be plausible product copy in English, with no lorem ipsum and no typos.

## Music: analyse first, cut to it

`music.wav` is in this folder: messwave, "skeptical" (instrumental version, Artlist), picked by Maxim. It is already
cut: it starts 7.72 s into the original, so the first 4 bars of the intro are gone and the drop comes sooner.
`music-src.aac` is the uncut original. All times below are in `music.wav`, which is the film's timeline. A quick
analysis from 2026-09-30 (RMS, low-band energy, spectral flux), which you must verify and refine yourself:
- The tempo is ~127 BPM (one beat ≈ 0.472 s, about 14 frames at 30 fps; one bar ≈ 1.8875 s). The downbeats fall at
  0, 1.89, 3.78, 5.66, 7.55 and every 1.8875 s after.
- 0–7.55: a soft intro. 7.55–22.65: the groove, 8 bars, with a riser in the last ~3 s.
- **The drop is at 22.65 s**, right after a 0.28 s cut to silence (22.37–22.65).
- **A hard stop: full silence from 37.95 to 41.08 s**, a short pickup hit at ~41.1, and the full beat returns at
  **41.55 s**. The second full section runs to ~53 s, then the energy settles into a breakdown (~54–68 s).
- Further on, for reference: a build ~68–82 s, a second drop at ~83.1 s, a full section to ~113 s, a soft outro, and
  the end at 126.7 s.

The shot table is laid out on this shape: hook and introduction on the intro, errands 1–2 on the groove, the big moment
on the drop, the night errand in the silence, the payoff on the second full section, the end card as it settles.
The voiceover (see Voiceover) is placed on this grid and approved by Maxim. Analyse the track **before** you fix the
timings in `story.md`:
- Find the exact tempo, the beats and downbeats, the phrase and section boundaries, the energy envelope and the strong
  onsets. Use Python with `librosa` and `numpy` (`librosa` is installed for the system Python), or write your own
  detection over ffmpeg's PCM output. You can't listen, so verify: render a click track on the detected beats,
  overlay it on the waveform with ffmpeg `showwaves` and check the alignment.
- Don't trust one beat tracker for the big moments. Find the drop and the section starts again from low-frequency
  energy (for example RMS of the signal low-passed at ~150 Hz, where the kick and bass come in). An automatic beat grid
  can be one or two beats off, and a bass curve shows the real drop.
- Write `beats.json`: tempo, beats, downbeats, sections with start and end, and the 5–8 strongest moments.
- Cut to the music: shot changes on downbeats, supers on beats, the burst of shot 6 on the drop's first frame, the cut
  to night on the first silent frame at 37.95, the morning light on the beat's return at 41.55. Never add an event just
  to fill a beat.
- **The ending.** Use `music.wav` from 0 to 60 s and fade it out over the last 2–3 s, under the end card, as in
  `vo/guide-mix.wav`. You may instead make one edit, on a downbeat after 52.87 s, to a stronger ending later in the
  track, if it lands cleanly by 62 s. Put an edit on a bar boundary with a crossfade of ≤150 ms, and check that it
  doesn't break the beat grid.
- You may move a shot boundary by up to ±1 beat to land it on a stronger onset, but not the drop, the silence or the
  voiceover lines. The film stays between 58 and 62 s. Don't time-stretch the music. Say in `story.md` which stretch
  of the track you use.
- In review, check the sync on the draft video: each key moment's frame against its beat. More than 2 frames off is a
  defect.

## Voiceover

`vo/` holds six approved narrator lines (voice Sulafat, Gemini TTS) and `vo/README.md` with their start times.
`vo/guide-mix.wav` is the approved guide mix of the music and the voice: read it through its waveform and use it to
check your timing.
- Place each line at its start time in `vo/README.md`. You may move a line by at most one beat (±0.47 s), and only if
  a cut needs it; say so in `cues.json`. Don't cut, re-order, re-time or re-generate the lines, and don't add others.
- The voice sits in the centre, dry or with a very small room. Duck the music under it with `sidechaincompress` (about
  4–6 dB of gain reduction), not with gain steps. Keep SFX out from under the words, or pull them down so every word is
  clear.
- No voice over the drop (22.65–37.95). Line 5 plays in the silence; keep the silence silent around it except for
  small, quiet night sounds (a phone buzz, a soft UI blip).
- The picture must match what the voice says at that moment (line 2 on your dot, line 4 on the "Allow" step, line 5 on
  the night). Don't subtitle the voice word for word: supers carry their own short lines, and a super may echo a key
  word of the voice.

## Sound

- SFX candidates are in `sfx/` (`sfx/README.md` lists roles, lengths and sources). Nobody has listened to them yet.
  Check each with `ffprobe` and ffmpeg `ebur128` / `silencedetect`, and drop anything that is silent, clipped or wrong.
  You may add sounds from Freesound (CC0 or CC-BY, see `tools/README.md`) or synthesise your own.
- Every visible pop, landing, tap, message and card has its own sound. Vary the hits and never use the same sample twice
  in a row for the same action. Characters get soft, round, plush sounds; UI gets crisp clicks.
- Sync each SFX by its transient, not by the start of its file. Find the loudest peak (the attack) in each sample and
  place that peak on the event's frame. Many files start with a few ms to a few hundred ms of silence or a slow rise, so
  lining up the file start puts the sound late.
- Mix like a sound designer, not with volume alone. Shape the sound with filters and space:
  - **Low-pass for "muffled" and "opening up".** Over the groove's last bar before the drop, a low-pass sweep that
    opens to full range can make the drop hit brighter (only if the riser in the track doesn't already do it). In the
    night beat, the phone and room sounds are heard in a dark, quiet room: muffle them with a low-pass. Filtering
    sounds far better than turning things down.
  - **High-pass for "small" or "far".** Use it for sounds heard through a phone speaker or from across the room.
  - **Ducking.** Duck the music under key SFX and supers with a sidechain compressor (ffmpeg `sidechaincompress`), not
    with fixed gain steps.
  - **Space and variation.** Add a touch of reverb for size, pan movement to follow the action, and small pitch and
    gain variation on repeated hits so no two sound the same.
  Installed for the system Python: **`pedalboard`** 0.9 (Spotify's studio effects: `LowpassFilter`, `HighpassFilter`,
  `Reverb`, `Compressor`, `Limiter`, `PitchShift`, `Chorus` and more). It is the easiest way to automate a filter.
  Process the audio in ~10 ms blocks with `board(block, sr, reset=False)` and set `cutoff_frequency_hz` before each
  block. This was tested on this track: a smooth sweep with no zipper noise. `matplotlib` is installed for plots
  (waveform, beats, spectrograms). Alternatively, use ffmpeg `asendcmd` to change the `lowpass` or `highpass`
  frequency (it is a runtime command). Tested here: pass the commands as a file
  (`asendcmd=f=cmds.txt,lowpass=f=20000`, one `<time> lowpass f <Hz>;` per line). The inline form fails on escaping.
  Each command is a step, so write one every ~20 ms for a smooth sweep. You can't listen, so check every filter move on a spectrogram
  (ffmpeg `showspectrumpic`) of the final mix.
- Write every cue in `cues.json`: file, start, the transient's offset, in and out points, gain in dB, fades, filters
  and purpose. Build the mix with ffmpeg (48 kHz stereo).
- Loudness of the final encoded MP4: −14 LUFS integrated, true peak ≤ −1.0 dBTP (two-pass `loudnorm`). Measure the
  encoded file, not the mix.

## Media: code first, stock allowed

The film is made in code. You may also use free stock photos or video (Pexels, Pixabay, Coverr), Freesound sounds and
Pinterest references through the tools in `tools/` (read `tools/README.md`). Using them is allowed, not required. Every
external file goes into `assets/manifest.jsonl`, and `run-notes.md` says what you used and why. No AI-generated images
or video.

## Build

`research/fuzzy-3d-techniques.md` is a technique guide, researched and partly tested on this machine on 2026-09-30.
It is a starting point, not a requirement: pick your own stack if you find a better one, and say why in `story.md`.
Its findings, in short:
- three.js r186 vendored from npm. Fur from 64–192 shells in your own shader, with jittered strand cells (a regular
  grid leaves a visible seam) and dense tuft noise. `MeshPhysicalMaterial` sheen for velvet, AgX tone mapping, and a
  studio environment built in code (`RoomEnvironment` + PMREM).
- Depth of field, motion blur and anti-aliasing by averaging 32–64 jittered sub-renders per frame (lens, shutter and
  pixel jitter). This stays correct on fuzzy edges and is deterministic under seek(t). Bloom and grain are seeded by
  frame number.
- Wordmark, supers and UI as an HTML/CSS layer over the canvas, captured with `page.screenshot()`.
- **GPU trap:** Playwright's default headless mode renders WebGL on the CPU (SwiftShader) without any warning. Launch
  with `channel: 'chromium'` (or `--use-angle=d3d11`) and log `UNMASKED_RENDERER_WEBGL` at startup to prove the GPU is
  used. Set `preserveDrawingBuffer: true`.
- Budget: the prototype took ~1.8 s per 1080×1350 frame at 96 shells × 16 samples, and a full scene will be slower.
  Plan render time: 60 s × 30 fps = 1,800 frames.

- Read the seekable-motion skill first: `<path-to>\seekable-motion\skills\seekable-motion\SKILL.md`,
  then `references\craft.md` and `references\render.md`. Copy `scripts\render.mjs` and `scripts\seek-kit.js` from it
  into this folder, `npm i -D playwright esbuild`, `npx playwright install chromium`. ffmpeg is on PATH.
- Everything is a function of `t` through `window.__seek(t)`. All randomness comes from a fixed seed. Nothing runs on
  wall-clock time, and every frame renders the same way twice.
- Libraries: you may install three.js and its add-ons, postprocessing, troika-three-text and fonts from npm (for
  example `@fontsource/inter` or `geist`; OpenAI's own font is not available), and vendor them locally. Nothing loads
  from a CDN at render time. You may `pip install --user` more Python packages if you need them, and say which in
  `run-notes.md`.
- Already on this machine: Node 24, Python 3.14 (numpy, scipy, librosa, soundfile, pedalboard, matplotlib, Pillow),
  ffmpeg 7.1 full build (`sidechaincompress`, `afir`, `rubberband`, `showspectrumpic`, `loudnorm`, `asendcmd`), and
  Playwright's Chromium.
- 1080×1350, 30 fps, 58–62 s. Drafts at `--sub 1`, final render with motion blur (`--sub 4` or more). If `render.md`
  describes chunked or parallel rendering, use it for the full-length renders.

## Working method

Work the way you work best: plan, build, review and revise until the film passes the bar below. You may use subagents
or parallel workers if your environment has them; say in `run-notes.md` which you used and for what. The film is
judged only on the result.

## Review: score your own frames, pass at 8

You are scoring your own work, so be the harsh reviewer. A 7 is a 7.

1. **Stills.** Render stills every 1 s plus the start, landing and hold of each move. Look at every one and compare them
   with the refs and the official frames: would they sit next to a real OpenAI or Apple launch frame without shame?
   Score each 1–10 on four axes:
   - story: does the frame sell its shot's idea, and can you read it within 1 s?
   - composition: hierarchy, negative space, nothing important in the bottom 12%;
   - craft: plush fur that reads, no plastic look, crisp text, no banding, aliasing, clipping or z-fighting;
   - identity: dots' look (pastel, soft, premium, the characters on-model, the wordmark right).
   A frame's score is its lowest axis. **Every frame must reach 8.** Below 8, write the defect, fix it, re-render that
   stretch and score it again. Do at least two rounds, even if round 1 passes. Every score needs evidence (what you
   see). Name the weakest frame of each round. Don't give a 9 or 10 without saying what makes the frame exceptional.
2. **Motion.** Render a draft video and extract frames around every move at 10 fps with ffmpeg. Check speeds,
   continuity, squash and stretch and the holds against the table, and check the hold lengths in your code
   numerically. Check that every SFX lands on its event's first frame.
3. **The film.** Do three isolated reads:
   - the first 2 s alone: would a muted scroller stop?
   - the ending alone: do you know the product's name and what it does?
   - the middle: list every errand with its timestamps; can a muted viewer tell what the dot did each time?
   Then score the film 1–10 with evidence on six axes: hook, clarity (what a dot is), character appeal, visual polish,
   pacing and music sync, fidelity to this brief. **Each axis must reach 8.** Also check for template habits: the same
   camera move on every beat, uniform intensity, generic glass cards, stock-looking type, filler shots.
4. Write `review.md`: one table per round (t, shot, four axis scores, min, defect, fix), the film scores with evidence,
   and anything you could not bring to 8, with the reason.

## Deliver

- In this folder: `out\dots.mp4` (with sound: music, SFX and the voiceover), `out\dots-silent.mp4`, `out\stills\`, `out\style\`, `story.md`,
  `cues.json`, `beats.json`, `review.md`, `assets\manifest.jsonl` (if you used external media), and `run-notes.md`
  with model id, effort, wall time, render time, token use and cost if you can see them, subagents used, and what was
  hard.
- Copy `dots.mp4` to `<socials>\posts\2026-09-30-dots-launch\media\dots-<L>.mp4`, and 3 key stills (the hook,
  an errand, the wordmark) as `media\dots-<L>-1.png`, `-2.png`, `-3.png`. Don't name the model in these file names,
  because Maxim watches them blind. Don't edit anything else in Socials.
- Don't publish, post, schedule or change any account. Don't run git on the desktop. Don't read or touch the other
  dots folder.
- Finish with a short summary for Maxim in Russian: the film's scores, the weakest moment, and the path to the video.
