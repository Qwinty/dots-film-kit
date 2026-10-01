# Phones and UI for the dots film

Researched 2026-09-30. It sits alongside `fuzzy-3d-techniques.md` (three r186, 32–64 jittered sub-renders per frame, AgX, and
`window.__seek(t)` + Playwright at 1080×1350, 30 fps). UI screenshots and the UI language are in `ui-refs/README.md`.

## 0. Recommendation

1. **Default: a flat 2D phone and frameless floating UI, built in HTML/CSS.** This is what OpenAI itself does. The teaser's
   only phone is a front-on flat frame on white, the film puts UI on physical flat screens, and the keynote uses a flat
   outline. Grok Bot and Meta Muse, the genre references, also keep UI flat. It's the crispest option, fully
   deterministic, costs no render time, and matches the brand. Put the flat phone over the WebGL canvas and animate it
   with CSS transforms (slide, scale, a slight 2D parallax and a soft shadow).
2. **Optional: one 3D "hero" phone beat (≤4 s), procedural in three.js**, not a GLB. Build a rounded-rect extrusion
   with real bevels, an anisotropic metal frame and black glass. Draw the UI into a CanvasTexture each frame (or take a
   Playwright element screenshot), and composite the screen *after* AgX (§2c). Use it only if a scene needs the phone to
   turn in space, for example a dot climbing out of the screen.
3. **GLB models: skip.** Launch-grade free phones are all iPhone replicas on Sketchfab (CC-BY, login required, Apple
   trade dress). The free no-login ones are low-poly toys (§2a).
4. **Blender: don't.** The gain on a 60 s film where the phone is a minor element doesn't pay for a second renderer,
   compositing and parity problems between the two model runs (§3).

## 1. What OpenAI's UI looks like (short version)

See `ui-refs/README.md` for per-file notes and sampled hex values. For a quick build:
- **Mobile chat, light:** bg #ffffff. Top: a round glass button with a hamburger icon (left), a round phone button
  (right), and a centred 3D dot avatar overlapping a white name pill (hairline border, soft shadow). A grey timestamp
  "Today 11:30 AM". Incoming bubbles #f2f2f2 with black text. **Outgoing bubbles in the dot's colour** with white text
  (blue #4065e7, teal #1bc5ad, orange #fa7003, yellow for Alfred). Bubbles have no tails, radius about 18 px at 1×, and
  1-line bubbles are full pills. "Read 4:31 PM" in #88888a. Input: a pill with "+" and a mic.
- **Dark:** bg #000, incoming #212121. An un-customised dot is a ring #b8c0d0 with a black hole.
- **Desktop:** the dot's replies are plain text (no bubble), the user's are coloured pills. "Thinking…" under the name.
- **Call:** a full-bleed field of the dot's colour, avatar and timer on top, round speaker, red hang-up and mute buttons.
- **Onboarding modals:** a white card, radius about 16 px, a ring icon, a centred title, three icon rows, a black pill
  "Continue".
- **Teaser phone proportions** (`ui-refs/01`): a flat black ring bezel about 2 % of the phone's width, an outer corner
  radius about 17 % of width, thin side-button nubs, status bar "11:30". No perspective and no reflections. Cropped by
  the bottom of the frame.

## 2. Phones in three.js

### 2a. Free models (checked through the Sketchfab API and Poly Pizza, 2026-09-30)

Nothing CC0 at launch quality exists. Sketchfab needs an account to download, even for CC-BY models (listed only):

| Model | Licence | Faces | Notes |
|---|---|---|---|
| iPhone 17 Pro by Ranguel, https://sketchfab.com/3d-models/iphone-17-pro-4541aa8a28324b33a2baaf81d263aaec | CC-BY | 51k | 17 materials, 7 textures, published 2025-10 |
| Apple iPhone 14 Pro by _surovic_, https://sketchfab.com/3d-models/apple-iphone-14-pro-421dcdae14d248099638ad34bbe31ad5 | CC-BY | 71k | 2 materials, 10 baked textures (real-time friendly), under 5 MB GLB |
| Apple iPhone 15 Pro Max Black by Polyman_3D, https://sketchfab.com/3d-models/df17520841214c1792fb8a44c6783ee7 | CC-BY | 64k | |
| Apple iPhone 13 Pro Max by DatSketch, https://sketchfab.com/3d-models/4328dea00e47497dbeac73c556121bc9 | CC-BY | 28k | 642 likes, a clean classic |
| iPhone 12 Pro by DatSketch, https://sketchfab.com/3d-models/iphone-12-pro-05dfc991665e45c68c8b7062136c0c6e | CC-BY | 73k | 18 materials |
| Modern Generic Smartphone by Ottto3ds, https://sketchfab.com/3d-models/cb96f6c19c6c416f8f52a127dd6ec05b | CC-BY | 2.6k | Generic (no Apple look), low detail |
| iPhone 16 – Free by wimell, https://sketchfab.com/3d-models/iphone-16-free-d58591e88a824dfd8cef0af616273b02 | Sketchfab "Free Standard" (not CC) | 56k | 39 materials |

- **No login, downloaded** to `research/phone-models/` (CC-BY 3.0, see `LICENSE.md`): "Smart phone" by Rendercore
  (7.9k tris) and "NotchPhone" by Sal Blrm (1.4k tris) from https://poly.pizza/search/Smartphone. They're only good for
  blocking.
- **Poly Haven:** 521 CC0 models, none of them phones (API check). **pmndrs market:** offline (404).
- **Avoid:** Meshy "CC0" phones are AI-generated with messy topology, and GetGLB/Free3D have unclear provenance.
  Apple Design Resources bezels are licensed only for mock-ups of software that runs on Apple platforms, which a parody
  of someone else's product doesn't qualify for (https://developer.apple.com/design/resources/).
- **Legal note:** an exact iPhone replica in an unofficial OpenAI parody adds a third brand. A generic "iPhone-like"
  procedural phone (no Apple logo, no triple camera) avoids that.

### 2b. Procedural phone (recommended if you go 3D)

**Geometry**
- Body: `THREE.Shape` rounded rectangle, then `ExtrudeGeometry` with `{depth, bevelEnabled:true, bevelThickness, bevelSize,
  bevelSegments: 8–12, curveSegments: 48–64}`. Real proportions: about 71.5 × 149.6 × 8.3 mm (iPhone 16 Pro class). Use a
  corner radius of about 0.17 × width, and ideally a **squircle** (superellipse, n≈4–5) instead of circular arcs: the
  continuous curvature is a large part of the premium read. Keep the bevel small (about 0.6–1.0 mm): it draws a thin
  specular line around the edge.
- `RoundedBoxGeometry` (examples/jsm) has one radius for all edges, so it looks like a soap bar. Only use it for
  buttons.
- Build the frame, back glass, front glass and screen as separate meshes. Inset the front glass by about 0.3 mm from the
  frame, and set the screen 0.05 mm under the glass with a black border (about 1.5–2 % of width) and its own corner
  radius = outer radius − frame width.
- Island: a black capsule on the screen plane. Camera plateau: a rounded-square raised 1 mm, with lens rings (metal) and
  lens discs.

**Materials** (`MeshPhysicalMaterial`, properties per https://threejs.org/docs/pages/MeshPhysicalMaterial.html)
- Frame, brushed titanium/aluminium: `metalness 1, roughness 0.28–0.35, anisotropy 0.6–0.9`. Set `anisotropyRotation` or
  an `anisotropyMap` so the brushing runs along the edge. You need UVs and tangents: `geometry.computeTangents()` needs
  indexed geometry with UVs, and ExtrudeGeometry provides UVs. Colours: natural titanium #8a8883, black #2b2c2e, or tint
  it with the dot's colour for a gag.
- Front glass: `color #000, roughness 0.02–0.05, metalness 0, clearcoat 1, clearcoatRoughness 0.02, ior 1.5`. **Don't use
  `transmission`**: it costs an extra pass per sub-render and adds nothing for black glass. What reads is the reflections.
- Back glass: frosted, `roughness 0.35–0.5`, a slight colour.
- Lenses: `color #050608, roughness 0.05, iridescence 0.4–0.7, iridescenceThicknessRange [200, 600]`, which gives the
  purple/green coating flare.

**Light: this separates premium from cheap**
- `RoomEnvironment` through `PMREMGenerator.fromScene(new RoomEnvironment(), 0.04)` is fine for the fur. For the phone,
  build **your own env scene**: a black room with 2–3 long emissive strips (softboxes) and one big soft top panel, then
  PMREM it. As the camera or phone moves, those strips sweep across the black glass and the brushed edge. That sweeping
  highlight is the "Apple product film" look. Rebuild the PMREM only if the strips move; otherwise rotate the phone, not
  the env.
- Add a soft contact shadow under it (a baked blurred plane or `ShadowMaterial` + PCFSoft), and a rim light from behind
  on dark backgrounds, as in the teaser's fur shots.
- Camera: long lens (FOV 15–25°), slow moves, shallow DoF from your lens jitter (focus on the screen), and motion blur
  from shutter jitter.

**Premium vs cheap**
- Premium: continuous-curvature corners, a thin crisp edge highlight, moving strip reflections, deep black glass,
  correct scale against the characters, restrained moves (≤30° of rotation per beat, then a hold), a crisp screen with
  true whites.
- Cheap: circular corners with hard edges or visible facets (curveSegments too low), glossy "plastic" frames, a uniform
  grey env so nothing sweeps, an over-bright blooming screen, **tone-mapped grey UI**, moiré on text, thick bezels,
  360° spins.

### 2c. A live UI on the 3D screen

**Ways to get the UI into a texture, best first**

1. **Playwright element screenshot, fed back as a texture.** Build the UI as a normal DOM element offscreen, at the
   texture's resolution. Per frame, after `__seek(t)`:
   ```js
   const png = await page.locator('#phone-ui').screenshot({ omitBackground: false, animations: 'disabled' });
   await page.evaluate(b64 => window.__setScreen(b64), png.toString('base64')); // decode, set tex.image, needsUpdate
   // then page.screenshot() the final frame
   ```
   This gives full CSS fidelity, the same fonts as the flat shots and exact determinism, with no code duplication. It
   costs one extra screenshot and decode per frame (roughly 50–150 ms, unmeasured). This is the recommended option.
2. **Canvas 2D drawn directly** (`CanvasTexture`). Fastest, and deterministic if fonts are loaded first (`await
   document.fonts.load('600 16px OpenAISans')` before frame 0). You re-implement layout (bubbles, wrapping), which is
   fine for a chat of 3–5 bubbles. Draw the 3D avatar as an image rendered once from the fur scene.
3. **DOM → SVG foreignObject → image** (html-to-image / modern-screenshot). Uses real layout, but it's async, fonts
   must be inlined as data URLs, and some CSS (backdrop-filter) is missing. Await it inside `__seek`. Middle ground.
4. **HTML-in-Canvas** (`texElementImage2D`, WICG): live DOM → WebGL texture. Chrome dev trial behind
   `chrome://flags/#canvas-draw-element` since about Chrome 138, origin trial from about 148, not shipped
   (https://html-in-canvas.dev/docs/browser-support/, https://tympanus.net/codrops/2026/05/13/exploring-the-html-in-canvas-proposal/).
   Too experimental for a deadline, and the Playwright Chromium flag is untested.
5. **CSS3DRenderer:** the DOM stays vector-sharp under a `matrix3d`, but it sits outside WebGL, so it gets no glass
   reflections, no occlusion, and none of your DoF or motion-blur accumulation. Acceptable only for a near-frontal
   phone with a WebGL body under it.
6. **HTMLMesh** (examples/jsm/interactive): a hand-written DOM painter with limited CSS (text, borders, radius, images,
   inputs) and a debounced MutationObserver. Not deterministic enough.
   https://github.com/mrdoob/three.js/blob/dev/examples/jsm/interactive/HTMLMesh.js

**Crispness and moiré**
- Texture size: about 1.5–2× the screen's on-screen pixel size in the tightest shot, for example the native
  1179×2556 for a phone that fills most of a 1350 px-tall frame. WebGL2 doesn't need power-of-two sizes.
- `tex.colorSpace = THREE.SRGBColorSpace; tex.generateMipmaps = true; tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();` (anisotropy matters most when the phone is tilted).
- The jittered 32–64 sub-renders already supersample the texture lookup, so moiré mostly comes from over-minified mips.
  Keep hairlines ≥2 px at texture resolution, avoid fine 1 px patterns, and don't render the UI at 4× and let mips
  shrink it by 4 (step down to about 2×).
- Only re-upload the texture when the UI changes (`needsUpdate` on change frames), not every sub-render.

**Colour and tone-mapping pitfall (important)**
- An AgX-mapped screen shows #ffffff UI as dim, slightly desaturated grey, and brand colours shift. The obvious fix,
  `material.toneMapped = false`, is **ignored when rendering to a render target or with post-processing**
  (https://threejs.org/docs/pages/Material.html), and your accumulation pipeline renders to a float target.
- **Fix: a two-layer composite.**
  (a) In the main accumulation pass, render the screen as **black glossy glass**. Over the screen, the result then
  contains only the reflections and glare, which is physically right because glass adds reflection on top of the
  emitted image.
  (b) In a second accumulation target with the **same jitter per sub-sample**, render just the screen mesh with an
  unlit `MeshBasicMaterial({ map: uiTex })` and everything else as depth-only occluders (`colorWrite:false`), keeping
  premultiplied RGBA. Coverage, DoF and motion blur then match the main pass.
  (c) Final pass: `out = AgX(main) + screenLayer.rgb` (the screen was black in `main`, so adding is correct), then
  sRGB encode, then grain. The UI keeps true #ffffff and exact brand hex values, and the glare sits on top.
- Optional glare: a subtle diagonal gradient/streak in the glass reflections comes free from the env strips. Don't
  paint a fake glare PNG on top.
- Brightness: in the teaser, the UI is exactly paper white on a white background. Don't bloom the screen.

### 2d. Flat phone vs frameless UI vs 3D phone

- **Flat CSS phone** (the teaser style): a `div` with background #0b0b0c, `border-radius: calc(var(--w) * .17)` (17 % of phone width), a padding of about
  2 % of width as the bezel, the inner screen radius = outer − bezel, 3–4 px side nubs, and a soft `drop-shadow` on
  coloured backgrounds only (the teaser has none on white). Use it whenever the point is *reading* the UI: a message
  arriving, "Read", a typing indicator.
- **Frameless floating UI** (Muse, Grok's cards): bubbles, name pills and cards float on a gradient with a slight depth
  blur. Best for kinetic beats and the "• • •" gag, and it fits a 4:5 frame well.
- **3D phone:** only when the object itself matters (a dot hopping out of the screen, a phone tumbling into a pile of
  plush). Current AI launch films almost never tilt a 3D phone while you're meant to read the UI (my observation from
  the refs, not a sourced rule).
- Mixing: go from the flat phone into a 3D shot by matching the frontal framing. Render the 3D phone head-on with a
  long lens so it lines up with the flat one, then start rotating.

## 3. Blender?

**What it would add:** a path-traced (Cycles) glass/metal phone with true reflections, soft shadows and caustics, plus
denoised DoF and motion blur. The three.js phone with a custom strip env and 64-sample accumulation already reaches
about 85–90 % of that for a black-glass object, because the look comes from the env strips, not from GI.

**What it costs**
- A second renderer and install. Blender isn't on this PC (checked 2026-09-30). The fuzzy guide measured a Radeon 780M
  iGPU; Cycles HIP support for that iGPU is unverified, and on CPU it would take minutes per frame.
- Compositing: render EXR/PNG sequences with alpha, then load frame `N` in the HTML layer on `__seek(t)` (deterministic
  if you load by index and await decode). But any camera or timing change means re-rendering in Blender, and a UI that
  must line up with the HTML text has to be baked into the Blender screen texture or tracked with exported camera
  matrices.
- Parity: two AI models from one prompt would each have to write bpy scripts that work headless. That doubles the
  failure surface, and a missing or failed Blender render breaks the whole film run.
- Colour: you'd need matching AgX in Blender (Blender 4.x's AgX view transform) and three.js, or composite in linear.
  That's doable but one more thing to get wrong.

**Verdict:** not worth it for this film. Use three.js (procedural phone plus the two-layer screen composite) if a 3D
phone beat is needed at all, and flat CSS phones for everything else. Revisit Blender only for a dedicated product-hero
shot on a machine with an NVIDIA GPU, rendered once and dropped in as a fixed clip. The in-browser path tracer
`three-gpu-pathtracer` (0.0.26) is a middle path inside the same scene, but it's slow on an iGPU and not needed for
black glass.

## Open questions

- There's no screenshot of the shape picker (behind "Customize your dot") or of an explicit Allow/Deny prompt, and
  nothing of the Teams integration. Any card like that in the film is invented.
- The UI font (OpenAI Sans vs SF Pro) is unverified. So are exact radii and paddings, which were estimated from
  screenshots of unknown scale.
- The per-frame cost of the Playwright element-screenshot round trip wasn't measured; prototype it on one shot first.
- The HTML-in-Canvas flag in Playwright's bundled Chromium wasn't tested.

## Sources

- UI images and frames: see `ui-refs/README.md` (each file has its URL).
- Sketchfab model data: `https://api.sketchfab.com/v3/models/<uid>` and `/v3/search` (queried 2026-09-30).
- Poly Pizza: https://poly.pizza/search/Smartphone ; Poly Haven API: https://api.polyhaven.com/assets?t=models
- three.js: https://threejs.org/docs/pages/MeshPhysicalMaterial.html ; https://threejs.org/docs/pages/Material.html ;
  https://github.com/mrdoob/three.js/blob/dev/examples/jsm/interactive/HTMLMesh.js
- HTML-in-Canvas: https://html-in-canvas.dev/docs/browser-support/ ; https://groups.google.com/a/chromium.org/g/blink-dev/c/t_nGEmJ_v4s ;
  https://tympanus.net/codrops/2026/05/13/exploring-the-html-in-canvas-proposal/
- Apple Design Resources licence scope: https://developer.apple.com/design/resources/
- Reference ads: `refs/grok-bot.mp4`, `refs/muse-meta.mp4` (frames inspected), `refs/README.md`.
