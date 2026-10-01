# Voiceover

> **In this repo:** `vo1.wav`–`vo6.wav`, generated for this film with Gemini TTS. **Not in this repo:**
> `guide-mix.wav`, because it contains the licensed music track. Rebuild it from your own `music.wav` and these six
> lines with the settings in the last paragraph below.
>
> The text below is the README exactly as both runs got it.


Six lines, generated on 2026-09-30 with Google Gemini TTS (`gemini-3.8-flash-tts`, voice **Sulafat**, a warm, soft
narrator prompt). Maxim picked the voice and approved the lines and timings on a guide mix. Each take was checked word
for word with Deepgram Nova-3 speech-to-text, and none clips.

Files are 48 kHz mono WAV, trimmed to the speech (≈30 ms of silence at the start, a short natural tail at the end),
with voiced RMS levelled to about −20 dBFS and the peak at or below −1 dBFS. The word starts about 30 ms after the file
starts, so place each file at its start time as written, without an extra offset.

| file | line | start in the film (s) | length (s) | on the music |
|---|---|---|---|---|
| vo1.wav | Introducing dots. | 1.89 | 2.27 | bar 2 of the intro |
| vo2.wav | This is your dot. | 5.66 | 1.94 | bar 4 of the intro |
| vo3.wav | It takes care of the little things, | 9.44 | 2.30 | bar 2 of the groove |
| vo4.wav | and checks with you before the big ones. | 15.10 | 2.34 | bar 5 of the groove |
| — | no voice over the drop | 22.65–37.95 | | |
| vo5.wav | And while you sleep, it keeps working. | 38.05 | 2.95 | inside the 3 s silence, ends before the beat returns |
| vo6.wav | Your dot is ready to meet you. | 52.87 | 2.18 | as the second full section settles |

`guide-mix.wav` is the approved guide: `music.wav` 0–60 s, fade-out 57.5–60 s, these six lines at these times, the music
ducked under the voice with `sidechaincompress` (threshold 0.03, ratio 6, attack 15 ms, release 350 ms), −14 LUFS. It
is a timing reference for you, not the final mix: build your own mix with the SFX.
