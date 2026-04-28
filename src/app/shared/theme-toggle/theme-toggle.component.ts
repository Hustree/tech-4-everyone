import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService, type ThemeMode } from '../../core/theme.service';

const ICON: Record<ThemeMode, string> = {
  system: '◐',
  light: '☀',
  dark: '☾',
};

const LABEL: Record<ThemeMode, string> = {
  system: 'Theme: system',
  light: 'Theme: light',
  dark: 'Theme: dark',
};

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="theme-toggle"
      [attr.aria-label]="label()"
      [title]="label() + ' (click to switch)'"
      (click)="theme.cycle()"
    >
      <span aria-hidden="true">{{ icon() }}</span>
      <span class="sr-only">{{ label() }}</span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      color: var(--color-fg);
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      padding: var(--space-2) var(--space-3);
    }
    .theme-toggle:hover {
      background: var(--color-surface);
    }
  `],
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly icon = computed(() => ICON[this.theme.mode()]);
  protected readonly label = computed(() => LABEL[this.theme.mode()]);
}
