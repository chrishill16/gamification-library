# The Gamification Library

A visual, searchable reference connecting behavioural objectives → gamification patterns → real implementations → qualified evidence, for product managers and designers. See [BRIEF.md](./BRIEF.md) for the full v1 specification.

Live at: https://chrishill16.github.io/gamification-library/

## Stack

React + TypeScript + Vite + Tailwind CSS, static, no backend. Content lives in version-controlled JSON under `src/data/`, validated at build time against zod schemas (`scripts/validate-content.ts`).

## Development

```bash
npm install
npm run dev       # start the dev server
npm run validate  # check content for referential integrity
npm run build     # validate + typecheck + production build
npm run preview   # serve the production build locally
```

## Content

Every behaviour, pattern, implementation, evidence record, source and screenshot is a JSON record in `src/data/`. Cross-references (e.g. a pattern's `familyId`, an implementation's `mechanicStack`) are checked for referential integrity on every build — a broken reference fails the build rather than shipping silently.

Screenshots use a neutral placeholder plus a source link until a rights-cleared image is dropped in at the path referenced by `imagePath`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages via GitHub Actions.
