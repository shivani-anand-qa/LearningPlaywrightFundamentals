# Learning Playwright Fundamentals

A repository for learning and practicing test automation with [Playwright](https://playwright.dev/).

## Project Structure

- `tests/` — Playwright test specs
  - `01_Basics/` — first test, test annotations (`skip`, `only`, `fail`, `slow`, conditional skip)
  - `02_first_tests/` — Browser → Context → Page fundamentals: single/multiple contexts, multiple tabs, context options (locale, geolocation, device emulation), and fixture-based tests (`page`, `browser`)
  - `03_Locators_Commands/` — Locators & commands: `goto` `waitUntil`/referer options, `getByRole`, lazy/strict/auto-wait locator behavior, `pressSequentially`, and login/signup practice specs against VWO and Katalon Cura demo sites
  - `04_Session_Storage/` — reusing an authenticated session across tests: `247_SessionStorage.spec.ts` is a standalone script (run directly with `node`/`ts-node`, not via the test runner) that logs in once and saves `storageState` to `user-session.json`; `248_TestVWODashboard_NoCustomReport.spec.ts` loads that saved state to skip login
  - `05_Allure_Reporting/` — same saved-session pattern as above, structured with `test.step`/tags/attachments to exercise the Allure and custom HTML reporters
  - `06_Multiple_Element_/` — handling multiple matching elements: filtering a list of links by text vs. targeting one directly via `data-testid`
  - `07_WebTables/` — reading and iterating HTML tables with dynamic XPath/CSS locators, filtering rows by text, paginating through multi-page tables (loop-based and helper-function based), plus practice specs against login/filter and HR table UIs
  - `Template.spec.ts` — starter template for new specs
- `utils/CustomReporter.ts` — custom Playwright reporter that generates a self-contained, filterable HTML report (`Custom-Report Results/`) with per-step screenshots, console logs, video, and trace links
- `playwright.config.ts` — Playwright configuration (Firefox and WebKit projects currently disabled; Chromium only). Reporters: `line` and the custom reporter above (Allure disabled for now)
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

Every run also generates a report via `utils/CustomReporter.ts` at `Custom-Report Results/index.html` (redirects to the latest timestamped run; `Custom-Report Results/history.html` lists past runs).

### Allure report (currently disabled)

The `allure-playwright` reporter is commented out of `playwright.config.ts` for now, so Allure results are not generated. To re-enable: add `["allure-playwright"]` back to the `reporter` array, then after a run:

```bash
allure serve allure-results/
```

### Session-based tests (`04_Session_Storage`, `05_Allure_Reporting`)

These rely on a saved `user-session.json` (gitignored, not committed). Generate it first:

```bash
npx ts-node tests/04_Session_Storage/247_SessionStorage.spec.ts
```

Then run the dependent specs normally with `npx playwright test`.
