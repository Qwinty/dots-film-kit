# Official frames (not in this repo)

Both runs got this folder with stills taken with ffmpeg from OpenAI's dots teaser and launch film (see
`refs/README.md` for the links): 8 key frames (`g_3.png`, `g_9.png`, `g_14.png`, `g_17.png`, `g_20.5.png`,
`g_21.3.png`, `g_23.png`, `g_26.5.png`, the number is the second in the teaser), two contact sheets (`sheet1.jpg`,
`sheet2.jpg`) and the wordmark end card (`wm.png`). They show the group shot, the chat UI and the wordmark.

They are OpenAI's frames, so they are not redistributed. To rebuild them, extract the same seconds from the teaser:
`ffmpeg -ss 23 -i refs/official-teaser.mp4 -frames:v 1 research/official-frames/g_23.png`.
