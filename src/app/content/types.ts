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
