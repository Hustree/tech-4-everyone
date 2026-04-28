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
