# CLAUDE.md — Agent orientation

This file orients AI coding agents working on `tech-4-everyone`. Read it before making changes.

## Project shape

- **What it is:** a small Angular 20 SPA portfolio piece — top-ten lists + Markdown articles. No backend.
- **What it isn't:** a CMS, a SaaS app, a SSR site. Don't add those without an explicit ask.
- **Branding:** the public name is "Tech 4 Everyone." The GitHub slug is `tech-4-everyone`. Keep both consistent.

## Architecture invariants (do not violate without an ADR)

1. **Standalone everywhere.** No `NgModule`s.
2. **Signals over RxJS** for component state. RxJS only where it's already in use (e.g. router params).
3. **Content-as-code.**
   - Top-ten lists live in `src/app/content/top-tens.ts` as a typed `TopTen[]`.
   - Articles live in `src/app/content/articles/<slug>.md` with YAML frontmatter and are registered in `src/app/content/articles.ts`.
   - Components NEVER hardcode content in templates. They read from `ContentService`.
4. **Design tokens.** No literal hex/rgb in component SCSS — only `var(--color-*)` etc. from `src/styles/_tokens.scss`.
5. **A11y is a build gate.** Lighthouse a11y ≥ 95 in CI. Don't merge regressions.

## How to add an article

1. Create `src/app/content/articles/<slug>.md`:
   ```markdown
   ---
   title: My new article
   slug: my-new-article
   excerpt: One-sentence summary.
   publishedAt: 2026-04-28
   tags: [tag-a, tag-b]
   ---

   # My new article

   Body in Markdown.
   ```
2. Open `src/app/content/articles.ts` and add:
   ```ts
   import body from './articles/my-new-article.md?raw';
   // ... in ARTICLES array:
   parse(body),
   ```
3. Run `npm run build` — sort order is automatic.

## How to add a top-ten list

Append to `src/app/content/top-tens.ts`:
```ts
{
  slug: 'my-list',
  title: '...',
  intro: '...',
  items: [{ rank: 1, name: '...', blurb: '...', url: '...' }, /* ... */],
  publishedAt: '2026-04-28',
  tags: ['...'],
},
```

## Where things live

| Concern | Location |
|---|---|
| Content data | `src/app/content/` |
| Content service | `src/app/core/content.service.ts` |
| Markdown renderer | `src/app/shared/markdown/` |
| Routes | `src/app/app.routes.ts` |
| Layout shell | `src/app/app.component.{ts,html,scss}` |
| Design tokens | `src/styles/_tokens.scss` |
| A11y primitives | `src/styles/_a11y.scss` |
| CI | `.github/workflows/` |

## CI gates that must pass

- `npm run lint` — clean.
- `npm test -- --watch=false --browsers=ChromeHeadless` — all green.
- `npm run build` — succeeds.
- Lighthouse a11y ≥ 95 (run on the built artifact).

## Commit conventions

Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`. One logical change per commit.

## When in doubt

Match what's already there. The codebase is small enough to read end-to-end in one sitting — do that first.
