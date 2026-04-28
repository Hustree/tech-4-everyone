import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MarkdownComponent] }).compileComponents();
    fixture = TestBed.createComponent(MarkdownComponent);
  });

  it('renders Markdown to sanitized HTML', () => {
    fixture.componentRef.setInput('body', '# Hello\n\nWorld');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('h1')?.textContent).toBe('Hello');
    expect(root.querySelector('p')?.textContent).toBe('World');
  });

  it('strips <script> tags', () => {
    fixture.componentRef.setInput('body', '<script>alert(1)</script>OK');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.innerHTML).not.toContain('<script>');
    expect(root.textContent).toContain('OK');
  });

  it('keeps safe links', () => {
    fixture.componentRef.setInput('body', '[link](https://example.com)');
    fixture.detectChanges();
    const a = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(a?.getAttribute('href')).toBe('https://example.com');
  });
});
