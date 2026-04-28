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
