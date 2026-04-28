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
