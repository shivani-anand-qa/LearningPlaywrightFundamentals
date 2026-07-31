# Learning Playwright Fundamentals

A repository for learning and practicing test automation with [Playwright](https://playwright.dev/).

## Project Structure

- `tests/` — Playwright test specs
  - `01_Basics/` — first test, test annotations (`skip`, `only`, `fail`, `slow`, conditional skip)
  - `02_first_tests/` — Browser → Context → Page fundamentals: single/multiple contexts, multiple tabs, context options (locale, geolocation, device emulation), and fixture-based tests (`page`, `browser`)
  - `03_Locators_Commands/` — Locators & commands: `goto` `waitUntil`/referer options, `getByRole`, lazy/strict/auto-wait locator behavior, `pressSequentially`, and login/signup practice specs against VWO and Katalon Cura demo sites
  - `04_Session_Storage/` — reusing an authenticated session across tests: `247_SessionStorage.spec.ts` is a standalone script (run directly with `node`/`ts-node`, not via the test runner) that logs in once and saves `storageState` to `user-session.json`; `248_TestVWODashboard_NoCustomReport.spec.ts` loads that saved state to skip login
  - `05_Allure_Reporting/` — same saved-session pattern as above, structured with `test.step`/tags/attachments to exercise the Allure and custom HTML reporters
  - `Template.spec.ts` — starter template for new specs
- `utils/CustomReporter.ts` — custom Playwright reporter that generates a self-contained, filterable HTML report (`tta-report/`) with per-step screenshots, console logs, video, and trace links
- `playwright.config.ts` — Playwright configuration (Firefox and WebKit projects currently disabled; Chromium only). Reporters: `line`, `allure-playwright`, and the custom reporter above
- `tsconfig.json` — enables editor type-checking (Node globals, etc.) for `tests/`, `utils/`, and the config file
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

### Custom HTML report

Every run also generates a report via `utils/CustomReporter.ts` at `tta-report/index.html` (redirects to the latest timestamped run; `tta-report/history.html` lists past runs).

### Allure report

Allure results are written to `allure-results/`. Viewing them requires the [Allure commandline tool](https://allurereport.org/docs/install/) (`brew install allure` on macOS), then:

```bash
allure serve allure-results/
```

### Session-based tests (`04_Session_Storage`, `05_Allure_Reporting`)

These rely on a saved `user-session.json` (gitignored, not committed). Generate it first:

```bash
npx ts-node tests/04_Session_Storage/247_SessionStorage.spec.ts
```

Then run the dependent specs normally with `npx playwright test`.
