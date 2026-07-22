# Personal website

Personal site for **Abdul Rahman El Saddik** — about/resume, projects, and writings. Built with Next.js, TypeScript, and Tailwind CSS. Light theme by default with a dark toggle. Black and white only.

## Folder structure

```
personal-website/
├── app/
│   ├── page.tsx              # Home / About
│   ├── projects/page.tsx     # Project write-ups
│   ├── writings/page.tsx     # Linked articles
│   ├── layout.tsx            # Nav, footer, theme shell
│   └── globals.css           # Light/dark tokens
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── content/
│   └── site.ts               # All copy: about, experience, projects, writings
└── README.md
```

Edit **`content/site.ts`** to update bio, roles, projects, and links. Keep valid TypeScript string quotes — a syntax error will break the Vercel build.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export → out/
```

## Deploy

**Vercel (recommended):** import the repo; framework preset Next.js. `output: "export"` still works on Vercel.

**GitHub Pages:** push, then publish the `out/` folder from `npm run build` (or wire Actions to build and deploy `out`). If the site is not at the domain root, set `basePath` in `next.config.ts`.

## Theme

Default is light. Preference is stored in `localStorage` under `theme`. Toggle lives in the nav.
