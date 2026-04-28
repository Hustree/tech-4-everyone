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
