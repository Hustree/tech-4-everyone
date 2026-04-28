# Architecture

## Overview

`tech-4-everyone` is a single-page Angular 20 application with no backend. All content is bundled at build time. Routes are lazy-loaded standalone components.

## Layers

```
+----------------------------+
|   features/                |  Page components (home, articles, top-tens, about, not-found)
+--------------|-------------+
               | reads
+--------------v-------------+
|   core/ContentService      |  Signals-based store
+--------------|-------------+
               | imports
+--------------v-------------+
|   content/                 |  Typed data + Markdown registry
|   ├── types.ts             |
|   ├── top-tens.ts          |
|   ├── articles.ts          |
|   └── articles/*.md        |
+----------------------------+
```

## Content flow

1. Build time: each `.md` under `content/articles/` is imported as a raw string via Angular's `?raw` import.
2. `articles.ts` parses YAML frontmatter, validates required fields, returns `Article[]` sorted newest-first.
3. `top-tens.ts` exports a `TopTen[]` literal — pure TS, no parsing.
4. `ContentService` exposes both as signals plus `getArticleBySlug` / `getTopTenBySlug` / `articlesByTag` computed-signal helpers.
5. Feature components read from the service and never hold their own copies of content.
6. Article body strings are rendered by `<app-markdown>`, which runs `marked` then `DOMPurify` and binds the result via `[innerHTML]`.

## Routing

All routes are lazy-loaded via `loadComponent`. See `src/app/app.routes.ts`. Per-route `title` is set declaratively.

## Design tokens

All colors, spacing, radii, fonts, and shadows are CSS custom properties defined in `src/styles/_tokens.scss`. Component SCSS references them via `var(--*)`. Light/dark via `prefers-color-scheme`.

## State

There is no global state beyond `ContentService`. The site is read-only.
