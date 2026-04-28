# Contributing

Thanks for your interest in `tech-4-everyone`.

## Getting set up

```bash
git clone https://github.com/Hustree/tech-4-everyone.git
cd tech-4-everyone
npm install
npm start
```

## Development loop

- `npm start` — dev server on http://localhost:4200
- `npm test -- --watch` — unit tests in watch mode
- `npm run build` — production build
- `npm run lint` — lint

## Commit style

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` docs only
- `refactor:` refactor with no behavior change
- `test:` test-only changes
- `build:` build/deps changes
- `ci:` CI config changes
- `chore:` everything else

Example: `feat(articles): add tag filtering`.

## Branch naming

- `feat/<short-slug>` — new feature
- `fix/<short-slug>` — bug fix

## Pull request checklist

- [ ] Lint passes (`npm run lint`)
- [ ] Tests pass (`npm test -- --watch=false --browsers=ChromeHeadless`)
- [ ] Build passes (`npm run build`)
- [ ] Lighthouse a11y score ≥ 95 on the built artifact
- [ ] No `any` types introduced
- [ ] No literal hex/rgb in SCSS — use design tokens
- [ ] No content hardcoded in templates — go through `ContentService`
- [ ] AGENTS.md still accurate; updated if conventions changed

## Filing an issue

Use the templates under `.github/ISSUE_TEMPLATE/`.
