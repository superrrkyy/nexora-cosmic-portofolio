# Nexora Cosmic Portfolio

An original, procedural 3D developer portfolio. A cinematic universe and a readable portfolio share one typed content source. Built directly with React and TypeScript; no site generator service, backend, analytics, or remote runtime assets.

**Content status:** this is a ready-to-personalize portfolio, not a claim about an actual developer. The profile, skills and projects are labeled examples. Experience and contact details are intentionally unconfigured.

## Quick start

Node **22 LTS** is pinned in `.nvmrc` and used by CI. Node 20.19+ is also supported; the implementation was verified locally with Node 20.20.2 and npm 10.8.2.

```sh
nvm use                 # optional; selects .nvmrc
npm ci                  # reproducible installation from package-lock.json
npm run dev             # http://localhost:5173
```

`npm install` also works, but `npm ci` is preferred from a clean checkout. The browser preview binds to `0.0.0.0`; hosted preview origins are accepted. No environment files or credentials are required.

## Explore

- **Enter the universe:** enable drag-to-orbit and bounded scroll/touch zoom.
- **Choose a destination:** click a 3D body, its projected HTML label, the header, or one of five navigation cards.
- **Planet focus:** one damped camera controller retargets the current transition. A selected planet remains to the left of the desktop panel.
- **Panels:** profile, searchable projects, grouped skills, factual timeline, and configured contact links. Previous/next, refocus, Escape, close, and return controls are included.
- **Portfolio mode:** a conventional readable page, without a mounted WebGL canvas. All five sections remain available.
- **HTML-only:** `portfolio.html` is generated from the same configuration. It works without JavaScript. The production index also embeds complete no-script content.
- **Settings:** High, Balanced, Low, and reduced motion. Preferences stay in this browser only.
- **Fallback:** context creation errors or context loss open the readable portfolio. “Explore in 3D” retries; persistent failure safely returns to 2D.
- **Search:** title, description and technology search, category filters, empty state, inline project details. `/` focuses search when a projects view is open.

## Personalize

| File                        | Edit                                                                                                                                                      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/profile.ts`       | Name, role, biography, interests, optional image URL, email, public links; set `isSample: false` only after replacement                                   |
| `src/data/projects.ts`      | Real project text, technologies, category, status, `featured`, repository/demo URLs, optional screenshot/case study; remove examples or keep them labeled |
| `src/data/skills.ts`        | Actual skill groups; set `skillsAreSample: false` when factual                                                                                            |
| `src/data/experience.ts`    | Verified work, education, certification or milestones; empty is supported                                                                                 |
| `src/data/theme.ts`         | Primary UI color tokens (mint/background/text/secondary wired to CSS variables); other palette changes also require matching CSS and scene colors         |
| `src/cosmic/sceneConfig.ts` | Destination labels, positions, sizes and planetary colors                                                                                                 |
| `src/lib/quality.ts`        | Star counts, DPR caps, geometry quality, optional effects                                                                                                 |
| `index.html`                | Title and social description                                                                                                                              |

External links and optional image URLs must be absolute HTTP(S) URLs. Invalid links, credentials-in-URLs, JavaScript and data schemes are omitted. Contact email is validated separately. Configured images load only if supplied; none are needed for the shipped scene. Check ownership/licenses and compress any images before adding them. The link validator checks syntax and protocol, **not remote uptime**. Status labels are configuration values, not a claim that a demo is live.

Example (replace values with your own verified data):

```ts
{
  id: 'your-project',
  title: 'Your actual project',
  description: 'A factual description of your work.',
  technologies: ['React', 'TypeScript'],
  category: 'Interfaces',
  status: 'in-development',
  repositoryUrl: '',
  liveUrl: '',
  featured: true,
  isSample: false,
}
```

Do not put secrets in any `VITE_*` variable or source file. Frontend content is public.

## Commands

```sh
npm run dev
npm run format          # format source and documentation
npm run format:check
npm run lint
npm run typecheck
npm test                # 37 unit/component tests
npm run test:watch
npx playwright install --with-deps chromium
npm run test:e2e         # browser, fallback, mobile, keyboard, automated a11y
npm run build           # dist/ + static portfolio + no-script content
npm run verify:assets
npm run preview         # preview production, default port 4173
```

For measurements, start a production preview on port 5173, then run `node scripts/measure.mjs`. Override with `MEASURE_URL=http://127.0.0.1:4173/` if needed. Measurements use software WebGL and are not device benchmarks.

## Stack and structure

React 19, TypeScript strict mode, Vite 6, Tailwind CSS 4, Motion, Lucide, Three.js 0.180, React Three Fiber 9, Drei 10. Vitest 4, React Testing Library, Playwright, axe-core, ESLint, Prettier. Exact resolutions are in the lockfile. Router omitted intentionally: the application has one URL and local view state; the HTML-only edition is a real static file.

```text
.github/workflows/     CI + gated Pages deployment
public/assets/         Self-hosted WOFF2 fonts + SIL OFL licenses
src/app/               Readable portfolio + static HTML renderer
src/components/        Navigation, dialogs, reusable links
src/cosmic/            Procedural geometry, shaders, camera, projected labels
src/data/              Editable content and theme configuration
src/features/          Intro, projects, settings
src/hooks/             Dialog focus and persistent preferences
src/lib/               URL/content validation, reducer, quality policy
src/styles/            Responsive design system
src/types/             Typed content schema
scripts/               Prerendering, asset verification, measurements
tests/                 Unit/component + end-to-end coverage
docs/                  Architecture, accessibility, performance, deployment
artifacts/             Selected screenshots and recorded measurements
```

## GitHub Pages

The workspace began empty and had no remote/repository settings to inspect. No repository name is assumed. The deployment workflow derives the base path from `GITHUB_REPOSITORY`, recognizing both `owner.github.io` and project repositories.

1. Create a repository and push this project at its root to `main` (or update both workflow branch filters).
2. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Ensure Actions are allowed. Run **Deploy to GitHub Pages** or push to `main`.
4. The workflow runs install, formatting, lint, type checking, unit tests, browser tests, build and asset verification. Only a successful build job can deploy.
5. Read the actual deployed URL from the completed workflow. **No public deployment has been performed here.**

See [deployment instructions](docs/DEPLOYMENT.md) for custom domains and manual builds. Canonical URLs and sitemaps are generated only when `VITE_SITE_URL` is configured; the Pages workflow derives it from the actual repository, with an override for custom domains.

## Verification and limits

See [the implementation report](docs/IMPLEMENTATION_REPORT.md) and [testing notes](docs/TESTING.md). Desktop and 320px touch flows were tested in headless Chromium using SwiftShader. Native mobile GPUs, Safari/Firefox and assistive technologies still need hands-on testing. The lazy 3D bundle triggers Vite’s >500 kB minified warning; it is about 252 kB gzip. This is documented, not hidden by raising the limit. No claim of guaranteed 30 FPS, universal GPU compatibility, or full WCAG certification is made.

## Licenses

Source: MIT. Planets, nebula and project illustrations are procedural original code; no stock imagery or third-party models. Manrope and Space Grotesk are self-hosted under the SIL Open Font License; license files and attribution are in `public/assets/` and [asset notes](docs/ASSETS.md).
