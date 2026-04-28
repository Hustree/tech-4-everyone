import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown',
  standalone: true,
  template: `<div class="prose" [innerHTML]="rendered()"></div>`,
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent {
  readonly body = input.required<string>();

  private readonly sanitizer = inject(DomSanitizer);

  readonly rendered = computed<SafeHtml>(() => {
    const raw = marked.parse(this.body(), { async: false }) as string;
    const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
    return this.sanitizer.bypassSecurityTrustHtml(clean);
  });
}
