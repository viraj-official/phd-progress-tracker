# PhD progress tracker

Static site for supervisors to follow the PhD (Brain Cancer Research, University of Sri Jayewardenepura).
Built with Next.js (static export) and published to GitHub Pages at
`https://viraj-official.github.io/phd-progress-tracker/` on every push to `main`
(see `.github/workflows/pages.yml`).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Where to edit

| What | File |
| --- | --- |
| Title, supervisors, latest update, objectives, timeline, updates | `src/data/phd.ts` |
| Documents and their checklists | `src/data/documents.ts` (PDFs in `public/docs/`) |
| Supervisor meeting log book | `src/data/logbook.ts` |
| My profile and wish list | `src/data/profile.ts` |
| Full supervisor profiles and CVs | `src/data/supervisorProfiles.ts` |
| Research Paper Bank | generated: `npm run sync` reads `../3 Research Papers/O*/O*_Paper_Review.xlsx` into `src/data/papers.json` |

## Site map

- Overview
- Research → Objectives, Paper Bank (`#papers/O1`, `#papers/O1/<paper id>`)
- Progress → Timeline, Updates, Log Book
- Documents (`#documents/<id>`)
- People → My profile, Supervisors (`#supervisors/<slug>`)

Every section has a deep link (`#view/part`); the ⚙ menu switches on "copy link" buttons.
Documents open in an in-page viewer and are not offered for download.

## Checks before pushing

```bash
npx tsc --noEmit
npm run lint
npm run build
```
