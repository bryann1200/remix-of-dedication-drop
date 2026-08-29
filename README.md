# Remix of Dedication Drop

Build a "Dedications Wrapped" — a Spotify Wrapped-style animated reveal experience,

one full-screen slide sequence per teacher dedication, swipeable/auto-advancing

like Instagram Stories.

BACKEND — DO NOT CREATE ONE

This app connects to an EXISTING Supabase project as a read-only data source.

Do not run migrations, do not create tables, do not scaffold your own schema or

auth. When Lovable's Supabase integration setup asks, connect to my existing

project using the URL/anon key I provide, and query the existing table below

as-is.

Existing table: `dedications`

- teacher_name (text)

- from_name (text)

- message (text)

- song_title (text)

- song_artist (text, nullable)

- audio_path (text — file path inside the existing public `dedication-audio`

  storage bucket; build the playable URL as the bucket's public URL + this path)

- created_at (timestamptz)

Fetch all rows ordered by created_at, one slide sequence per row. This is the

ONLY data operation the app performs — read-only SELECT. No insert, update,

delete, or admin/upload UI of any kind. All dedication entries are added

separately, outside this app.

VISUAL STYLE

Cartoonish but restrained — not childish, not corporate. Confident oversized type,

bouncy rounded shapes, saturated gradient backgrounds that shift per slide, playful

but purposeful motion (spring easing, not bounce-everything). Avoid cutesy mascots,

drop shadows on everything, or emoji-heavy decoration. Reference points: Spotify

Wrapped, Duolingo's brand refresh, Notion's calm playfulness — not Canva templates.

Color: rotate each slide through a small set of high-contrast gradient pairs

(e.g. deep plum → hot coral, ink navy → warm amber, forest → citrus yellow).

Type: one confident rounded-sans display face for the big reveals, one clean

utility face for supporting text.

SLIDE SEQUENCE (per dedication, in this exact order)

1. Teacher's name — the big reveal, largest text on screen, centered, animates

   in first (e.g. "This one's for Mr. Tan").

2. Who it's from — smaller reveal underneath/after ("— from Sec 3 Amethyst").

3. The song dedicated to them — title + artist as an album-style card, with a

   play button that plays the actual dedication audio, plus the written message

   underneath in a smaller readable block.

Each slide auto-advances after ~6 seconds (or on tap/swipe), with a subtle

progress bar at the top like Stories. Include a replay button and an "end of

dedications" closing screen after the last one.

INTERACTION

- Landing screen: "Start" button before the sequence begins (autoplaying audio

  needs a user gesture first).

- Tapping right side of screen = next slide, left side = previous.

- Mobile-first, but should look good full-screen on a projector/TV too — this

  is meant to be shown to teachers at a school assembly.

- Handle the empty state (no dedications yet) and loading state gracefully,

  in the same visual voice as the rest of the app.

SCOPE — build this complete and functional in one pass. The only screens are:

the landing/start screen, the slide sequence itself, and the closing screen.

Nothing else.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bcf20aaf-fc5d-42a6-87a1-ec7aabdbff0d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
