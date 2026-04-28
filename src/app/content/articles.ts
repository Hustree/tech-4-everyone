import type { Article } from './types';
import body1 from './articles/why-investing-in-a-high-quality-laptop-is-a-smart-decision.md?raw';
import body2 from './articles/why-a-simple-black-t-shirt-is-the-ultimate-productivity-tool-for-programmers.md?raw';

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
  if (!match) throw new Error('Article missing frontmatter');
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
  const required: (keyof FrontmatterFields)[] = [
    'title',
    'slug',
    'excerpt',
    'publishedAt',
    'tags',
  ];
  for (const k of required) {
    if (fm[k] === undefined) throw new Error(`Article missing frontmatter field: ${k}`);
  }
  return { ...(fm as FrontmatterFields), body: body.trim() };
}

export const ARTICLES: Article[] = [parse(body1), parse(body2)].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);
