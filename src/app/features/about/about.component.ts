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
