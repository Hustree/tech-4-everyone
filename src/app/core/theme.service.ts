import { computed, effect, Injectable, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';
const NEXT: Record<ThemeMode, ThemeMode> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(this.read());
  readonly mode = this._mode.asReadonly();
  readonly nextMode = computed(() => NEXT[this._mode()]);

  constructor() {
    effect(() => this.apply(this._mode()));
  }

  set(mode: ThemeMode): void {
    this._mode.set(mode);
  }

  cycle(): void {
    this._mode.update((m) => NEXT[m]);
  }

  private read(): ThemeMode {
    if (typeof localStorage === 'undefined') return 'system';
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  }

  private apply(mode: ThemeMode): void {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    if (mode === 'system') html.removeAttribute('data-theme');
    else html.setAttribute('data-theme', mode);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, mode);
  }
}
