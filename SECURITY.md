# Security policy

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Instead, report via GitHub's [private vulnerability advisory](https://github.com/Hustree/tech-4-everyone/security/advisories/new) form. We aim to acknowledge within 72 hours.

## Supported versions

This is a small personal portfolio site — only the latest commit on `main` is supported.

## Known limitations

- No authentication or session management — the site is a static SPA.
- Markdown is rendered through `marked` + `DOMPurify`. We sanitize but assume content authors are trusted (this is a personal blog).
- The site is hosted on GitHub Pages. Trust boundary is your trust in GitHub.

## Dependencies

- Dependabot watches `npm` and `github-actions` weekly.
- CodeQL scans TypeScript on every push and weekly.
