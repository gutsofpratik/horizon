# Horizons Lab

A light monochrome website for an independent AI lab and its flagship desktop app, Horizon. Built with React, TypeScript, and Vite.

## Pages

- `/`: lab overview, interactive research directions, Horizon screenshots, the open ecosystem, and desktop downloads.
- `/research`: model training/adaptation, efficient inference, agents and tools, and the lab's experimental approach.
- `/about`: purpose, guiding principles, and the project maintainer.
- `/contact`: contact placeholders, public GitHub channels, and topic-based enquiry drafts. Clicking Continue on GitHub opens a draft issue; it does not post a message.

Research ambitions are distinguished from published results. The site does not claim published training runs, original model weights, measured throughput, or research papers that do not exist.

## Motion and identity

Original SVG icons, a pointer-responsive floating sculpture, animated neural connections, an interactive research selector, scroll progress, and restrained section/hover transitions. All motion respects `prefers-reduced-motion`. No animation or rendering library is required in production.

The hero artwork is pre-rendered with `scripts/sculpture-renderer.js`. The live page uses an ordinary PNG, not a WebGL runtime.

## Contact configuration

The email is intentionally unconfigured. Set `PUBLIC_CONTACT.email` in `src/data/labContent.ts` when the public inbox is ready. Until then, the Contact page clearly says the address is coming soon. No invented inbox or nonfunctional submission form is shown.

## Content sources

- [Horizon](https://github.com/gutsofpratik/Horizon): application features, screenshots, and v0.3.3 release packages.
- [Horizon Models](https://github.com/gutsofpratik/Horizon-Models): model selection and runtime guidance. Hardware estimates are not benchmarks.
- [Horizon Skills](https://github.com/gutsofpratik/Horizon-Skills): reusable instructions, provenance, and license information.
- [Pratik Soni](https://github.com/gutsofpratik): public maintainer profile.

The lab's research interests and intended direction are based on the project owner's brief.

## Development

Use a Node.js version supported by Vite 8 (Node 20.19+ or 22.12+).

```sh
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Production files are generated in `dist/`. Routes use normal browser navigation; configure your static host to serve `index.html` for page routes. `vercel.json` includes that rewrite for Vercel.

## Main files

- `src/App.tsx`: shared header/footer and homepage.
- `src/components/LabPages.tsx`: Research, About, Contact, and not-found content.
- `src/components/ResearchExplorer.tsx`: keyboard-accessible research tabs and animated neural field.
- `src/components/LabIcons.tsx`: custom SVG icon set.
- `src/components/PageMotion.tsx`: scroll progress and section reveal lifecycle.
- `src/components/LabVisuals.tsx`: hero artwork and pointer response.
- `src/App.css`, `src/motion.css`, and component CSS: responsive layout and motion.
- `src/data/labContent.ts`: public contact configuration.

Earlier unused components and sample datasets remain in the repository; they are not sources for current claims.

## Releases

The download card identifies v0.3.3 explicitly. Update the release label and asset URLs together in `src/App.tsx` for a new release. Models and provider accounts are separate from the app download.

Horizon is an independent project and is not affiliated with Anthropic.

## Cloudflare deployment

Production: https://openhorizonlab.org

The site is deployed as Cloudflare Workers static assets. `wrangler.jsonc` pins the selected Cloudflare account and enables single-page application fallback so direct visits to Research, About, and Contact work.

```sh
npm run deploy:check
npm run deploy
```

Wrangler authentication is stored outside this repository. Log in to the configured account with `npx wrangler login` before deploying. For a deliberate account change, update `account_id` in `wrangler.jsonc` after authenticating to the intended account. The custom domain openhorizonlab.org is attached to the horizons-lab Worker. The workers.dev address is disabled.

## Local forms and private administration

The Vite preview serves `/api/waitlist` and `/api/contact` through `server/previewForms.ts`. Submissions are validated and persisted under `.horizon-data/submissions.jsonl`. This directory is ignored by Git. Duplicate waitlist email addresses do not create additional records. A honeypot and request limits reduce basic automated submissions.

The local administration screen is `/admin`. Its access token is generated on first server start and stored in `.horizon-data/admin-token`; open that private file locally to sign in. The token is not included in frontend source or printed in application logs. Administration supports viewing the two submission types and CSV export. CSV cells beginning with formula characters are escaped.

Production form handling is prepared in `worker/index.ts`. The Cloudflare D1 database `horizons-lab-forms` and the schema in `worker/schema.sql` have been created. The Worker configuration binds it as `DB`. Before a future production release, configure a strong `ADMIN_TOKEN` with Wrangler's secret command; without that secret the production admin endpoint denies access. Database records remain private. The website and Worker changes have not been deployed as part of this preview revision.

Forms confirm storage on the page. Automated email delivery is not configured. Local preview submissions stay on the local machine and are not silently copied to the production database.

## Current preview workflow

The user requested no sub-agents and no UI or other tests for this revision. Keep work in local preview until the user reviews it. No exact-reference-parity or testing claim is made for these changes.
