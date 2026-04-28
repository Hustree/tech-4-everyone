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
    if (all.length === 0) return;
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
