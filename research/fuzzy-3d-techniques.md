# dots in code: fuzzy 3D technique guide

> **Update 2026-09-30:** the film has no black or low-key shots. Where this guide mentions the teaser's black
> close-ups, rim halos on black or back-light rims for the black shots, read it as history. The target look is high-key,
> with bright, saturated fur in the colours of `official-page/README.md`. Keep the rim term only as a soft, light-coloured
> glowing edge.

Researched 2026-09-30. For two coding models building a ~60 s unofficial dots video in HTML + WebGL/three.js,
rendered frame by frame through a deterministic `window.__seek(t)` in Playwright at 1080×1350 and 30 fps.
Versions are as of today (npm registry): three 0.186.1 (r186), postprocessing 6.39.5 (peer: three ≥0.168 <0.187),
troika-three-text 0.52.5, playwright 1.63.0, three-gpu-pathtracer 0.0.26.
Look notes come from frames of the official teaser (`scratchpad/v2.mp4`, 30 s) and the film (`v1.mp4`, 2:28).

## 0. Top recommendation

three.js r186 (WebGLRenderer, vendored from npm) with **instanced shell fur** in a custom shader. Each output frame
is an **offline accumulation of 32–64 sub-renders**, each jittered for subpixel AA, lens position (true DoF) and
shutter time (motion blur), summed in linear HDR in a float target. Tone map with **AgX** once, then add bloom and
grain in a final pass that takes a `t`-seeded time. Put text and UI in an HTML/CSS layer over the canvas and
capture with `page.screenshot()`. A prototype of this (raw WebGL2, no three) renders a 1080×1350 frame with 96
shells × 16 samples in about 1.8 s on a Radeon 780M iGPU through Playwright, and 128 shells × 24 samples in about
5.6 s. The prototype is in the session scratchpad (`scratchpad/fur/index.html`), which is temporary.

## 1. The official look (from the frames)

**Shapes** are simple, soft, rounded primitives with no limbs or mouths (except Todd's bow tie as a "mouth").
- Alfred: rounded triangle / gumdrop, the front and centre hero. Round black wire glasses with thick rims and
  thin temple arms, and a matte dark bow tie low on the body.
- Felipe: a lumpy cloud blob (4–5 merged spheres). Charcoal fuzzy beret with a little stalk on top, worn tilted.
- Todd: a frog head (a squashed sphere with two domed eye bumps on top), bow tie.
- Iggy: a sphere with two rounded bunny/bear ear lumps. Charcoal headphones: glossy band, fuzzy ear cups.
  Closed "happy" eyes are thin glossy black crescents that taper to points.
- Jojo: a magenta heart, rotated, wearing small round black sunglasses.
- Build them as smooth SDF unions (smin) and mesh them (marching cubes), or as subdivided/deformed spheres. The
  silhouette must be perfectly smooth under the fur, with no facets.

**Fur** is short, very dense plush / bouclé fleece, not long hair.
- Pile length is about 1.5–3 % of body width. The surface breaks into small tufts/clumps about 1–2 % of body
  width, lighter on the tops and darker in the crevices (see `g_20.5.png` Iggy, `alf.png` Alfred).
- The silhouette is a thin fuzzy halo of individual fibres, clearly visible against black under rim light (teaser
  close-ups) and soft against white.
- Accessory fur (beret, bow tie, ear cups) is shorter and denser, like felt/velvet, in charcoal #2c2f34 to #0a0b0d.

**Colours** are saturated candy colours, not washed-out pastels. The pastel tones live in the wordmark. Samples
from the compressed group shot (lit side → shadow side):
- Alfred yellow #fcdd35 / #e3c80f → #885e09
- Felipe cyan-blue #0e9cc2 → #05335b
- Todd green #7ccf1f (est.) / #6bae17 → #2d5308
- Iggy pink #eb6ca9 → #c44268, with a warm salmon #e37f73 bounce at the bottom
- Jojo magenta #db68d1 with near-white #fbe5fd highlights

**Eyes and hard accessories** are glossy black lacquer, almost black chrome: sharp white env-map reflections and a
thin coloured rim picking up the fur colour. Alfred's eyes are large vertical ovals set into the fur. Felipe's are
tiny slit/dot eyes. Todd's are white spheres with black pupils. Material: MeshPhysicalMaterial, color #050505,
roughness 0.05–0.15, clearcoat 1, or metalness 1 with roughness 0.15 for the glasses.

**Lighting**
- Teaser close-ups: pure black background, low key. A strong rim/back light gives a glowing fibre halo, with a
  soft key from the front-top, very little fill, and slow drifting macro camera moves.
- Group shot: pure white #ffffff background, high key, and big soft sources. There's no visible floor and almost
  no shadow, just a faint soft falloff. The fur reads through clump shading, not through shadows.

**Depth of field** is very shallow in the macro shots (a focus band of a few cm, big smooth bokeh falloff over
the fur) and moderate in the group shot (the back characters are slightly soft). The teaser's supers are white
medium-weight sans over the footage, sometimes slightly defocused or transparent while they fade.

**Wordmark** ("dots", lowercase, a geometric sans; OpenAI Sans is likely but unverified) sits centred on white.
Each letter has its own diagonal pastel gradient, plus a faint, wide, soft glow of the same hues. Sampled from
`wm.png`:
- d: #bed0fc (left) → #84def4 (right)
- o: #ece780 → #f5a896 (right edge warms to peach)
- t: #f27bd4 → #e96aec
- s: #a0e1d6 (top) → #b9ecbb → #e8fac3 (bottom right)

The glow is subtle: pixels one cap-height below the letters are already #ffffff.

**UI cards** (Muse reference `refs/muse.jpg`) are white rounded rectangles with 24–32 px radius and very soft,
large, low-opacity shadows, on a white → pale-blue gradient background. Chat bubbles are pale blue (outgoing) and
light grey (incoming).

## 2. Fur: approaches compared

| Approach | Look for plush blobs | Effort | Verdict |
|---|---|---|---|
| **Shell texturing** (N offset copies of the mesh, alpha-tested strand noise) | Excellent for short dense pile; this is exactly the fleece look | Low–medium | **Use this.** |
| Shells + fins (extruded quads on silhouette edges) | Better silhouettes at grazing angles | High in WebGL (no geometry shaders) | Skip. Supersampling + many shells + a rim term hides the silhouette issue for short pile. |
| Raymarched SDF + volumetric fur (single fragment shader) | Beautiful halo, true volume | High; slow per pixel; hard to mix with the UI | Good for one hero macro shot only. |
| Hair cards / strand geometry (instanced lines/curves) | Best for long fur; overkill here | High | Skip. |
| Normal/sheen-only "velvet" (no geometry) | Reads as felt at a distance, dead in close-up | Very low | Use for accessories (beret, bow tie) and distant LOD only. |

**References**
- Acerola, *Shell Texturing* (annotated Unity, MIT): <https://github.com/GarrettGunnell/Shell-Texturing>. Its
  parameters are a good checklist: shellCount (default 16, range 1–256), shellLength, distanceAttenuation (an
  exponent that spreads shells toward the root or tip), density, noiseMin/Max (strand length range), thickness,
  curvature and displacementStrength (gravity/wind), occlusionAttenuation and occlusionBias (fake AO by height).
- three.js ports: <https://github.com/santjc/threejs-shell-texture>, SketchpunkLabs' port
  (<https://x.com/SketchpunkLabs/status/1725679448135991450>), and instanced shells with dithered cut edges at
  <https://github.com/RiveraMaxwell/not-fur-threejs> (MIT).
- Shells + fins in three.js: <https://github.com/piellardj/fur-threejs> (live demo linked in the README). The
  NVIDIA whitepaper explains why fins exist:
  <https://developer.download.nvidia.com/SDK/10/direct3d/Source/Fur/doc/FurShellsAndFins.pdf>.
- Other breakdowns: <https://queenofsquiggles.github.io/tech/shell-fur-breakdown/>,
  <https://www.code-spot.co.za/2024/12/06/exploring-shell-texturing-a-shader-technique-for-fur-effects/>.
- Raymarched fur: simesgreen's "furball" on Shadertoy, <https://www.shadertoy.com/view/XsfGWN> (it raymarches
  through shells; the page returned 403 to the fetcher, so this description is from search results), and
  `tag=fur` on Shadertoy.
- Forum thread: <https://discourse.threejs.org/t/how-to-achieve-the-fur-effect/70223>.

**Recipe that worked in the prototype** (object about 2 units tall):
- **Geometry:** a smooth base mesh at about 50k triangles, and one `InstancedMesh` (or a loop of draws) with
  `h = i/N` per shell. Vertex: `pos + normal*len*h + gravity*len*h*h`, with gravity/wind as a function of `t` only.
- **Shells:** N = 64–96 for mid and wide shots, 128–192 for macro close-ups. Fewer than about 32 shows visible
  stair-step layers (banding) on grazing surfaces. Length is about 0.06 of the unit radius.
- **Strand field:** don't use a plain `floor(p*density)` grid. It leaves a visible axis-aligned seam/cross
  artefact. Use **jittered cells** (Voronoi-style: check the 3×3×3 neighbours, each with a random centre) in
  object space, so there are no UV seams. Project the offset onto the tangent plane (`d -= n*dot(d,n)`) so
  strands are round. Density was about 240 cells per unit.
- **Taper:** discard when `h > L` or `dist > 0.55*(1 - h/L)`. Per-strand length `L = mix(0.45, 1, hash)`.
- **Clumping (the bouclé look):**
  - A clump noise at **about 55 per unit** (a lower frequency such as 14 looks like camouflage blotches) scales L
    by `mix(0.7, 1, clump)`.
  - Strands lean toward clump centres: offset the sample point by the tangent gradient of the clump noise times
    `h²`.
- **Shading:**
  - AO by height: `mix(0.08…0.35, 1, h^0.7)`.
  - Wrap diffuse: `N·L*0.5+0.5`.
  - A rim term `(1-|N·V|)^2.5 * h`, and a separate back-light rim for the black shots.
  - Optionally Kajiya-Kay specular along the strand tangent for sheen.
  - Tint tips slightly lighter than roots.
- **Pitfall, looking straight down the pile:** where the normal faces the camera you see through the gaps to the
  dark roots, and a darker ring/vortex appears in the middle of the body. Keep the root layer (shell 0) at about
  35 % brightness and fully opaque, not black.
- **Pitfall, no alpha blending:** use `discard` (alpha test) with depth write on, not alpha blending. That removes
  all sorting problems. Soft fibre edges come from supersampling (32+ jittered samples), or from
  `material.alphaToCoverage = true` with an MSAA target (available on three.js `Material`).
- **Pitfall, mesh poles:** a UV-sphere pole or bad normals show as a swirl. Use object-space noise, smooth vertex
  normals, and check that normals point outward. The prototype's first render had inward normals, and the shells
  vanished inside the body.
- **Pitfall, shadows:** alpha-tested shells need a `customDepthMaterial` with the same discard, or let only the
  base mesh cast shadows. For this look, the base mesh alone is enough.
- **Pitfall, determinism:** no `Clock`, `performance.now()` or `Math.random()` at render time. Hash functions and a
  seeded PRNG only. Wind is `sin(t*ω)` from `t`.
- **Integration with three.js:** a `ShaderMaterial` with your own lighting is simplest. To keep PBR env lighting,
  use `MeshPhysicalMaterial.onBeforeCompile` to inject the offset and discard, with the shell height from
  `gl_InstanceID/N`.

## 3. Soft studio lighting for plush toys

- **Sheen** (fabric/velvet lobe) on MeshPhysicalMaterial: `sheen` 0–1, `sheenColor`, `sheenRoughness` (default 1),
  and the maps. Examples: <https://threejs.org/examples/webgl_loader_gltf_sheen.html>. Use sheen 1.0,
  sheenRoughness 0.5–0.8 and a sheenColor a bit lighter than the base on the base body and the felt accessories.
  It gives the soft bright edge plush has.
- **Subsurface:** there is no true SSS in WebGL three. Options:
  - The wrap-diffuse term above.
  - <https://threejs.org/examples/webgl_materials_subsurface_scattering.html> (a thickness-map approximation).
  - The WebGPU/TSL `webgpu_materials_sss` example if you move to WebGPU.
  - For fur, height AO plus a warm bounce tint at the bottom (Iggy's salmon underside) sells it better than
    physical SSS.
- **Environment in code:** `new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04)` (RoomEnvironment
  from `three/addons/environments/RoomEnvironment.js`) gives neutral studio reflections on the glossy eyes and
  glasses. For the black shots, build your own tiny env scene: black room plus 2–3 emissive rectangles (a big
  softbox top-front and a thin strip behind for the rim), then PMREM it. The emissive strips are what make the
  eye highlights look like the film.
- **Shadows:**
  - White group shot: no floor. At most a very faint blurred contact shadow
    (<https://threejs.org/examples/webgl_shadow_contact.html>).
  - Soft area-like shadows: <https://threejs.org/examples/webgl_shadowmap_pcss.html>, or, better offline,
    accumulate the jittered light position across the same 32–64 sub-samples
    (<https://threejs.org/examples/webgl_shadowmap_progressive.html> shows the idea).
  - AO: GTAO pass (<https://threejs.org/examples/webgl_postprocessing_gtao.html>) or n8ao 2.0.1. Fur already
    carries its own AO, so apply screen AO lightly, if at all.
- **Tone mapping:** r186 has `AgXToneMapping` and `NeutralToneMapping` (plus ACES Filmic). Use AgX with
  exposure about 1.0–1.3 for saturated candy colours without the hue skews ACES gives on yellow and magenta.
  Use Neutral if the brand colours must stay exact (UI cards, call screens). Compare at
  <https://threejs.org/examples/webgl_tonemapping.html>. Tone mapping applies only when rendering to the screen
  or through `OutputPass`, so accumulate in a HalfFloat/Float target and tone map once at the end.
- **Colour:** `renderer.outputColorSpace = SRGBColorSpace`. Enter the sampled hex values with
  `new Color('#fcdd35')`, which converts sRGB to linear.

## 4. DoF, bloom, grain, motion blur (deterministic)

**Best offline method (recommended): one accumulation loop per frame.**
- For each sample k of K (32–64), take a low-discrepancy pair (R2 sequence or Halton):
  - subpixel jitter via `camera.setViewOffset` (what `SSAARenderPass`/`TAARenderPass` do), or a projection
    matrix nudge;
  - a lens offset on an aperture disc (true thin-lens DoF), by moving the camera in its local XY by the aperture
    radius and shearing the projection so the focus plane stays fixed (off-axis frustum);
  - a shutter time `t_k = t + (k/K - 0.5) * shutter/30` (180° shutter = 0.5), with the whole scene evaluated at
    `t_k`.
- Render linear HDR to a HalfFloat target, add it into an accumulation target (additive blend or ping-pong), and
  divide by K.
- This is physically right on alpha-tested fur. Depth-buffer DoF breaks on fur silhouettes with halos and hard
  edges, because the depth of a fuzzy edge is ambiguous.
- Cost scales linearly. At about 0.1 s per sample on an iGPU, 60 s × 30 fps × 48 samples ≈ 2.5 h. Drop to 16
  samples for drafts.

**Post chain after accumulation** (pmndrs `postprocessing` 6.39.5, `EffectComposer` + `EffectPass`):
- `BloomEffect`: a small intensity for the rim halo on black and the wordmark glow.
- `ToneMappingEffect` (mode AGX), or three's `OutputPass`.
- `NoiseEffect` (grain, premultiplied, opacity 0.03–0.06), `VignetteEffect`, and a slight
  `ChromaticAberrationEffect` (the teaser's glasses edges show a red/cyan fringe).
- Available classes confirmed in the 6.39.5 build: DepthOfFieldEffect, BloomEffect, NoiseEffect,
  ChromaticAberrationEffect, VignetteEffect, SMAAEffect, TiltShiftEffect, ToneMappingEffect.
- **Determinism trap:** `composer.render()` without an argument reads its own `Timer`, and the effect `time`
  uniform accumulates delta. The grain shader is `rand(uv*(1.0+time))`. Call `composer.render(0)` and set the
  time uniform to a value derived from the frame index yourself, or write your own grain pass seeded by `frame`.
- Quick alternatives if accumulation is too slow: `DepthOfFieldEffect` (pmndrs), or three's `BokehPass` /
  `BokehShader2` (<https://threejs.org/examples/webgl_postprocessing_dof2.html>). Expect halo artefacts on fur
  edges.
- Motion blur: accumulation only. `AfterimagePass` depends on the previous frame, so it isn't seekable.

## 5. Wordmark, supers and UI cards

- **Recommended: HTML/CSS layer over the canvas**, composited by the browser, captured with `page.screenshot()`.
  Text stays pixel-crisp, and CSS gradients, blur and shadows are deterministic.
- **Wordmark:** each letter is a `<span>` with `background: linear-gradient(135deg, c1, c2);
  background-clip: text; color: transparent`. Put a duplicate of the word behind it with the same gradients and
  `filter: blur(0.25em); opacity: .5` for the glow. Animate by setting styles from `t` inside `__seek`, not with
  CSS transitions or animations. If you use CSS animations, drive them through the Web Animations API with
  `anim.currentTime = t*1000` and `anim.pause()`.
- **Fonts:** vendor the font file locally, `@font-face`, and `await document.fonts.ready` before the first frame.
  OpenAI Sans is proprietary and the name is unverified; the scratchpad has a `refs/a.ttf` (contents not checked).
- **Cards:** `border-radius: 28px; background: #fff; box-shadow: 0 30px 80px rgba(20,40,80,.12),
  0 4px 12px rgba(20,40,80,.06)`. For "depth" blur on cards behind the focus, use `filter: blur(Npx)` driven by t.
- **In-3D text if needed:** troika-three-text (SDF). `font` takes a local .ttf/.otf/.woff URL. `sdfGlyphSize` is a
  power of two, default 64; use 128 for big type. `outlineBlur` gives a soft glow. It has no gradient support, so
  put gradients in a custom shader or keep them in CSS. `sync()` is asynchronous (web worker): await
  `text.sync(cb)` before capturing, or the first frames come out blank.
  <https://github.com/protectwise/troika/blob/main/packages/troika-three-text/README.md>
- **Alternative:** draw text into a 2D canvas, then a `CanvasTexture` on a plane. That's fine for chat bubbles
  that must sit inside 3D space (phone screen).

## 6. Headless rendering constraints (tested on this desktop, 2026-09-30)

Tested with Playwright 1.63.0 / Chromium 153.0.8010.12 on Windows 11 with a Radeon 780M:

| Launch | WebGL renderer |
|---|---|
| `chromium.launch({headless:true})` (headless shell, the default) | **SwiftShader** (CPU, slow), MAX_SAMPLES 4 |
| headless shell + `--enable-gpu --ignore-gpu-blocklist --use-angle=d3d11` | **Radeon 780M, D3D11**, MAX_SAMPLES 8 |
| `{headless:true, channel:'chromium'}` (new headless) | **Radeon 780M, D3D11** with no flags |
| new headless + `--use-angle=gl` | Radeon, OpenGL 4.5 |

- **Use `channel: 'chromium'`** (new headless = real Chrome, per <https://playwright.dev/docs/browsers>), and
  optionally `--enable-gpu --ignore-gpu-blocklist --use-angle=d3d11`. At start-up, **assert** that
  `WEBGL_debug_renderer_info` does not contain "SwiftShader", so a silent CPU fallback can't cost hours.
- SwiftShader auto-fallback is deprecated. It needs `--enable-unsafe-swiftshader` on machines without a GPU
  (<https://chromium.googlesource.com/chromium/src/+/main/docs/gpu/swiftshader.md>,
  <https://groups.google.com/a/chromium.org/g/blink-dev/c/yhFguWS_3pM>). It gives the same image logic at far
  lower speed, and float targets worked there too (EXT_color_buffer_float true).
- Old advice to use `--use-gl=desktop` / `egl` (2022,
  <https://michelkraemer.com/enable-gpu-for-slow-playwright-tests-in-headless-mode/>) predates ANGLE-only
  Chromium. Treat it as outdated (unverified on current builds).
- **preserveDrawingBuffer:** in the test, with `false`, reading the canvas in the same JS task as the draw
  worked, but after a rAF the buffer was cleared (0,0,0,0). `page.screenshot()` captured correctly in both
  cases. Set **`preserveDrawingBuffer: true`** so any capture path is safe.
- Capture options:
  - `page.screenshot()` composites the DOM text layer with the canvas. It took about 36 ms per 1080×1350 PNG.
  - `canvas.toDataURL()`, or `readPixels` from the final target, for canvas-only passes.
  - Pipe PNGs to ffmpeg (`-framerate 30 -i %05d.png -c:v libx264 -crf 14 -pix_fmt yuv420p`).
- Viewport 1080×1350 with `deviceScaleFactor: 1`. Supersample in-engine (accumulation), not with DPR 2: DPR 2
  doubles the DOM text resolution but also doubles WebGL cost for no gain over jitter.
- Vendoring: `npm i three@0.186.1 postprocessing@6.39.5` and serve `node_modules` over a local static server or
  an import map with relative paths. Load no CDN at render time; note the official three pathtracer example
  imports from jsDelivr.
- Seek contract:
  - `__seek(t)` must be async-safe: await textures, fonts and troika sync on the first call.
  - Render everything synchronously from `t`, then resolve.
  - Never rely on rAF timing.
  - For glTF animation, use `mixer.setTime(t)`.

## 7. Alternative stacks (one-line verdicts)

- **Single fragment-shader raymarching** (SDF bodies + volumetric fur, Shadertoy style): the best silhouette halo
  and cheap true DoF by jittering rays, but slow per pixel, hard for multiple characters and for the UI. Use it
  for one macro hero shot at most.
- **three-gpu-pathtracer 0.0.26** (needs three ≥0.185, three-mesh-bvh ≥0.9.15; example
  `webgl_renderer_pathtracer`): gorgeous soft GI on the white group shot, but alpha-tested shell fur × path tracing
  is very slow and noisy. Use it for base, eyes and accessories only if time allows, with the fur still shells.
- **three.js WebGPU/TSL** (`webgpu_postprocessing_dof`, `webgpu_postprocessing_motion_blur`, `webgpu_materials_sss`):
  more modern post nodes, but headless WebGPU is riskier. Stay on WebGL for this deadline.
- **Babylon.js FurMaterial** (shell fur built in: `furSpacing`, `furDensity`, `furGravity`, `furSpeed`,
  `FurifyMesh`, <https://github.com/BabylonJS/Babylon.js/blob/master/packages/dev/materials/src/fur/readme.md>):
  the fastest route to "some fur", but the look is dated and less controllable than a custom shell shader. Only
  use it if a team already knows Babylon.
- **Blender/Cycles fur, then encode:** the true match for the official look, but it breaks the "entirely in code,
  in the browser" constraint.

## Open questions

- The wordmark font (OpenAI Sans?) and the exact official hex values. Ours are sampled from compressed video.
- simesgreen's Shadertoy content wasn't read directly (403). The description comes from search snippets.
- Frame times above are from a raw-WebGL2 prototype. A full three.js scene with PBR, env and post will be slower;
  budget 2–4× more.
