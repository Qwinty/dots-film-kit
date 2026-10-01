# dots UI references

> **Screenshots not in this repo.** The 25 images are frames from OpenAI's videos and screenshots from other people's
> X posts, so they are not redistributed. The table keeps the source link for each one, and the notes on the UI
> language are ours.
>
> The text below is the README exactly as both runs got it.


Collected 2026-09-30, the day after launch. Files 01–06 are frames from OpenAI's own videos (`refs/official-teaser.mp4`,
`refs/official-film.mp4`, extracted with ffmpeg at 1920×1080). Files 07–25 come from X posts (original resolution via
`?name=orig`) and one TechCrunch image. Screenshots by users show the live product. Keynote photos/captures show OpenAI's
DevDay demo. openai.com and help.openai.com returned 403, so none of these come from the official pages directly.
Hex values were sampled from JPEG/video with PIL, so they're approximate (±3 per channel).
These files are for reference only. Don't paste them into the film.

## Files

| # | File | Source (date, UTC) | What it shows |
|---|---|---|---|
| 01 | `01-teaser-phone-chat-alfred.png` | teaser 24.3 s, https://x.com/OpenAI/status/2104980481876070819 (09-29) | OpenAI's own phone shot. It's a **flat, front-on 2D phone**: no perspective, no reflections, cropped by the bottom of the frame, on pure #ffffff. Outer frame 1036 px wide in a 1920 frame, black bezel ring about 22 px (2 % of width), outer corner radius about 17 % of width, thin side-button bumps 2–4 px. Status bar "11:30" plus signal/wifi/battery. Top bar: round hamburger button left, round phone button right (white circles with a hairline border), and Alfred's 3D avatar (about 60 px) over a white name pill "Alfred". Grey "Today 11:30 AM" timestamp. Incoming bubble #f3f3f3 with black text. |
| 02 | `02-film-sidebar-your-dot.png` | film 22 s, https://x.com/OpenAI/status/2104984504133918973 (09-29) | The ChatGPT mobile sidebar on a framed easel screen: "ChatGPT" title, search icon, then **"Your dot"** (highlighted row, rounded grey fill) above Scheduled / Library / Customize / Explore, each with a line icon. |
| 03 | `03-film-screen-chat-jojo.png` | film 58 s | A large screen with a chat: the "Jojo" name pill at the top, a grey incoming bubble, large type. UI shown flat on a physical screen in a live-action set. |
| 04 | `04-film-screen-felipes-computer.png` | film 47 s | "Felipe's Computer": the dot's cloud computer view. A sky-blue gradient desktop, a white slide ("Consumer experience", KPI tiles, bar chart), and Felipe's avatar used as the **mouse cursor** (the dot drives the pointer). Label "Felipe's Computer" with a laptop icon at the bottom. |
| 05 | `05-film-screen-call-dark.png` | film 93 s | A dark call screen on an easel: yellow Alfred avatar, grey speaker, red hang-up and mute buttons in a row, and the chat transcript continuing below. |
| 06 | `06-film-phone-in-hand.png` | film 70 s | The only real phone in the film: a hand-held phone in a purple case, magenta outgoing bubbles for Jojo. Shallow depth of field, live action. |
| 07 | `07-web-chat-light-customize-orange.jpg` | https://x.com/moltikuji/status/2105097645962457169 (09-30) | Web chat in Japanese, light. Background #fcfcfc, incoming bubbles #edf1f2 to #f3f3f3 (fully rounded pills for 1-line messages, about 20 px radius when multi-line). **Outgoing bubbles take the dot's colour**: an orange dot gives orange bubbles #fa7003 with white text. A **"Customize your dot >"** chip (#e6e9ff fill, blue text, person icon) is the entry to naming and shape. The avatar is a flat coloured ring (an un-customised dot) above a white name pill with a hairline border. Red "!" = delivery-failed retry. |
| 08 | `08-mobile-chat-light-peter-blue.jpg` | https://x.com/pejmanjohn/status/2105079010321658093 (09-29) | **Best mobile light-mode reference.** A 3D blue cloud "Peter" in a beret, overlapping the top of a pill "Peter" (#eef1fa, soft shadow). Glassy round buttons (hamburger left, phone right) float over content blurred behind them. Outgoing bubble #4065e7 (a blue dot gives blue bubbles), fully rounded, white SF-style text. "Read 4:31 PM" in #88888a under it. Incoming bubble #f2f2f2, radius about 44 px at 3× (≈15 pt). Input: a pill with a hairline border, "+" left, mic right. |
| 09 | `09-keynote-desktop-chat-dottie-teal.png` | https://x.com/Voxyz_ai/status/2104990654178721841 (09-29, DevDay capture) | Desktop (Codex/ChatGPT app), white. Left sidebar: "Codex", New chat, **dottie** (tiny avatar icon), Projects. Top centre: the teal 3D avatar, name "dottie", status **"Thinking…"**, timestamp. Outgoing bubbles teal #1bc5ad, fully rounded. Incoming dot messages are **plain text with no bubble** on desktop. "48s · Call ended" chip. "Sent in page" meta. Top-right icons: computer, phone, panel. Send button a pale-teal circle #c9f4ef. |
| 10 | `10-keynote-mobile-chat-reactions.jpg` | https://x.com/yannisbuilds/status/2104983711565435311 (09-29) | Keynote slide: the presenter on the left, a **flat phone mock** on the right (a rounded rect with a thin light border, no 3D). Mobile chat with dottie, teal-green outgoing bubble (#489b89 on the dimmed projector capture), an iMessage-style tapback reaction bar (heart, thumbs up/down, !!, laugh, check), and a context menu (Copy / Select text / Reply) with frosted glass. |
| 11 | `11-mobile-chat-dark-first-message.jpg` | https://x.com/Joash0x/status/2105113005646332317 (09-30) | Mobile dark mode, a new dot "dotty magoo": pure #000000 background, incoming bubbles #212121, placeholder avatar = a **blue-grey ring #b8c0d0** with a black centre (every dot looks like this until customised). The dot's first messages: "Hey! I'm your dot." / "Message or call me anytime…" / "Want to give me a name?" |
| 12 | `12-mobile-dark-call-bar-and-chat.jpg` | https://x.com/tonylewis/status/2105184922113826848 (09-30) | Mobile dark: an in-call panel at the top (a blue ring avatar, name "dot", timer 5:35, speaker / red hang-up / mute pills), and below it the chat with a blue outgoing bubble (#4967d6) and a "4:50 · Call ended" chip. |
| 13 | `13-keynote-mobile-call-screen-green.png` | https://x.com/Voxyz_ai/status/2104990654178721841 (09-29) | Keynote: the full-screen call is a **solid field of the dot's colour** (green here), avatar at the top, timer, three round buttons at the bottom (red hang-up in the middle). This matches the yellow/pink call screens in the film. |
| 14 | `14-web-chat-light-read-receipt.jpg` | https://x.com/kavindpadi/status/2105164684064403958 (09-30) | Web chat on a magenta-to-blue wallpaper: a white card, a light-blue outgoing bubble, "Read 10:08 PM", a grey incoming bubble, the input "Send a message" with mic and a round send button. |
| 15 | `15-web-modal-create-your-dot-light.jpg` | same post | **Onboarding modal 1** (light): a ring avatar, "Create your dot", subtitle "Dots are remarkably capable always-on agents", three feature rows with small blue line icons (Built to take on complex work / Proactively helpful / Respects your choices), and a full-width **black pill "Continue"**. White card, radius about 16 px, lots of air. |
| 16 | `16-web-modal-choose-where-dot-works.jpg` | same post | **Onboarding modal 2**: an illustration of a tablet-like "dot's computer" (rounded bezel, blue-grey), "Choose where your dot can work", a radio list (Your dot's computer ✓ / Your local computer + "Open app"), and a black pill Continue. |
| 17 | `17-web-modal-connect-plugins-dark.jpg` | https://x.com/_0xKenny/status/2105133026971931037 (09-30) | **Onboarding modal 3**, dark (#0e0e0e): "Make your dot more helpful", a list of plugins (Gmail, Calendar, Contacts, Drive), a white pill "Continue with Google", and the text link "Continue without giving your dot this context". This is the closest thing to a permission step found. |
| 18 | `18-web-sidebar-your-dot.png` | https://x.com/kavindpadi/status/2105164684064403958 (09-30) | Web sidebar (light): ChatGPT, bell, search, New chat, **"Your dot"** with the ring icon, Pinned. |
| 19 | `19-web-dot-profile-card.jpg` | https://x.com/firdavsabdu/status/2105164473657102686 (09-30) | **Dot profile card/popover**: avatar "afandi" (blue cloud with beret), "Active 3 minutes ago", Call and Slack buttons, Computers ("afandi's computer · Connected"), Recent activity, Outputs. White card, about 12 px radius, on a purple wallpaper. |
| 20 | `20-web-modal-not-available-light.jpg` | https://x.com/sam_odo/status/2104983168906617032 (09-29) | Paywall/region modal: a big ring avatar with the five mascots peeking over its bottom edge, "Dots aren't available on your plan yet", and a black pill "Got it". Usable as a gag. |
| 21 | `21-official-dots-computer-desktop.jpg` | TechCrunch, credit OpenAI: https://techcrunch.com/wp-content/uploads/2026/09/Screenshot-2026-09-29-at-1.16.22-PM.jpg (09-29) | OpenAI press image: a desktop app with the chat on the left (yellow outgoing bubble for Alfred), a yellow-framed "dot's computer" panel on the right showing a browser, and Alfred peeking in the corner. Only 988×558. |
| 22 | `22-keynote-slack-dot-agent.png` | https://x.com/Voxyz_ai/status/2104990654178721841 (09-29) | **The dot in Slack** (dark Slack theme, DevDay demo): the dot posts as a Slack member with its avatar and an "AGENT"-style tag, replies in threads, and people @mention it. |
| 23 | `23-keynote-codex-dot-canvas.png` | same post | Codex/Space page: a chart the dot built, with a comment thread on the right. |
| 24 | `24-mobile-dots-computer-browser.jpg` | https://x.com/fienixtaranova/status/2105029426563981742 (09-29) | Mobile: watching the dot's computer browse travel.state.gov, a URL pill at the top, and the dot's round button bottom-right. |
| 25 | `25-openai-com-introducing-dots.jpg` | https://x.com/xaiwind/status/2105116804750475751 (09-30) | Capture of openai.com "Introducing dots", black page: the frog mascot, date, "Create your dot ↗" and "Contact sales" pills, and the lede "Dots are remarkably capable, always-on agents built to handle everything." |

Not found (as of 2026-09-30): a **shape/character picker** screenshot (behind "Customize your dot", file 07) and an
explicit **"Allow / Deny" permission prompt** for sensitive actions. Testers say a thumbs-up reply counts as approval
(https://x.com/antonioleivag/status/2104982218678378855). Teams: nothing seen. For a permission card, borrow the
onboarding-modal language (15–17) and mark it as invented.

## UI language summary

- **iMessage, not ChatGPT.** Mobile chat copies iMessage: centred avatar and name pill, round glass buttons in the
  corners, grey incoming bubbles, coloured outgoing bubbles, "Read 4:31 PM", tapbacks, a context menu. People noticed and
  mocked it ("why do dots have read receipts", https://x.com/neuroswish/status/2105076522453446769).
- **The dot's colour is the accent.** Outgoing bubbles, the call-screen background and the computer frame all take the
  dot's body colour: yellow Alfred #fcdd35-ish, blue #4065e7, teal #1bc5ad, orange #fa7003, magenta. Everything else
  stays neutral (white/#f2f2f2 or black/#212121).
- **The avatar is a small 3D render.** The mascot sits over the top edge of its name pill, about 1.3× the pill's height,
  with a soft contact shadow. Before customising, it's a flat ring (#b8c0d0 on light and dark).
- **Shapes:** everything is fully rounded. Pills for 1-line bubbles, names, buttons and inputs. Bubbles have about 15–18 pt
  radius and no tails. Cards and modals have 12–16 px radius. Buttons are black pills (light mode) or white pills (dark mode).
- **Type:** OpenAI Sans / SF-like grotesk. Body 15–17 pt on mobile, 14 px on web. Names are semibold. Meta text is grey
  #88888a at about 11–12 pt. Unverified font name.
- **Desktop:** the dot's messages have no bubble (plain text, ChatGPT-style); only the user's messages are coloured
  bubbles. Status under the name: "Thinking…" / "Active 3 minutes ago".
- **The dot's computer** is framed like a tablet with a thick rounded bezel in the dot's colour, and the dot's avatar
  acts as the mouse cursor (04, 21).

## How OpenAI's own videos show UI

- **Teaser:** a flat, front-on phone (a 2D vector frame, black ring bezel) with pixel-crisp UI, cropped at the bottom,
  on white. No 3D phone, no tilt, no glass reflections. The phone slides/scales in as a flat layer after the mascot
  group shot (frames 22.5–26 s).
- **Film:** UI is never in a 3D-rendered phone. It appears full-bleed on physical easel/wall screens in live action
  (02–05) and once on a real hand-held phone (06).
- **Keynote:** a flat phone outline next to the presenter's camera feed (10, 13).
- The reference ads do the same: Grok Bot uses a frameless flat phone (a rounded screen with a punch-hole, soft shadow)
  on a green gradient. Meta Muse uses no phone at all, just floating cards and bubbles on a white-to-blue gradient.
