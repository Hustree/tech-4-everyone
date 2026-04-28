# Design — `tech-4-everyone` modernization

**Date:** 2026-04-28
**Status:** Approved
**Owner:** Joshua Bascos (`Hustree`)
**Repo:** [github.com/Hustree/tech-4-everyone](https://github.com/Hustree/tech-4-everyone)

---

## What this is

A small, opinionated Angular SPA — a personal "Tech 4 Everyone" content blog (top-ten lists + articles) — modernized to Angular 20 and packaged as a public-repo-presentable portfolio piece.

Sibling in spirit to [`pdf-esign-starter`](https://github.com/Hustree/pdf-esign-starter) and [`e2e-payload-encryption-starter`](https://github.com/Hustree/e2e-payload-encryption-starter): "small, opinionated, exemplary, designed to be read and extended by humans **and** AI agents." Scaled to single-stack Angular.

## Goals

1. Angular 15 (EOL) → Angular 20 (current). Standalone components, signals, new control flow, `application` builder.
2. Same public-repo presentation layer as the two reference starters: README structure, CLAUDE.md, CONTRIBUTING.md, SECURITY.md, LICENSE (MIT), CI workflows, Dependabot, CodeQL.
3. Formalize "content-as-code": typed TS for top-ten lists (structured), Markdown for articles (prose).
4. A11y-first: semantic HTML, design tokens, focus-visible rings, reduced-motion, Lighthouse a11y ≥ 95 in CI.
5. Live demo on GitHub Pages, deployed by Actions on push to `main`.

## Non-goals

- SSR / prerendering (six navigable routes don't justify it; revisit if SEO becomes a goal).
- Headless CMS, comments, search, analytics.
- Long-form new content (polish existing top-ten + articles; add a brief About page).
- Repo rename (slug stays `tech-4-everyone`; "Tech 4 Everyone" is the public brand).
- E2E test framework (overkill for static content; unit tests cover the logic that matters).
- `scripts/dev.sh` (single-stack — `npm start` suffices).

## Stack

| Layer | Tech |
|---|---|
| Frontend | Angular 20, TypeScript 5.5+, RxJS 7, signals, standalone components, new control flow (`@if`/`@for`), `application` builder |
| Styling | Plain SCSS + CSS custom-property design tokens (no Tailwind, no Material) |
| Content | Markdown (`marked` + `DOMPurify`) for articles; typed TS for top-ten lists |
| Tests | Karma + Jasmine (unit only) |
| CI | GitHub Actions: build/lint/test, CodeQL (TS), Dependabot (npm + Actions), Lighthouse CI a11y |
| Hosting | GitHub Pages, deployed by Actions on push to `main` |
| License | MIT |

## Target tree

```
tech-4-everyone/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml           # lint + test + build + Lighthouse a11y
│   │   ├── codeql.yml       # CodeQL TypeScript scan
│   │   └── deploy.yml       # GitHub Pages deploy on push to main
│   ├── dependabot.yml       # npm + GitHub Actions, weekly
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── architecture.md      # routing, content model, design tokens
│   ├── content-authoring.md # how to add an article / top-ten
│   ├── accessibility.md     # a11y commitments + how they're enforced
│   ├── superpowers/
│   │   └── specs/           # design specs (this file lives here)
│   └── assets/
│       └── screenshot.png   # README header image
├── src/
│   ├── app/
│   │   ├── core/            # ContentService (signals), models
│   │   ├── shared/          # <app-markdown>, layout primitives
│   │   ├── content/
│   │   │   ├── articles/*.md     # prose with frontmatter
│   │   │   ├── top-tens.ts       # structured data
│   │   │   ├── articles.ts       # imports the .md files via ?raw
│   │   │   └── types.ts
│   │   └── features/
│   │       ├── home/
│   │       ├── about/
│   │       ├── articles/
│   │       │   ├── articles-list.component.ts
│   │       │   └── article-detail.component.ts
│   │       └── top-tens/
│   │           ├── top-tens-list.component.ts
│   │           └── top-ten-detail.component.ts
│   ├── styles/
│   │   ├── _tokens.scss     # CSS custom properties (light + dark)
│   │   ├── _reset.scss
│   │   └── _a11y.scss       # focus-visible, sr-only, reduced-motion
│   ├── styles.scss
│   ├── index.html
│   ├── main.ts
│   ├── favicon.ico
│   └── assets/
├── CLAUDE.md
├── CONTRIBUTING.md
├── LICENSE                  # MIT
├── README.md
├── SECURITY.md
├── .editorconfig
├── .gitattributes
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```

## Modernization plan (Angular 15 → 20)

Angular only supports `+1` major-version `ng update` jumps, so we step through:

1. `ng update @angular/core@16 @angular/cli@16` — apply schematics + lockfile bump.
2. `ng update @angular/core@17 @angular/cli@17`.
3. `ng update @angular/core@18 @angular/cli@18`.
4. `ng update @angular/core@19 @angular/cli@19`.
5. `ng update @angular/core@20 @angular/cli@20`.
6. `ng generate @angular/core:standalone` — convert `NgModule` app → standalone bootstrap. Three passes: components, routes, then the final NgModule removal.
7. `ng generate @angular/core:control-flow` — `*ngIf`/`*ngFor`/`*ngSwitch` → `@if`/`@for`/`@switch`.
8. Switch `angular.json` builder to `@angular/build:application` (the new application builder).
9. Manual: bump TypeScript, RxJS, zone.js to versions Angular 20 requires.
10. Manual: convert empty `BlogService` → `ContentService` exposing signals.
11. Manual: replace inline content in templates with `ContentService` reads via signals (`@if` / `@for`).
12. Verify `npm install`, `npm run build`, `npm test` all pass cleanly, no peer-dep warnings, no deprecation warnings.

## Content model

```ts
// src/app/content/types.ts
export interface TopTen {
  slug: string;
  title: string;
  intro: string;
  items: { rank: number; name: string; blurb: string; url?: string }[];
  publishedAt: string; // ISO 8601
  tags: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;        // Markdown source, imported via ?raw
  publishedAt: string; // ISO 8601
  tags: string[];
  cover?: string;      // path under src/assets
}
```

`ContentService` exposes:

```ts
articles = signal<Article[]>([...]);
topTens = signal<TopTen[]>([...]);

getArticleBySlug(slug: string): Signal<Article | undefined>;
getTopTenBySlug(slug: string): Signal<TopTen | undefined>;
articlesByTag(tag: string): Signal<Article[]>;
```

Articles are authored as Markdown files under `src/app/content/articles/<slug>.md` with YAML frontmatter (title, excerpt, publishedAt, tags, cover). `articles.ts` imports each via Angular's raw-text import (`import body from './articles/<slug>.md?raw'`), parses frontmatter, and exports the typed `Article[]`.

Top-ten lists are pure TS in `top-tens.ts` — no Markdown indirection because they're structured data.

## Routing

Lazy-loaded standalone routes:

| Path | Component | Purpose |
|---|---|---|
| `/` | `HomeComponent` | Latest articles + top-ten preview |
| `/articles` | `ArticlesListComponent` | List of all articles |
| `/articles/:slug` | `ArticleDetailComponent` | Renders Markdown via `<app-markdown>` |
| `/top-tens` | `TopTensListComponent` | List of all top-ten lists |
| `/top-tens/:slug` | `TopTenDetailComponent` | Structured renderer (rank, name, blurb, link) |
| `/about` | `AboutComponent` | About page (Markdown) |
| `**` | `NotFoundComponent` | 404 |

All routes use `loadComponent`. Title strategy: per-route `title` resolved from content metadata via `TitleStrategy`.

## Styling & accessibility

### Design tokens (`src/styles/_tokens.scss`)

CSS custom properties drive the entire visual system. Light + dark schemes via `prefers-color-scheme`.

```scss
:root {
  --color-bg:        #fafafa;
  --color-surface:   #ffffff;
  --color-fg:        #1a1a1a;
  --color-muted:     #555555;
  --color-accent:    #2d6cdf;
  --color-accent-fg: #ffffff;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;

  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-serif: "Georgia", "Iowan Old Style", serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:      #0f1115;
    --color-surface: #181b22;
    --color-fg:      #ececec;
    --color-muted:   #9aa0a6;
    --color-accent:  #6ea1ff;
  }
}
```

### A11y commitments (enforced + documented)

- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`. No div-soup.
- **Skip link** to `<main id="main">` as first focusable element.
- **`:focus-visible`** rings on every interactive element; never `outline: none` without a replacement.
- **Color contrast** ≥ 4.5:1 for body text and ≥ 3:1 for large text — verified for every token pair.
- **`prefers-reduced-motion`** honored: animations and scroll-behavior gated.
- **Heading hierarchy**: one `<h1>` per route; no skipped levels.
- **Image alt text**: required for every `<img>`; decorative images get `alt=""`.
- **Lighthouse CI**: a11y score ≥ 95 enforced in `ci.yml`.

`docs/accessibility.md` documents each commitment with the file/CSS that enforces it.

## Public-repo presentation layer

Match the shape of the two reference starters wherever it applies; scale down where dual-stack content doesn't.

### `README.md`

Sections, in order:

1. **Title + tagline** — `> A small, opinionated Angular 20 SPA — designed to be read and extended by humans and AI agents.`
2. **Badges** — CI, CodeQL, License, Lighthouse a11y.
3. **Header image** — `docs/assets/screenshot.png`.
4. **What this is** — 1–2 paragraphs on the project's purpose and scope.
5. **Stack** — table.
6. **Quick start** — `npm install && npm start`, then `http://localhost:4200`.
7. **Features** — bulleted (content-as-code, signals, design tokens, a11y, GitHub Pages deploy).
8. **Repo layout** — abbreviated tree.
9. **Documentation** — links to `docs/architecture.md`, `docs/content-authoring.md`, `docs/accessibility.md`.
10. **For AI agents** — pointer to `CLAUDE.md`.
11. **Contributing** — pointer to `CONTRIBUTING.md`.
12. **Security** — pointer to `SECURITY.md`.
13. **License** — MIT.

### `CLAUDE.md`

Agent orientation. Covers:
- Repo purpose and constraints.
- How to add an article: create `src/app/content/articles/<slug>.md` with frontmatter, register it in `articles.ts`.
- How to add a top-ten: append to `top-tens.ts` typed array.
- Where the design tokens live and how to extend them.
- A11y rules that must hold.
- CI gates that must pass before merge (lint, test, build, Lighthouse a11y ≥ 95).
- Conventional Commits.

### `CONTRIBUTING.md`

- Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
- PR checklist: lint passes, tests pass, build passes, Lighthouse a11y ≥ 95, no `any` introduced, no inline content in templates.
- Branch naming: `feat/<short-slug>`, `fix/<short-slug>`.

### `SECURITY.md`

- Reporting: email + private GitHub vulnerability advisory.
- Supported versions: latest `main` only (this is a personal portfolio; not production software).
- Known limitations.

### `LICENSE`

Standard MIT, copyright Joshua Bascos.

### `.editorconfig`, `.gitattributes`

Match the reference repos exactly (UTF-8, LF, trim trailing whitespace, final newline, `* text=auto eol=lf`).

## CI / deploy

### `.github/workflows/ci.yml`

- Triggers: `push` to `main`, `pull_request`.
- Node 20 LTS, npm cache.
- Steps: `npm ci` → `npm run lint` → `npm test -- --watch=false --browsers=ChromeHeadless` → `npm run build` → Lighthouse CI a11y check (assert ≥ 95).

### `.github/workflows/codeql.yml`

- Triggers: `push` to `main`, `pull_request`, weekly schedule.
- Languages: TypeScript.
- Default queries: `security-extended`.

### `.github/workflows/deploy.yml`

- Triggers: `push` to `main` (after CI passes).
- Build with `--base-href=/tech-4-everyone/`.
- Deploy `dist/tech-4-everyone/browser/` to GitHub Pages via `actions/deploy-pages@v4`.
- Set repo `homepage` to `https://hustree.github.io/tech-4-everyone/`.

### `.github/dependabot.yml`

- npm: weekly, grouped by Angular packages, dev/prod separated.
- GitHub Actions: weekly.

### Issue / PR templates

- `bug_report.md`, `feature_request.md` under `.github/ISSUE_TEMPLATE/`.
- `PULL_REQUEST_TEMPLATE.md` with the contributing checklist.

## Component boundaries (isolation check)

Each unit has one purpose, talks through a typed interface, and can be understood without reading its internals:

- **`ContentService`** — single source of truth for content. Inputs: nothing (content is statically imported). Outputs: signals + computed lookup helpers. Consumers don't know whether content came from TS or Markdown.
- **`MarkdownComponent`** — input: `body: string`. Output: rendered, sanitized HTML. Consumers don't know about `marked` or `DOMPurify`.
- **Feature components** (`articles/*`, `top-tens/*`, `home`, `about`) — read from `ContentService`, render with control-flow blocks. Don't fetch, don't sanitize, don't store.
- **Design-token layer** — components consume `var(--color-*)` etc., never literal hex. Theme changes happen in `_tokens.scss` only.

## Open questions

None — all decisions in this design are locked. Implementation plan is the next step.

## Implementation order (rough)

1. Fresh branch from `main`.
2. Angular 15 → 20 step ladder + builder switch + standalone + control-flow codemods. Verify build/test green at each step.
3. `ContentService` + typed content model + Markdown plumbing. Verify routes still render.
4. Design tokens + a11y primitives. Visual pass on every route.
5. Public-repo files (README, CLAUDE.md, CONTRIBUTING.md, SECURITY.md, LICENSE, `.editorconfig`, `.gitattributes`).
6. CI workflows + Dependabot + CodeQL + Lighthouse CI.
7. GitHub Pages deploy workflow + set repo `homepage`.
8. Screenshot + final README polish.
9. Squash-merge to `main`. First Pages deploy goes live.

The detailed task breakdown for each step lives in the implementation plan (next document, produced by the writing-plans skill).
