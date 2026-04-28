# Accessibility

## Commitments

| Commitment | Where it's enforced |
|---|---|
| Semantic HTML (header/nav/main/article/footer) | `src/app/app.component.html`, feature templates |
| Skip link to `<main>` | `src/app/app.component.html` + `src/styles/_a11y.scss` `.skip-link` |
| Visible `:focus-visible` rings on every interactive element | `src/styles/_a11y.scss` `:where(...)` rule |
| Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text | Token pairs in `src/styles/_tokens.scss` (verified per pair) |
| `prefers-reduced-motion` honored | `src/styles/_a11y.scss` reduced-motion media query |
| One `<h1>` per route, no skipped heading levels | Each feature template; verified by Lighthouse |
| Image `alt` text for every `<img>` | Code review + Lighthouse |
| `<html lang>` set | `src/index.html` |
| Lighthouse a11y score ≥ 95 | `.github/workflows/ci.yml` Lighthouse step |

## Local audit

```bash
npm run build
npx http-server dist/tech-for-all/browser -p 8080 -s &
npx -p @lhci/cli@0.13 lhci collect --static-dist-dir=dist/tech-for-all/browser --numberOfRuns=1
```

## Reporting an a11y issue

Open an issue using the bug-report template; tag it `a11y`.
