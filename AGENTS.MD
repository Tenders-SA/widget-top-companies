# @tenders-sa-org/widget-top-companies — Agent Instructions

**Path**: `widgets/widget-top-companies/` | **Published**: [npm](https://npmjs.com/package/@tenders-sa-org/widget-top-companies)

## What It Is
Simplest widget — ranked supplier leaderboard embed. No Shadow DOM, uses `<style>` injection.

## Quick Start
```bash
npm install
npm run build     # tsup: esm + iife (global: TendersaTopCompanies)
npm test          # vitest (colocated tests in src/)
npm version patch && npm publish   # manual publish
```

## Key Files
| File | Purpose |
|------|---------|
| `src/index.ts` | `TopCompaniesWidget` + auto-init via `[data-tendersa-top-companies]` |
| `src/api.ts` | Fetches `GET /api/widgets/top-companies` |
| `src/renderer.ts` | DOM-based renderer with inline styles |
| `src/styles.ts` | CSS template string injected via `<style>` |
| `src/types.ts` | Interfaces |

## Architecture Notes
- **No Shadow DOM** — injects `<style>` into `<head>`
- **Simplest structure** — fewest source files of all 5 widgets
- **Colocated tests** in `src/__tests__/` (not separate `tests/` dir)
- Constructor takes config, then `render(container)` takes DOM element
- `index.html` in root for local dev/testing

## Published
- v0.1.1 (current)
