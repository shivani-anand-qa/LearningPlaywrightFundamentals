# Learning Playwright Fundamentals

A repository for learning and practicing test automation with [Playwright](https://playwright.dev/).

## Project Structure

- `tests/` — Playwright test specs
  - `01_Basics/` — first test, test annotations (`skip`, `only`, `fail`, `slow`, conditional skip)
  - `02_first_tests/` — Browser → Context → Page fundamentals: single/multiple contexts, multiple tabs, context options (locale, geolocation, device emulation), and fixture-based tests (`page`, `browser`)
  - `Template.spec.ts` — starter template for new specs
- `playwright.config.ts` — Playwright configuration
- `package.json` — project dependencies and scripts

## Getting Started

Install dependencies:

```bash
npm install
```

Run the tests:

```bash
npx playwright test
```

View the HTML report:

```bash
npx playwright show-report
```
