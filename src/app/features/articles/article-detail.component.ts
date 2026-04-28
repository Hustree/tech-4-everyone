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

  private readonly params = toSignal(this.route.paramMap, { requireSync: true });

  readonly article = computed(() => {
    const s = this.params()?.get('slug');
    return s ? this.content.getArticleBySlug(s)() : undefined;
  });
}
