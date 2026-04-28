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

  private readonly params = toSignal(this.route.paramMap, { requireSync: true });

  readonly list = computed(() => {
    const s = this.params()?.get('slug');
    return s ? this.content.getTopTenBySlug(s)() : undefined;
  });
}
