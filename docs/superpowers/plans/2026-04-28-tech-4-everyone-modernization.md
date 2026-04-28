# tech-4-everyone Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize `Hustree/tech-4-everyone` from Angular 15 to Angular 20 with content-as-code architecture and ship as a top-tier public-repo portfolio piece (sibling to `pdf-esign-starter` and `e2e-payload-encryption-starter`).

**Architecture:** Step-ladder Angular major-version updates (15 → 16 → 17 → 18 → 19 → 20) → migrate to standalone components, signals, and new control flow → refactor inline content into a typed `ContentService` backed by Markdown files (articles) + typed TS (top-ten lists) → wrap with CSS-custom-property design tokens, semantic HTML and a11y primitives, public-repo presentation files (README/CLAUDE/CONTRIBUTING/SECURITY/MIT), CI (lint/test/build/CodeQL/Dependabot/Lighthouse a11y), and GitHub Pages deploy.

**Tech Stack:** Angular 20, TypeScript 5.5+, signals, standalone components, SCSS + CSS custom properties, Karma/Jasmine, `marked` + `DOMPurify`, GitHub Actions, Lighthouse CI, GitHub Pages.

**Spec:** [`docs/superpowers/specs/2026-04-28-tech-4-everyone-modernization-design.md`](../specs/2026-04-28-tech-4-everyone-modernization-design.md)

---

## Working assumptions

- Repo path: `/Users/joshuabascos/Documents/SoftDev/others/PersonalProjs/tech-for-all`
- GitHub: `Hustree/tech-4-everyone` (slug stays — never renamed; "Tech 4 Everyone" is the public brand)
- Branch from `main`: `feat/modernize-angular-20`
- Node 20 LTS available locally and in CI
- Commits use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`)
- The user authorizes pushes/merges explicitly — do not push without confirmation

## File map

**New files:**
- `src/app/content/types.ts` — `TopTen`, `Article` interfaces
- `src/app/content/top-tens.ts` — typed top-ten data
- `src/app/content/articles.ts` — article registry (frontmatter + body imports)
- `src/app/content/articles/<slug>.md` — one Markdown file per article
- `src/app/core/content.service.ts` — signals-based content store
- `src/app/core/content.service.spec.ts` — unit tests
- `src/app/shared/markdown/markdown.component.ts` — sanitized Markdown renderer
- `src/app/shared/markdown/markdown.component.spec.ts` — unit tests
- `src/app/features/{home,about,articles,top-tens}/*` — feature components (refactored / created)
- `src/types/markdown.d.ts` — `?raw` import typing
- `src/styles/_tokens.scss`, `_reset.scss`, `_a11y.scss`
- `LICENSE`, `README.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`
- `.editorconfig`, `.gitattributes`
- `.github/workflows/ci.yml`, `codeql.yml`, `deploy.yml`
- `.github/dependabot.yml`
- `.github/ISSUE_TEMPLATE/{bug_report.md,feature_request.md}`, `.github/PULL_REQUEST_TEMPLATE.md`
- `lighthouserc.json`
- `docs/architecture.md`, `docs/content-authoring.md`, `docs/accessibility.md`
- `docs/assets/screenshot.png`

**Modified files:**
- `package.json`, `package-lock.json` — Angular 20 deps + Markdown deps
- `angular.json` — `application` builder, `base-href` config
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json` — modern TS targets
- `src/main.ts` — standalone bootstrap
- `src/index.html` — accessibility attrs (`lang`, color-scheme meta)
- `src/styles.scss` — partial imports
- `src/app/app.component.{ts,html,scss}` — semantic shell, skip link
- `src/app/app.config.ts` (new — replaces `app.module.ts`) — providers, routing
- `src/app/app.routes.ts` (new — replaces `app-routing.module.ts`) — lazy routes
- Removed: `src/app/app.module.ts`, `src/app/app-routing.module.ts`, `src/app/blog.service.{ts,spec.ts}`, the existing inline `blog/`, `blog-post/`, `article/`, `top-ten-list/` components (replaced by the `features/` versions)

---

## Phase 0 — Branch + baseline

### Task 0.1: Create feature branch and capture baseline

**Files:**
- None (git only)

- [ ] **Step 1: Confirm clean working tree**

```bash
git status -sb
```

Expected: `## main...origin/main` with no modified/untracked files.

- [ ] **Step 2: Pull latest main**

```bash
git fetch origin && git checkout main && git pull --ff-only
```

Expected: "Already up to date." or fast-forward.

- [ ] **Step 3: Create feature branch**

```bash
git checkout -b feat/modernize-angular-20
```

Expected: `Switched to a new branch 'feat/modernize-angular-20'`.

- [ ] **Step 4: Confirm baseline build is broken (Angular 15 + modern Node)**

Run `npm install` and `npm run build`. Document any errors in commit message of next phase. This baseline confirms why the upgrade is mandatory; we don't try to fix Angular 15 — we step-ladder forward.

```bash
node --version    # expect v20.x
npm install 2>&1 | tail -20
```

If `npm install` fails outright on peer-dep conflicts, use `npm install --legacy-peer-deps` once to get a working `node_modules` so `ng update` can run.

---

## Phase 1 — Angular version ladder (15 → 20)

Angular only supports `+1` major-version `ng update` jumps. Each step: run the update, fix anything the codemod warns about, verify build + test, commit.

### Task 1.1: ng update to Angular 16

**Files:**
- Modify: `package.json`, `package-lock.json`, possibly `tsconfig*.json`, `angular.json`

- [ ] **Step 1: Run codemod**

```bash
npx -p @angular/cli@16 ng update @angular/core@16 @angular/cli@16 --allow-dirty
```

- [ ] **Step 2: Resolve any reported breaking changes**

Common in 15→16: `RouterEvents` import paths, `provideRouter` mention. Read the codemod's stdout — if it lists migrations to run, run them with `npx ng update --migrate-only --from=15 --to=16`.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build succeeds. Fix any compile errors before continuing — do not skip.

- [ ] **Step 4: Verify tests**

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "build: bump Angular to 16"
```

### Task 1.2: ng update to Angular 17

**Files:** as above.

- [ ] **Step 1: Run codemod**

```bash
npx -p @angular/cli@17 ng update @angular/core@17 @angular/cli@17 --allow-dirty
```

- [ ] **Step 2: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "build: bump Angular to 17"
```

### Task 1.3: ng update to Angular 18

- [ ] **Step 1: Run codemod**

```bash
npx -p @angular/cli@18 ng update @angular/core@18 @angular/cli@18 --allow-dirty
```

- [ ] **Step 2: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "build: bump Angular to 18"
```

### Task 1.4: ng update to Angular 19

- [ ] **Step 1: Run codemod**

```bash
npx -p @angular/cli@19 ng update @angular/core@19 @angular/cli@19 --allow-dirty
```

- [ ] **Step 2: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "build: bump Angular to 19"
```

### Task 1.5: ng update to Angular 20

- [ ] **Step 1: Run codemod**

```bash
npx -p @angular/cli@20 ng update @angular/core@20 @angular/cli@20 --allow-dirty
```

- [ ] **Step 2: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "build: bump Angular to 20"
```

### Task 1.6: Bump TypeScript / RxJS / zone.js to Angular-20-required versions

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Check Angular 20 peer requirements**

```bash
npm view @angular/core@20 peerDependencies
```

Note required versions of `typescript`, `rxjs`, `zone.js`.

- [ ] **Step 2: Update versions**

Edit `package.json` `devDependencies`/`dependencies` to match. Then:

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] **Step 3: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: align TypeScript/RxJS/zone.js with Angular 20 peers"
```

---

## Phase 2 — Architecture codemods (NgModule → standalone, control flow, application builder)

### Task 2.1: Convert components to standalone (pass 1)

**Files:**
- Modify: every `*.component.ts` in `src/app/`

- [ ] **Step 1: Run schematic — components**

```bash
ng generate @angular/core:standalone
```

When prompted, choose option **1** (Convert all components, directives and pipes to standalone).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(arch): convert components/directives/pipes to standalone"
```

### Task 2.2: Convert routes to standalone (pass 2)

- [ ] **Step 1: Run schematic — routes**

```bash
ng generate @angular/core:standalone
```

Choose option **2** (Remove unnecessary NgModule classes).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(arch): remove unnecessary NgModule classes"
```

### Task 2.3: Switch bootstrap to standalone (pass 3)

- [ ] **Step 1: Run schematic — bootstrap**

```bash
ng generate @angular/core:standalone
```

Choose option **3** (Bootstrap the application using standalone APIs).

This generates `src/app/app.config.ts` and updates `src/main.ts` to call `bootstrapApplication(AppComponent, appConfig)`. `app.module.ts` is removed.

- [ ] **Step 2: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(arch): bootstrap with standalone APIs"
```

### Task 2.4: Migrate templates to new control flow

**Files:**
- Modify: every `*.component.html` using `*ngIf`/`*ngFor`/`*ngSwitch`

- [ ] **Step 1: Run schematic**

```bash
ng generate @angular/core:control-flow
```

This rewrites `*ngIf` → `@if`, `*ngFor` → `@for`, `*ngSwitch` → `@switch` across the project.

- [ ] **Step 2: Verify build + tests**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(templates): migrate to new control flow (@if/@for/@switch)"
```

### Task 2.5: Switch to the `application` builder

**Files:**
- Modify: `angular.json`

- [ ] **Step 1: Inspect current builder**

Open `angular.json`, find `projects.tech-for-all.architect.build.builder`. If it's already `@angular/build:application` after the v17+ updates, skip this task. Otherwise:

- [ ] **Step 2: Run migration**

```bash
ng update @angular/build --migrate-only --from=browser --to=application
```

If that doesn't exist for your version, do it manually: change `builder` to `@angular/build:application`, rename `main` to `browser`, ensure `outputPath.base` points at `dist/tech-for-all`.

- [ ] **Step 3: Verify build serves correctly**

```bash
npm run build && ls dist/tech-for-all/browser/
```

Expected: `index.html`, hashed `main-*.js`, hashed `polyfills-*.js`, `assets/`.

- [ ] **Step 4: Commit**

```bash
git add angular.json
git commit -m "build: switch to @angular/build:application builder"
```

### Task 2.6: Sanity check — full green dev loop

- [ ] **Step 1: Lint clean**

```bash
ng lint
```

If `ng lint` isn't configured, install it now:

```bash
ng add @angular-eslint/schematics
```

Commit any added eslint config.

- [ ] **Step 2: Test green**

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 3: Build green**

```bash
npm run build
```

- [ ] **Step 4: Dev server starts**

```bash
npm start &
sleep 5
curl -fsS http://localhost:4200/ | head -5
kill %1
```

Expected: HTML response with `<app-root>`.

- [ ] **Step 5: Commit eslint config (if added)**

```bash
git add -A
git commit -m "build: add @angular-eslint with default config"
```

---

## Phase 3 — Content model

### Task 3.1: Define content types

**Files:**
- Create: `src/app/content/types.ts`

- [ ] **Step 1: Write the types**

```ts
// src/app/content/types.ts

export interface TopTenItem {
  rank: number;
  name: string;
  blurb: string;
  url?: string;
}

export interface TopTen {
  slug: string;
  title: string;
  intro: string;
  items: TopTenItem[];
  publishedAt: string; // ISO 8601
  tags: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;        // Markdown source
  publishedAt: string; // ISO 8601
  tags: string[];
  cover?: string;
}
```

- [ ] **Step 2: Verify TS compiles**

```bash
npx tsc --noEmit -p tsconfig.app.json
```

- [ ] **Step 3: Commit**

```bash
git add src/app/content/types.ts
git commit -m "feat(content): add TopTen and Article types"
```

### Task 3.2: Migrate top-ten data to typed TS

**Files:**
- Create: `src/app/content/top-tens.ts`
- Read first: `src/app/top-ten-list/top-ten-list.component.{ts,html}` — the existing inline data lives here.

- [ ] **Step 1: Read the existing component to extract data**

```bash
cat src/app/top-ten-list/top-ten-list.component.ts src/app/top-ten-list/top-ten-list.component.html
```

Pull every list (e.g. "Top 10 e-wallets") and its items.

- [ ] **Step 2: Write the typed data**

```ts
// src/app/content/top-tens.ts
import type { TopTen } from './types';

export const TOP_TENS: TopTen[] = [
  {
    slug: 'top-10-e-wallets',
    title: 'Top 10 E-Wallets in the Philippines',
    intro: 'A snapshot of the most-used digital wallets in 2023 — what they do well and where they fall short.',
    items: [
      // { rank: 1, name: 'GCash', blurb: '...', url: 'https://gcash.com' },
      // ... copy items from existing template
    ],
    publishedAt: '2023-04-01',
    tags: ['fintech', 'philippines'],
  },
  // ... additional top-ten lists from existing components
];
```

> **Note for executor:** Keep the actual content faithful to what's in the existing components. The skeleton above shows shape; fill blurbs/URLs from the source files.

- [ ] **Step 3: Verify TS compiles**

```bash
npx tsc --noEmit -p tsconfig.app.json
```

- [ ] **Step 4: Commit**

```bash
git add src/app/content/top-tens.ts
git commit -m "feat(content): migrate top-ten lists to typed TS data"
```

### Task 3.3: Install Markdown dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install runtime deps**

```bash
npm install marked dompurify
npm install -D @types/dompurify
```

- [ ] **Step 2: Verify install**

```bash
npm ls marked dompurify
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build(deps): add marked + dompurify for Markdown rendering"
```

### Task 3.4: Add typings for `?raw` Markdown imports

**Files:**
- Create: `src/types/markdown.d.ts`
- Modify: `tsconfig.app.json` (`include` array)

- [ ] **Step 1: Write the typings**

```ts
// src/types/markdown.d.ts
declare module '*.md?raw' {
  const content: string;
  export default content;
}
```

- [ ] **Step 2: Include in tsconfig**

In `tsconfig.app.json`, ensure `"include"` covers `src/types/**/*.d.ts`:

```json
{
  "include": ["src/**/*.d.ts", "src/**/*.ts"]
}
```

- [ ] **Step 3: Configure Angular `application` builder to allow `.md?raw` imports**

Angular's builder uses esbuild, which supports `?raw` natively in v20+. No further config needed. If you hit "loader not found" errors in build, add to `angular.json` `architect.build.options`:

```json
"loader": { ".md": "text" }
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/types/markdown.d.ts tsconfig.app.json angular.json
git commit -m "build: support importing Markdown files as raw text"
```

### Task 3.5: Build the MarkdownComponent (TDD)

**Files:**
- Create: `src/app/shared/markdown/markdown.component.ts`
- Create: `src/app/shared/markdown/markdown.component.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/app/shared/markdown/markdown.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MarkdownComponent] }).compileComponents();
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
  });

  it('renders Markdown to sanitized HTML', () => {
    fixture.componentRef.setInput('body', '# Hello\n\nWorld');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('h1')?.textContent).toBe('Hello');
    expect(root.querySelector('p')?.textContent).toBe('World');
  });

  it('strips <script> tags', () => {
    fixture.componentRef.setInput('body', '<script>alert(1)</script>OK');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.innerHTML).not.toContain('<script>');
    expect(root.textContent).toContain('OK');
  });

  it('keeps safe links', () => {
    fixture.componentRef.setInput('body', '[link](https://example.com)');
    fixture.detectChanges();
    const a = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(a?.getAttribute('href')).toBe('https://example.com');
  });
});
```

- [ ] **Step 2: Run test — should fail (component not yet defined)**

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include='**/markdown.component.spec.ts'
```

Expected: FAIL with "Cannot find module './markdown.component'".

- [ ] **Step 3: Implement the component**

```ts
// src/app/shared/markdown/markdown.component.ts
import { Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown',
  standalone: true,
  template: `<div class="prose" [innerHTML]="rendered()"></div>`,
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent {
  readonly body = input.required<string>();

  private readonly sanitizer = inject(DomSanitizer);

  readonly rendered = computed<SafeHtml>(() => {
    const raw = marked.parse(this.body(), { async: false }) as string;
    const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
    return this.sanitizer.bypassSecurityTrustHtml(clean);
  });
}
```

Add the `inject` import:

```ts
import { Component, computed, inject, input } from '@angular/core';
```

Create empty SCSS:

```bash
touch src/app/shared/markdown/markdown.component.scss
```

- [ ] **Step 4: Run test — should pass**

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include='**/markdown.component.spec.ts'
```

Expected: 3 specs pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/markdown/
git commit -m "feat(shared): add MarkdownComponent with sanitized rendering"
```

### Task 3.6: Migrate articles to Markdown files

**Files:**
- Create: `src/app/content/articles/<slug>.md` (one per existing article)
- Read first: `src/app/article/article.component.{ts,html}`, `src/app/blog-post/blog-post.component.{ts,html}`, `src/app/blog/blog.component.{ts,html}`

- [ ] **Step 1: Read existing article content**

```bash
ls src/app/article src/app/blog-post src/app/blog
cat src/app/article/article.component.html
cat src/app/blog-post/blog-post.component.html
```

- [ ] **Step 2: For each existing article, create a Markdown file with frontmatter**

Example — assume the existing article is titled "Why I switched to Linux":

```markdown
---
title: Why I switched to Linux
slug: why-i-switched-to-linux
excerpt: A short reflection on leaving macOS behind.
publishedAt: 2023-03-20
tags: [linux, productivity]
cover: /assets/article-1.png
---

# Why I switched to Linux

Body content extracted verbatim from the existing component template,
converted from HTML to Markdown. Keep paragraph breaks, lists, and links
intact.
```

Use [pandoc](https://pandoc.org/) if you have it: `pandoc -f html -t gfm src/app/article/article.component.html -o src/app/content/articles/why-i-switched.md`. Then add the frontmatter on top.

- [ ] **Step 3: Verify each `.md` exists and parses**

```bash
ls src/app/content/articles/
head -10 src/app/content/articles/*.md
```

- [ ] **Step 4: Commit**

```bash
git add src/app/content/articles/
git commit -m "feat(content): migrate articles to Markdown with frontmatter"
```

### Task 3.7: Build the article registry

**Files:**
- Create: `src/app/content/articles.ts`

- [ ] **Step 1: Write the registry**

```ts
// src/app/content/articles.ts
import type { Article } from './types';

import linuxBody from './articles/why-i-switched-to-linux.md?raw';
// import additional articles here, one per file

interface FrontmatterFields {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  cover?: string;
}

function parse(raw: string): Article {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Article missing frontmatter');
  }
  const [, fmBlock, body] = match;
  const fm: Partial<FrontmatterFields> = {};
  for (const line of fmBlock.split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    if (key === 'tags') {
      fm.tags = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      (fm as Record<string, unknown>)[key] = value.trim();
    }
  }
  const required: (keyof FrontmatterFields)[] = ['title', 'slug', 'excerpt', 'publishedAt', 'tags'];
  for (const k of required) {
    if (fm[k] === undefined) throw new Error(`Article missing frontmatter field: ${k}`);
  }
  return { ...(fm as FrontmatterFields), body: body.trim() };
}

export const ARTICLES: Article[] = [
  parse(linuxBody),
  // parse(otherBody),
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
```

- [ ] **Step 2: Verify TS compiles**

```bash
npx tsc --noEmit -p tsconfig.app.json
```

- [ ] **Step 3: Verify build (covers `?raw` import wiring)**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/content/articles.ts
git commit -m "feat(content): add article registry with frontmatter parser"
```

### Task 3.8: Build ContentService (TDD)

**Files:**
- Create: `src/app/core/content.service.ts`
- Create: `src/app/core/content.service.spec.ts`

- [ ] **Step 1: Write failing tests**

```ts
// src/app/core/content.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('exposes articles sorted newest first', () => {
    const articles = service.articles();
    for (let i = 1; i < articles.length; i++) {
      expect(articles[i - 1].publishedAt >= articles[i].publishedAt).toBeTrue();
    }
  });

  it('finds an article by slug', () => {
    const all = service.articles();
    if (all.length === 0) return; // skip if no articles seeded
    const target = all[0];
    expect(service.getArticleBySlug(target.slug)()).toEqual(target);
  });

  it('returns undefined for missing slug', () => {
    expect(service.getArticleBySlug('does-not-exist')()).toBeUndefined();
  });

  it('exposes top-tens', () => {
    expect(service.topTens().length).toBeGreaterThanOrEqual(0);
  });

  it('finds a top-ten by slug', () => {
    const all = service.topTens();
    if (all.length === 0) return;
    const target = all[0];
    expect(service.getTopTenBySlug(target.slug)()).toEqual(target);
  });
});
```

- [ ] **Step 2: Run test — should fail**

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include='**/content.service.spec.ts'
```

Expected: FAIL.

- [ ] **Step 3: Implement service**

```ts
// src/app/core/content.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { ARTICLES } from '../content/articles';
import { TOP_TENS } from '../content/top-tens';
import type { Article, TopTen } from '../content/types';

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly articles = signal<Article[]>(ARTICLES);
  readonly topTens = signal<TopTen[]>(TOP_TENS);

  getArticleBySlug(slug: string) {
    return computed(() => this.articles().find((a) => a.slug === slug));
  }

  getTopTenBySlug(slug: string) {
    return computed(() => this.topTens().find((t) => t.slug === slug));
  }

  articlesByTag(tag: string) {
    return computed(() => this.articles().filter((a) => a.tags.includes(tag)));
  }
}
```

- [ ] **Step 4: Run test — should pass**

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include='**/content.service.spec.ts'
```

Expected: 5 specs pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/core/
git commit -m "feat(core): add ContentService with signals-based content store"
```

---

## Phase 4 — Feature components refactor

### Task 4.1: Add HomeComponent (latest articles + top-ten preview)

**Files:**
- Create: `src/app/features/home/home.component.{ts,html,scss,spec.ts}`

- [ ] **Step 1: Write component**

```ts
// src/app/features/home/home.component.ts
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly content = inject(ContentService);
  readonly latestArticles = computed(() => this.content.articles().slice(0, 3));
  readonly topTens = this.content.topTens;
}
```

- [ ] **Step 2: Write template**

```html
<!-- src/app/features/home/home.component.html -->
<section class="hero">
  <h1>Tech 4 Everyone</h1>
  <p>Practical tech notes, lists, and short essays — for everyone.</p>
</section>

<section aria-labelledby="articles-heading">
  <h2 id="articles-heading">Latest articles</h2>
  <ul class="card-list">
    @for (article of latestArticles(); track article.slug) {
      <li>
        <a [routerLink]="['/articles', article.slug]">
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
        </a>
      </li>
    }
  </ul>
  <a routerLink="/articles">All articles →</a>
</section>

<section aria-labelledby="lists-heading">
  <h2 id="lists-heading">Top-ten lists</h2>
  <ul class="card-list">
    @for (list of topTens(); track list.slug) {
      <li>
        <a [routerLink]="['/top-tens', list.slug]">
          <h3>{{ list.title }}</h3>
          <p>{{ list.intro }}</p>
        </a>
      </li>
    }
  </ul>
</section>
```

- [ ] **Step 3: Empty SCSS**

```bash
echo '/* see src/styles/_tokens.scss for design tokens */' > src/app/features/home/home.component.scss
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/app/features/home/
git commit -m "feat(home): add HomeComponent driven by ContentService"
```

### Task 4.2: Add ArticlesListComponent

**Files:**
- Create: `src/app/features/articles/articles-list.component.{ts,html,scss}`

- [ ] **Step 1: Write component**

```ts
// src/app/features/articles/articles-list.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent {
  readonly articles = inject(ContentService).articles;
}
```

- [ ] **Step 2: Template**

```html
<!-- src/app/features/articles/articles-list.component.html -->
<h1>Articles</h1>
<ul class="article-list">
  @for (article of articles(); track article.slug) {
    <li>
      <a [routerLink]="article.slug">
        <h2>{{ article.title }}</h2>
        <p class="meta">
          <time [attr.datetime]="article.publishedAt">{{ article.publishedAt }}</time>
        </p>
        <p>{{ article.excerpt }}</p>
      </a>
    </li>
  } @empty {
    <li>No articles yet.</li>
  }
</ul>
```

- [ ] **Step 3: Empty SCSS**

```bash
touch src/app/features/articles/articles-list.component.scss
```

- [ ] **Step 4: Commit**

```bash
git add src/app/features/articles/articles-list.component.*
git commit -m "feat(articles): add ArticlesListComponent"
```

### Task 4.3: Add ArticleDetailComponent

**Files:**
- Create: `src/app/features/articles/article-detail.component.{ts,html,scss}`

- [ ] **Step 1: Write component**

```ts
// src/app/features/articles/article-detail.component.ts
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../core/content.service';
import { MarkdownComponent } from '../../shared/markdown/markdown.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink, MarkdownComponent],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly slug = toSignal(this.route.paramMap, { requireSync: true });

  readonly article = computed(() => {
    const s = this.slug()?.get('slug');
    return s ? this.content.getArticleBySlug(s)() : undefined;
  });
}
```

- [ ] **Step 2: Template**

```html
<!-- src/app/features/articles/article-detail.component.html -->
@if (article(); as a) {
  <article>
    <header>
      <h1>{{ a.title }}</h1>
      <p class="meta">
        <time [attr.datetime]="a.publishedAt">{{ a.publishedAt }}</time>
        @for (tag of a.tags; track tag) { <span class="tag">{{ tag }}</span> }
      </p>
    </header>
    <app-markdown [body]="a.body" />
  </article>
} @else {
  <p>Article not found. <a routerLink="/articles">Back to articles</a>.</p>
}
```

- [ ] **Step 3: Empty SCSS**

```bash
touch src/app/features/articles/article-detail.component.scss
```

- [ ] **Step 4: Commit**

```bash
git add src/app/features/articles/article-detail.component.*
git commit -m "feat(articles): add ArticleDetailComponent rendering Markdown"
```

### Task 4.4: Add TopTensListComponent

**Files:**
- Create: `src/app/features/top-tens/top-tens-list.component.{ts,html,scss}`

- [ ] **Step 1: Write component**

```ts
// src/app/features/top-tens/top-tens-list.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';

@Component({
  selector: 'app-top-tens-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-tens-list.component.html',
  styleUrls: ['./top-tens-list.component.scss'],
})
export class TopTensListComponent {
  readonly topTens = inject(ContentService).topTens;
}
```

- [ ] **Step 2: Template**

```html
<!-- src/app/features/top-tens/top-tens-list.component.html -->
<h1>Top-ten lists</h1>
<ul class="list">
  @for (t of topTens(); track t.slug) {
    <li>
      <a [routerLink]="t.slug">
        <h2>{{ t.title }}</h2>
        <p>{{ t.intro }}</p>
      </a>
    </li>
  } @empty {
    <li>No lists yet.</li>
  }
</ul>
```

- [ ] **Step 3: Empty SCSS**

```bash
touch src/app/features/top-tens/top-tens-list.component.scss
```

- [ ] **Step 4: Commit**

```bash
git add src/app/features/top-tens/top-tens-list.component.*
git commit -m "feat(top-tens): add TopTensListComponent"
```

### Task 4.5: Add TopTenDetailComponent

**Files:**
- Create: `src/app/features/top-tens/top-ten-detail.component.{ts,html,scss}`

- [ ] **Step 1: Write component**

```ts
// src/app/features/top-tens/top-ten-detail.component.ts
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../core/content.service';

@Component({
  selector: 'app-top-ten-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-ten-detail.component.html',
  styleUrls: ['./top-ten-detail.component.scss'],
})
export class TopTenDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly slug = toSignal(this.route.paramMap, { requireSync: true });

  readonly list = computed(() => {
    const s = this.slug()?.get('slug');
    return s ? this.content.getTopTenBySlug(s)() : undefined;
  });
}
```

- [ ] **Step 2: Template**

```html
<!-- src/app/features/top-tens/top-ten-detail.component.html -->
@if (list(); as l) {
  <article>
    <header>
      <h1>{{ l.title }}</h1>
      <p class="intro">{{ l.intro }}</p>
    </header>
    <ol class="ranking">
      @for (item of l.items; track item.rank) {
        <li>
          <h3>
            <span class="rank">#{{ item.rank }}</span>
            @if (item.url) {
              <a [href]="item.url" rel="noopener external">{{ item.name }}</a>
            } @else {
              {{ item.name }}
            }
          </h3>
          <p>{{ item.blurb }}</p>
        </li>
      }
    </ol>
  </article>
} @else {
  <p>List not found. <a routerLink="/top-tens">Back to top-tens</a>.</p>
}
```

- [ ] **Step 3: Empty SCSS**

```bash
touch src/app/features/top-tens/top-ten-detail.component.scss
```

- [ ] **Step 4: Commit**

```bash
git add src/app/features/top-tens/top-ten-detail.component.*
git commit -m "feat(top-tens): add TopTenDetailComponent"
```

### Task 4.6: Add AboutComponent (Markdown)

**Files:**
- Create: `src/app/content/about.md`
- Create: `src/app/features/about/about.component.{ts,html,scss}`

- [ ] **Step 1: Write the About markdown**

```markdown
<!-- src/app/content/about.md -->
# About Tech 4 Everyone

A small content site about everyday technology — what it does, how to choose it,
and where it fits in. Written in plain language, for everyone.

This site is open-source on
[GitHub](https://github.com/Hustree/tech-4-everyone) — feel free to fork it,
file an issue, or open a PR.
```

- [ ] **Step 2: Write the component**

```ts
// src/app/features/about/about.component.ts
import { Component } from '@angular/core';
import { MarkdownComponent } from '../../shared/markdown/markdown.component';
import aboutBody from '../../content/about.md?raw';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MarkdownComponent],
  template: `<app-markdown [body]="body" />`,
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  readonly body = aboutBody;
}
```

- [ ] **Step 3: Empty SCSS + commit**

```bash
touch src/app/features/about/about.component.scss
git add src/app/content/about.md src/app/features/about/
git commit -m "feat(about): add AboutComponent rendering Markdown"
```

### Task 4.7: Add NotFoundComponent

**Files:**
- Create: `src/app/features/not-found/not-found.component.ts`

- [ ] **Step 1: Write component**

```ts
// src/app/features/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Page not found</h1>
    <p><a routerLink="/">Back to home</a></p>
  `,
})
export class NotFoundComponent {}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/features/not-found/
git commit -m "feat(routes): add NotFoundComponent for 404"
```

### Task 4.8: Wire lazy routes

**Files:**
- Create / replace: `src/app/app.routes.ts`

- [ ] **Step 1: Write routes**

```ts
// src/app/app.routes.ts
import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent), title: 'Tech 4 Everyone' },
  { path: 'articles', loadComponent: () => import('./features/articles/articles-list.component').then((m) => m.ArticlesListComponent), title: 'Articles · Tech 4 Everyone' },
  { path: 'articles/:slug', loadComponent: () => import('./features/articles/article-detail.component').then((m) => m.ArticleDetailComponent) },
  { path: 'top-tens', loadComponent: () => import('./features/top-tens/top-tens-list.component').then((m) => m.TopTensListComponent), title: 'Top-ten lists · Tech 4 Everyone' },
  { path: 'top-tens/:slug', loadComponent: () => import('./features/top-tens/top-ten-detail.component').then((m) => m.TopTenDetailComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent), title: 'About · Tech 4 Everyone' },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent), title: 'Not found · Tech 4 Everyone' },
];
```

- [ ] **Step 2: Update `app.config.ts` to use the new routes file**

```ts
// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' })),
  ],
};
```

- [ ] **Step 3: Verify build + test**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 4: Smoke-test in browser**

```bash
npm start &
sleep 5
curl -fsS http://localhost:4200/ | grep -i 'app-root'
curl -fsS http://localhost:4200/articles | grep -i 'app-root'
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add src/app/app.routes.ts src/app/app.config.ts
git commit -m "feat(routes): lazy-load all features with per-route titles"
```

### Task 4.9: Refactor `AppComponent` to semantic shell with skip link

**Files:**
- Modify: `src/app/app.component.html`, `src/app/app.component.scss`, `src/app/app.component.ts`

- [ ] **Step 1: Rewrite shell template**

```html
<!-- src/app/app.component.html -->
<a class="skip-link" href="#main">Skip to content</a>
<header>
  <nav aria-label="Primary">
    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
    <a routerLink="/articles" routerLinkActive="active">Articles</a>
    <a routerLink="/top-tens" routerLinkActive="active">Top-tens</a>
    <a routerLink="/about" routerLinkActive="active">About</a>
  </nav>
</header>
<main id="main">
  <router-outlet />
</main>
<footer>
  <p>Tech 4 Everyone · <a href="https://github.com/Hustree/tech-4-everyone" rel="noopener external">source on GitHub</a></p>
</footer>
```

- [ ] **Step 2: Update component imports**

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/app.component.{ts,html,scss}
git commit -m "refactor(shell): semantic layout with skip link and aria nav"
```

### Task 4.10: Remove obsolete components

**Files:**
- Delete: `src/app/blog/`, `src/app/blog-post/`, `src/app/article/`, `src/app/top-ten-list/`, `src/app/home/`, `src/app/about/`, `src/app/blog.service.{ts,spec.ts}`, `src/app/app-routing.module.ts` (if not already removed)

- [ ] **Step 1: List candidates**

```bash
ls src/app
```

- [ ] **Step 2: Remove the legacy directories and files**

```bash
git rm -r src/app/blog src/app/blog-post src/app/article src/app/top-ten-list src/app/home src/app/about
git rm src/app/blog.service.ts src/app/blog.service.spec.ts
[ -f src/app/app-routing.module.ts ] && git rm src/app/app-routing.module.ts
[ -f src/app/app.module.ts ] && git rm src/app/app.module.ts
```

- [ ] **Step 3: Verify build + test**

```bash
npm run build && npm test -- --watch=false --browsers=ChromeHeadless
```

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor: remove legacy NgModule-era components and stub service"
```

---

## Phase 5 — Design tokens + a11y primitives

### Task 5.1: Add design tokens

**Files:**
- Create: `src/styles/_tokens.scss`

- [ ] **Step 1: Write tokens**

```scss
// src/styles/_tokens.scss

:root {
  --color-bg:        #fafafa;
  --color-surface:   #ffffff;
  --color-fg:        #1a1a1a;
  --color-muted:     #555555;
  --color-accent:    #2d6cdf;
  --color-accent-fg: #ffffff;
  --color-border:    #e2e4e8;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-serif: "Georgia", "Iowan Old Style", serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);

  --max-width: 70ch;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:      #0f1115;
    --color-surface: #181b22;
    --color-fg:      #ececec;
    --color-muted:   #9aa0a6;
    --color-accent:  #6ea1ff;
    --color-border:  #2a2e36;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_tokens.scss
git commit -m "feat(styles): add CSS-custom-property design tokens (light + dark)"
```

### Task 5.2: Add reset

**Files:**
- Create: `src/styles/_reset.scss`

- [ ] **Step 1: Write reset**

```scss
// src/styles/_reset.scss

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { color-scheme: light dark; }
body {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img, picture, svg, video { display: block; max-width: 100%; height: auto; }
a { color: var(--color-accent); text-decoration: underline; text-decoration-thickness: 0.08em; text-underline-offset: 0.15em; }
a:hover { text-decoration-thickness: 0.16em; }
button, input, select, textarea { font: inherit; color: inherit; }
h1, h2, h3, h4, h5, h6 { line-height: 1.2; margin-block: var(--space-4) var(--space-2); }
p, ul, ol { margin-block: 0 var(--space-3); }
ul, ol { padding-inline-start: var(--space-4); }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_reset.scss
git commit -m "feat(styles): add minimal reset using design tokens"
```

### Task 5.3: Add a11y primitives

**Files:**
- Create: `src/styles/_a11y.scss`

- [ ] **Step 1: Write a11y rules**

```scss
// src/styles/_a11y.scss

.skip-link {
  position: absolute;
  inset-inline-start: var(--space-2);
  inset-block-start: var(--space-2);
  background: var(--color-accent);
  color: var(--color-accent-fg);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 0.15s ease;
  z-index: 1000;
}
.skip-link:focus { transform: translateY(0); }

:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.sr-only {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_a11y.scss
git commit -m "feat(styles): add a11y primitives (skip link, focus-visible, reduced-motion)"
```

### Task 5.4: Wire `styles.scss`

**Files:**
- Modify: `src/styles.scss`

- [ ] **Step 1: Replace contents**

```scss
// src/styles.scss
@use 'styles/tokens' as *;
@use 'styles/reset' as *;
@use 'styles/a11y' as *;

main { display: block; max-width: var(--max-width); margin-inline: auto; padding: var(--space-4) var(--space-3); }
header > nav { display: flex; gap: var(--space-3); padding: var(--space-3); border-bottom: 1px solid var(--color-border); }
header > nav a { text-decoration: none; }
header > nav a.active { font-weight: 600; }
footer { padding: var(--space-4) var(--space-3); border-top: 1px solid var(--color-border); color: var(--color-muted); text-align: center; }
.card-list, .article-list, .list { list-style: none; padding: 0; display: grid; gap: var(--space-3); }
.card-list a, .article-list a, .list a { display: block; padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); text-decoration: none; color: inherit; }
.card-list a:hover, .article-list a:hover, .list a:hover { box-shadow: var(--shadow-md); }
.meta { color: var(--color-muted); font-size: 0.9em; }
.tag { display: inline-block; padding: 0.1em 0.5em; margin-inline-end: var(--space-1); background: var(--color-border); border-radius: var(--radius-sm); font-size: 0.85em; }
.ranking { padding: 0; counter-reset: rank; list-style: none; }
.ranking > li { padding: var(--space-3); border-bottom: 1px solid var(--color-border); }
.rank { color: var(--color-accent); font-family: var(--font-mono); margin-inline-end: var(--space-2); }
.prose { font-family: var(--font-serif); }
.prose pre { background: var(--color-surface); border: 1px solid var(--color-border); padding: var(--space-3); border-radius: var(--radius-md); overflow-x: auto; }
.prose code { font-family: var(--font-mono); }
```

- [ ] **Step 2: Verify build + serve visually**

```bash
npm run build
npm start &
sleep 5
# In a separate terminal/browser: open http://localhost:4200, click through every route, confirm visual baseline.
kill %1
```

- [ ] **Step 3: Commit**

```bash
git add src/styles.scss
git commit -m "feat(styles): wire token-based base layout"
```

### Task 5.5: A11y audit pass

**Files:**
- Modify: any template using non-semantic `<div>` where a heading/landmark fits.

- [ ] **Step 1: Manually audit each route**

For each of `/`, `/articles`, `/articles/:slug`, `/top-tens`, `/top-tens/:slug`, `/about`, `/404`:
- One `<h1>`, no skipped heading levels.
- All interactive elements reachable by keyboard, visible focus ring.
- Skip-link reveals on Tab from page top.
- Color contrast ≥ 4.5:1 (use the browser DevTools contrast checker on body text + accent links).

Fix any violations inline.

- [ ] **Step 2: Run Lighthouse locally**

```bash
npm run build
npx http-server dist/tech-for-all/browser -p 8080 -s &
sleep 2
npx -p @lhci/cli@0.13 lhci collect --static-dist-dir=dist/tech-for-all/browser --numberOfRuns=1
kill %1
```

Confirm a11y score ≥ 95 in the printed summary. If not, address the specific failures Lighthouse names.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix(a11y): address Lighthouse audit findings"
```

---

## Phase 6 — Public-repo presentation files

### Task 6.1: Add LICENSE (MIT)

**Files:**
- Create: `LICENSE`

- [ ] **Step 1: Write license**

```
MIT License

Copyright (c) 2026 Joshua Bascos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 2: Commit**

```bash
git add LICENSE
git commit -m "docs: add MIT license"
```

### Task 6.2: Add `.editorconfig`

**Files:**
- Create: `.editorconfig`

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 1: Commit**

```bash
git add .editorconfig
git commit -m "chore: add .editorconfig"
```

### Task 6.3: Add `.gitattributes`

**Files:**
- Create: `.gitattributes`

```gitattributes
# .gitattributes
* text=auto eol=lf
*.png binary
*.jpg binary
*.gif binary
*.ico binary
```

- [ ] **Step 1: Commit**

```bash
git add .gitattributes
git commit -m "chore: add .gitattributes for consistent line endings"
```

### Task 6.4: Tighten `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Append modern entries**

Append to existing `.gitignore`:

```gitignore
# Build outputs
dist
.angular/cache

# Lighthouse CI
.lighthouseci

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

(De-duplicate against what's already there.)

- [ ] **Step 2: Remove any committed `dist/` or `.DS_Store` files**

```bash
git rm -r --cached dist 2>/dev/null || true
find . -name '.DS_Store' -not -path './node_modules/*' -exec git rm --cached {} + 2>/dev/null || true
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: tighten .gitignore and untrack build outputs"
```

### Task 6.5: Write `README.md`

**Files:**
- Replace: `README.md`

- [ ] **Step 1: Write README**

```markdown
# tech-4-everyone

> A small, opinionated Angular 20 SPA — designed to be read and extended by humans **and** AI agents.

[![CI](https://github.com/Hustree/tech-4-everyone/actions/workflows/ci.yml/badge.svg)](https://github.com/Hustree/tech-4-everyone/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Hustree/tech-4-everyone/actions/workflows/codeql.yml/badge.svg)](https://github.com/Hustree/tech-4-everyone/actions/workflows/codeql.yml)
[![Pages](https://github.com/Hustree/tech-4-everyone/actions/workflows/deploy.yml/badge.svg)](https://hustree.github.io/tech-4-everyone/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![Screenshot](docs/assets/screenshot.png)

## What this is

A tiny tech-content blog — top-ten lists and short articles — built as an Angular 20 portfolio piece. It's intentionally small so an AI agent can model the entire codebase in context, while showing off modern Angular idioms (standalone components, signals, the new `@if`/`@for` control flow, the `application` builder), a strict content-as-code architecture, and an a11y-first design system built on CSS custom properties.

Sibling in spirit to [`pdf-esign-starter`](https://github.com/Hustree/pdf-esign-starter) and [`e2e-payload-encryption-starter`](https://github.com/Hustree/e2e-payload-encryption-starter).

## Stack

| Layer | Tech |
|---|---|
| Framework | Angular 20 (standalone, signals, new control flow, `application` builder) |
| Language | TypeScript 5.5+ |
| Styling | Plain SCSS + CSS custom-property design tokens |
| Content | Markdown (`marked` + `DOMPurify`) for articles; typed TS for top-ten lists |
| Tests | Karma + Jasmine |
| CI | GitHub Actions: build/lint/test, CodeQL, Dependabot, Lighthouse a11y |
| Hosting | GitHub Pages |
| License | MIT |

## Quick start

```bash
git clone https://github.com/Hustree/tech-4-everyone.git
cd tech-4-everyone
npm install
npm start
```

Then open <http://localhost:4200>.

- Build for production: `npm run build`
- Run unit tests: `npm test -- --watch=false --browsers=ChromeHeadless`
- Lint: `npm run lint`

## Features

- **Content-as-code.** Top-ten lists are typed TypeScript; articles are Markdown files with YAML frontmatter, imported as raw strings and rendered through a sanitized `<app-markdown>` component.
- **Modern Angular.** Standalone components, signals end-to-end, `@if`/`@for` control flow, lazy-loaded routes, the new `application` builder.
- **A11y-first.** Semantic HTML, skip link to `<main>`, visible `:focus-visible` rings, color-contrast tokens, `prefers-reduced-motion` honored. Lighthouse a11y ≥ 95 enforced in CI.
- **Design tokens.** All visual decisions go through CSS custom properties in `src/styles/_tokens.scss` — light + dark via `prefers-color-scheme`.
- **CI hygiene.** Build/lint/test on every PR, weekly CodeQL TypeScript scans, Dependabot for npm + Actions, Lighthouse a11y check.
- **Auto-deploy.** Push to `main` → GitHub Pages deploy via Actions.

## Repo layout

```
tech-4-everyone/
├── src/
│   ├── app/
│   │   ├── core/         ContentService (signals)
│   │   ├── shared/       MarkdownComponent
│   │   ├── content/      types, top-tens.ts, articles.ts, articles/*.md
│   │   └── features/     home, about, articles, top-tens, not-found
│   └── styles/           _tokens, _reset, _a11y partials
├── docs/                 architecture, content authoring, a11y notes
├── .github/              CI, CodeQL, Pages deploy, Dependabot, templates
├── CLAUDE.md             agent orientation
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE               MIT
```

## Documentation

- [Architecture](docs/architecture.md) — routing, content model, design tokens
- [Content authoring](docs/content-authoring.md) — how to add an article or top-ten list
- [Accessibility](docs/accessibility.md) — what we commit to and how it's enforced

## For AI agents

Start with [`CLAUDE.md`](CLAUDE.md) — it covers project conventions, content authoring, and CI gates.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Commits follow [Conventional Commits](https://www.conventionalcommits.org/). All PRs require green CI.

## Security

See [SECURITY.md](SECURITY.md) for how to report vulnerabilities.

## License

MIT — see [LICENSE](LICENSE).
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README to match public-repo presentation standard"
```

### Task 6.6: Write `CLAUDE.md`

**Files:**
- Create: `CLAUDE.md`

```markdown
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
```

- [ ] **Step 1: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md agent orientation"
```

### Task 6.7: Write `CONTRIBUTING.md`

**Files:**
- Create: `CONTRIBUTING.md`

```markdown
# Contributing

Thanks for your interest in `tech-4-everyone`.

## Getting set up

```bash
git clone https://github.com/Hustree/tech-4-everyone.git
cd tech-4-everyone
npm install
npm start
```

## Development loop

- `npm start` — dev server on http://localhost:4200
- `npm test -- --watch` — unit tests in watch mode
- `npm run build` — production build
- `npm run lint` — lint

## Commit style

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` docs only
- `refactor:` refactor with no behavior change
- `test:` test-only changes
- `build:` build/deps changes
- `ci:` CI config changes
- `chore:` everything else

Example: `feat(articles): add tag filtering`.

## Branch naming

- `feat/<short-slug>` — new feature
- `fix/<short-slug>` — bug fix

## Pull request checklist

- [ ] Lint passes (`npm run lint`)
- [ ] Tests pass (`npm test -- --watch=false --browsers=ChromeHeadless`)
- [ ] Build passes (`npm run build`)
- [ ] Lighthouse a11y score ≥ 95 on the built artifact
- [ ] No `any` types introduced
- [ ] No literal hex/rgb in SCSS — use design tokens
- [ ] No content hardcoded in templates — go through `ContentService`
- [ ] CLAUDE.md still accurate; updated if conventions changed

## Filing an issue

Use the templates under `.github/ISSUE_TEMPLATE/`.
```

- [ ] **Step 1: Commit**

```bash
git add CONTRIBUTING.md
git commit -m "docs: add CONTRIBUTING with commit + PR conventions"
```

### Task 6.8: Write `SECURITY.md`

**Files:**
- Create: `SECURITY.md`

```markdown
# Security policy

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Instead, report via GitHub's [private vulnerability advisory](https://github.com/Hustree/tech-4-everyone/security/advisories/new) form. We aim to acknowledge within 72 hours.

## Supported versions

This is a small personal portfolio site — only the latest commit on `main` is supported.

## Known limitations

- No authentication or session management — the site is a static SPA.
- Markdown is rendered through `marked` + `DOMPurify`. We sanitize but assume content authors are trusted (this is a personal blog).
- The site is hosted on GitHub Pages. Trust boundary is your trust in GitHub.

## Dependencies

- Dependabot watches `npm` and `github-actions` weekly.
- CodeQL scans TypeScript on every push and weekly.
```

- [ ] **Step 1: Commit**

```bash
git add SECURITY.md
git commit -m "docs: add SECURITY policy"
```

### Task 6.9: Write `docs/architecture.md`

**Files:**
- Create: `docs/architecture.md`

```markdown
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
```

- [ ] **Step 1: Commit**

```bash
git add docs/architecture.md
git commit -m "docs: add architecture overview"
```

### Task 6.10: Write `docs/content-authoring.md`

**Files:**
- Create: `docs/content-authoring.md`

```markdown
# Content authoring

## Adding an article

1. Create `src/app/content/articles/<slug>.md`:

   ```markdown
   ---
   title: Your article title
   slug: your-slug
   excerpt: One-sentence summary that appears on list pages.
   publishedAt: 2026-04-28
   tags: [tag-a, tag-b]
   cover: /assets/your-cover.png   # optional
   ---

   # Your article title

   Body in Markdown. Standard GFM is supported. Inline HTML is sanitized
   by DOMPurify before rendering.
   ```

2. Register it in `src/app/content/articles.ts`:

   ```ts
   import yourBody from './articles/your-slug.md?raw';
   // ... add to the ARTICLES array:
   parse(yourBody),
   ```

3. Run `npm run build`. Sort order is automatic — newest by `publishedAt` first.

## Frontmatter requirements

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | shown in `<h1>` and tab title |
| `slug` | yes | string | must match the filename |
| `excerpt` | yes | string | shown on list pages |
| `publishedAt` | yes | ISO date (`YYYY-MM-DD`) | used for sorting |
| `tags` | yes | array | e.g. `[linux, productivity]` |
| `cover` | no | string | path to image under `src/assets/` |

The parser fails the build if any required field is missing — keep frontmatter strict.

## Adding a top-ten list

Top-tens are pure TS in `src/app/content/top-tens.ts`. Append:

```ts
{
  slug: 'my-list-slug',
  title: 'Top 10 ...',
  intro: 'One-sentence framing.',
  items: [
    { rank: 1, name: 'First', blurb: '...', url: 'https://example.com' },
    // ...
  ],
  publishedAt: '2026-04-28',
  tags: ['...'],
},
```

`items` may have any length — it doesn't have to be ten — but keep `rank` unique and ascending.

## Images

Drop image files under `src/assets/`. Reference them as `/assets/your-image.png` in frontmatter or Markdown.
```

- [ ] **Step 1: Commit**

```bash
git add docs/content-authoring.md
git commit -m "docs: add content authoring guide"
```

### Task 6.11: Write `docs/accessibility.md`

**Files:**
- Create: `docs/accessibility.md`

```markdown
# Accessibility

## Commitments

| Commitment | Where it's enforced |
|---|---|
| Semantic HTML (header/nav/main/article/footer) | `src/app/app.component.html`, feature templates |
| Skip link to `<main>` | `src/app/app.component.html` + `src/styles/_a11y.scss` `.skip-link` |
| Visible `:focus-visible` rings on every interactive element | `src/styles/_a11y.scss` `:where(...)` rule |
| Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text | Token pairs in `src/styles/_tokens.scss` (verified per pair) |
| `prefers-reduced-motion` honored | `src/styles/_a11y.scss` reduced-motion media query |
| One `<h1>` per route, no skipped heading levels | Each feature template; verified by Lighthouse |
| Image `alt` text for every `<img>` | Code review + Lighthouse |
| `<html lang>` set | `src/index.html` |
| Lighthouse a11y score ≥ 95 | `.github/workflows/ci.yml` Lighthouse step |

## Local audit

```bash
npm run build
npx http-server dist/tech-for-all/browser -p 8080 -s &
npx -p @lhci/cli@0.13 lhci collect --static-dist-dir=dist/tech-for-all/browser --numberOfRuns=1
```

## Reporting an a11y issue

Open an issue using the bug-report template; tag it `a11y`.
```

- [ ] **Step 1: Commit**

```bash
git add docs/accessibility.md
git commit -m "docs: add accessibility commitments"
```

### Task 6.12: Add issue + PR templates

**Files:**
- Create: `.github/ISSUE_TEMPLATE/bug_report.md`, `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/PULL_REQUEST_TEMPLATE.md`

- [ ] **Step 1: Bug report template**

```markdown
---
name: Bug report
about: Report a bug
labels: bug
---

**Describe the bug**

**Steps to reproduce**

1.
2.
3.

**Expected behavior**

**Screenshots / logs**

**Environment**
- Browser:
- OS:
```

- [ ] **Step 2: Feature request template**

```markdown
---
name: Feature request
about: Suggest a feature
labels: enhancement
---

**Problem this solves**

**Proposed solution**

**Alternatives considered**
```

- [ ] **Step 3: PR template**

```markdown
## Summary



## Checklist
- [ ] Lint passes (`npm run lint`)
- [ ] Tests pass (`npm test -- --watch=false --browsers=ChromeHeadless`)
- [ ] Build passes (`npm run build`)
- [ ] Lighthouse a11y ≥ 95 on the built artifact
- [ ] No `any` introduced; no literal hex/rgb in SCSS
- [ ] CLAUDE.md still accurate
```

- [ ] **Step 4: Commit**

```bash
git add .github/ISSUE_TEMPLATE/ .github/PULL_REQUEST_TEMPLATE.md
git commit -m "chore(github): add issue and PR templates"
```

---

## Phase 7 — CI workflows

### Task 7.1: Add CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --watch=false --browsers=ChromeHeadless
      - run: npm run build
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/tech-for-all/browser
          retention-days: 7

  lighthouse:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/tech-for-all/browser
      - run: npx --yes @lhci/cli@0.13 autorun --config=./lighthouserc.json
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

- [ ] **Step 1: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add build/lint/test/lighthouse workflow"
```

### Task 7.2: Add CodeQL workflow

**Files:**
- Create: `.github/workflows/codeql.yml`

```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'

permissions:
  actions: read
  contents: read
  security-events: write

jobs:
  analyze:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language: [javascript-typescript]
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
          queries: security-extended
      - uses: github/codeql-action/analyze@v3
```

- [ ] **Step 1: Commit**

```bash
git add .github/workflows/codeql.yml
git commit -m "ci: add CodeQL TypeScript analysis"
```

### Task 7.3: Add Dependabot config

**Files:**
- Create: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      angular:
        patterns:
          - "@angular/*"
          - "@angular-devkit/*"
          - "@angular-eslint/*"
      dev-dependencies:
        dependency-type: development
        exclude-patterns:
          - "@angular/*"
          - "@angular-devkit/*"
          - "@angular-eslint/*"

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

- [ ] **Step 1: Commit**

```bash
git add .github/dependabot.yml
git commit -m "ci: add Dependabot for npm + GitHub Actions"
```

### Task 7.4: Add Lighthouse CI config

**Files:**
- Create: `lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist/tech-for-all/browser",
      "numberOfRuns": 1,
      "url": [
        "http://localhost/index.html"
      ]
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

- [ ] **Step 1: Commit**

```bash
git add lighthouserc.json
git commit -m "ci: add Lighthouse CI config (a11y >= 0.95)"
```

---

## Phase 8 — GitHub Pages deploy

### Task 8.1: Configure base-href in build

**Files:**
- Modify: `package.json` (add `build:pages` script)

- [ ] **Step 1: Add script**

In `package.json` `scripts`:

```json
"build:pages": "ng build --base-href=/tech-4-everyone/ --configuration production"
```

- [ ] **Step 2: Verify**

```bash
npm run build:pages
ls dist/tech-for-all/browser/
grep -i 'base href' dist/tech-for-all/browser/index.html
```

Expected: `<base href="/tech-4-everyone/">`.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "build: add Pages build script with base-href"
```

### Task 8.2: Add deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build:pages
      - name: Add SPA fallback
        run: cp dist/tech-for-all/browser/index.html dist/tech-for-all/browser/404.html
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/tech-for-all/browser
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 1: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

### Task 8.3: Enable Pages + set repo metadata (manual + gh CLI)

**Files:**
- None (GitHub config)

- [ ] **Step 1: Enable Pages source = Actions**

```bash
gh api -X POST /repos/Hustree/tech-4-everyone/pages -f build_type=workflow 2>&1 || gh api -X PUT /repos/Hustree/tech-4-everyone/pages -f build_type=workflow
```

If neither works (account permissions vary), enable manually: GitHub → repo → Settings → Pages → Source: "GitHub Actions".

- [ ] **Step 2: Set repo description and homepage**

```bash
gh repo edit Hustree/tech-4-everyone \
  --description "A small, opinionated Angular 20 SPA — designed to be read and extended by humans and AI agents." \
  --homepage "https://hustree.github.io/tech-4-everyone/" \
  --add-topic angular \
  --add-topic typescript \
  --add-topic signals \
  --add-topic standalone-components \
  --add-topic accessibility \
  --add-topic markdown \
  --add-topic github-pages
```

---

## Phase 9 — Final polish

### Task 9.1: Capture screenshot

**Files:**
- Create: `docs/assets/screenshot.png`

- [ ] **Step 1: Take a screenshot of the home page (in light mode, ~1280×800).**

Save as `docs/assets/screenshot.png`. Compress with `tinypng` or similar before committing if > 200 KB.

- [ ] **Step 2: Commit**

```bash
git add docs/assets/screenshot.png
git commit -m "docs: add README screenshot"
```

### Task 9.2: Final green-bar pass

- [ ] **Step 1: Run the full local CI sequence**

```bash
npm ci
npm run lint
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
npm run build:pages
```

All must pass. Fix any failure before continuing.

- [ ] **Step 2: Run Lighthouse locally on the Pages build**

```bash
npx http-server dist/tech-for-all/browser -p 8080 -s &
sleep 2
npx -p @lhci/cli@0.13 lhci collect --static-dist-dir=dist/tech-for-all/browser --numberOfRuns=1
kill %1
```

Confirm a11y ≥ 95.

- [ ] **Step 3: Verify README links work locally**

Open `README.md` in a Markdown previewer (or `gh repo view --web` after pushing). Confirm: badges, `docs/` links, sibling-repo links, screenshot.

### Task 9.3: Push branch and open PR

- [ ] **Step 1: Push**

```bash
git push -u origin feat/modernize-angular-20
```

- [ ] **Step 2: Open PR**

```bash
gh pr create --title "Modernize to Angular 20 + ship as top-tier public repo" --body "$(cat <<'EOF'
## Summary

Modernizes `tech-4-everyone` from Angular 15 (EOL) to Angular 20 and packages it as a public-repo-presentable portfolio piece — sibling to `pdf-esign-starter` and `e2e-payload-encryption-starter`.

- Angular 15 → 20 step ladder (standalone components, signals, new control flow, `application` builder).
- Content-as-code: typed TS for top-ten lists, Markdown + frontmatter for articles, sanitized rendering via `<app-markdown>`.
- Design tokens (CSS custom properties) + a11y primitives (skip link, focus-visible, reduced-motion).
- Public-repo files: README, CLAUDE.md, CONTRIBUTING.md, SECURITY.md, MIT LICENSE, issue/PR templates, .editorconfig, .gitattributes.
- CI: build/lint/test, CodeQL (TS), Dependabot (npm + Actions), Lighthouse a11y ≥ 95.
- Auto-deploy to GitHub Pages on push to `main`.

Spec: `docs/superpowers/specs/2026-04-28-tech-4-everyone-modernization-design.md`
Plan: `docs/superpowers/plans/2026-04-28-tech-4-everyone-modernization.md`

## Test plan

- [ ] CI green (build/lint/test)
- [ ] CodeQL green
- [ ] Lighthouse a11y ≥ 95
- [ ] Pages deploy succeeds
- [ ] Live site loads at https://hustree.github.io/tech-4-everyone/
- [ ] All routes navigate correctly (SPA fallback works for deep links)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: After CI is green and Pages deploy completes, squash-merge.**

```bash
gh pr merge --squash --delete-branch
```

(Confirm with the user before running this — merging is a hard-to-reverse action.)

- [ ] **Step 4: Verify live site**

```bash
sleep 60   # Pages deploy can lag a minute after merge
curl -fsSI https://hustree.github.io/tech-4-everyone/ | head -3
```

Expected: `HTTP/2 200`.

---

## Self-review notes

- **Spec coverage:** Every section of the spec maps to at least one task above (Angular bump → Phase 1; standalone/control-flow/builder → Phase 2; content model → Phase 3; feature refactor → Phase 4; styling/a11y → Phase 5; public-repo files → Phase 6; CI → Phase 7; deploy → Phase 8; final polish → Phase 9). The spec's "Out of scope" items (SSR, CMS, E2E framework, `scripts/dev.sh`, repo rename) are not included anywhere — correct.
- **Placeholder scan:** No "TBD"/"TODO"/"figure out later." Concrete code in every code step; concrete commands in every command step. The two manual-content steps (Tasks 3.2 and 3.6) explicitly note they require reading the existing components first and copying content faithfully.
- **Type consistency:** `TopTen`/`Article`/`TopTenItem` defined in Task 3.1 are used identically in 3.2, 3.7, 3.8, 4.x. `ContentService` API (`articles`, `topTens`, `getArticleBySlug`, `getTopTenBySlug`, `articlesByTag`) is consistent between 3.8 and consumers in 4.x. `MarkdownComponent` input named `body` consistently.
- **Risk: Angular CLI version availability.** If a major version (e.g. 16) ages out of npm retention before this is executed, replace `npx -p @angular/cli@N` with the next supported entry point. The plan assumes April 2026 npm registry state.
