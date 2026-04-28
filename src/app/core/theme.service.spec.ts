import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
  });

  function makeService(): ThemeService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.runInInjectionContext(() => TestBed.inject(ThemeService));
  }

  it('defaults to "system" when nothing is stored', () => {
    const svc = makeService();
    expect(svc.mode()).toBe('system');
    expect(document.documentElement.hasAttribute('data-theme')).toBeFalse();
  });

  it('reads a previously stored mode', () => {
    localStorage.setItem('theme', 'dark');
    const svc = makeService();
    expect(svc.mode()).toBe('dark');
  });

  it('writes data-theme on the <html> element when set explicitly', () => {
    const svc = makeService();
    svc.set('light');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    svc.set('dark');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('removes data-theme when switching back to system', () => {
    const svc = makeService();
    svc.set('dark');
    TestBed.tick();
    svc.set('system');
    TestBed.tick();
    expect(document.documentElement.hasAttribute('data-theme')).toBeFalse();
  });

  it('cycles system → light → dark → system', () => {
    const svc = makeService();
    expect(svc.mode()).toBe('system');
    svc.cycle();
    expect(svc.mode()).toBe('light');
    svc.cycle();
    expect(svc.mode()).toBe('dark');
    svc.cycle();
    expect(svc.mode()).toBe('system');
  });

  it('persists the chosen mode to localStorage', () => {
    const svc = makeService();
    svc.set('dark');
    TestBed.tick();
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
