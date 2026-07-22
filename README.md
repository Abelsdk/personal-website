# Personal website

Personal site for **Abdul Rahman El Saddik** — about/resume, projects, writings, and Spotify Now Playing. Built with Next.js, TypeScript, and Tailwind CSS. Light theme by default with a dark toggle. Black and white only.

## Folder structure

```
personal-website/
├── app/
│   ├── page.tsx              # Home / About
│   ├── projects/page.tsx
│   ├── writings/page.tsx
│   ├── api/spotify/route.ts  # Now Playing API (server)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── now-playing.tsx
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── content/
│   └── site.ts               # All copy
├── lib/
│   └── spotify.ts
├── scripts/
│   └── spotify-auth.mjs      # One-time refresh-token helper
└── README.md
```

Edit **`content/site.ts`** for bio/roles/projects. Keep valid TypeScript quotes — a syntax error breaks the Vercel build.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill Spotify vars (below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Spotify Now Playing

Shows the track you’re listening to (or last played) on the About page. Updates about every 30 seconds in the browser. Secrets stay on the server — never put them in `content/` or client components.

### One-time setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) → **Create app**.
2. App settings → **Redirect URIs** → add exactly:
   `http://127.0.0.1:3456/callback`
3. Copy **Client ID** and **Client Secret** into `.env.local`:

```bash
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

4. Run the auth helper and approve access in the browser:

```bash
npm run spotify-auth
```

5. Paste the printed `SPOTIFY_REFRESH_TOKEN` into `.env.local`.
6. On **Vercel** → Project → **Settings → Environment Variables**, add the same three vars for Production (and Preview if you want). Redeploy.

Until env vars are set, the Now Playing block stays hidden (site still builds).

## Deploy

**Vercel:** import the GitHub repo (Next.js preset). This project uses a Node serverless route for Spotify, so it is **not** a static HTML export anymore (GitHub Pages alone won’t run `/api/spotify`).

## Theme

Default is light. Preference is stored in `localStorage` under `theme`. Toggle lives in the nav.
