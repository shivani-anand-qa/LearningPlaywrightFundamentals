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
  - `08_Web_Select_Frames_Iframe/` — dropdown/select handling: `259_Select.spec.ts` uses a native `<select>` via `selectOption`; `260_Custom_dropDown.spec.ts` drives custom (non-native) listbox-style dropdowns via `getByRole('option')`; `261_Advance_Select_Pro.spec.ts` covers a react-select-style widget (single, multi with tag removal, creatable, grouped, and async/searchable selects); `July_20_Task1.spec.ts` — practice spec against SpiceJet's origin/destination search-and-select dropdowns
  - `09_Frame_Iframe/` — iframe handling with `frameLocator`: single frame (`262_iframe.spec.ts`), a page split into a frameset with multiple named frames (`263_iframeSet.spec.ts`), and nested/chained iframes (`264_Iframe_part2.spec.ts`)
  - `10_Keyboard_Hover_Drag_Drop/` — `page.keyboard`/`page.mouse` APIs, hover, and drag-and-drop: key presses/combinations and screenshots (`265_keyboard.spec.ts`), hover-triggered nav menus (`266_SpiceJet_Hover.spec.ts`, `Task_July22.spec.ts`), `locator.dragTo()` (`267_Drag_Drop.spec.ts`), manual `mouse.move/down/up` drag-and-drop with a documented site-specific workaround (`268_Advance_Drag_Drop.spec.ts`), and right-click context menus (`269_Context_Menu.spec.ts`); `learning.md` has reference notes on both APIs
  - `11_JS_Alerts/` — native `window.alert`/`confirm`/`prompt` dialogs via the `dialog` event (`270_JS.spec.ts`)
  - `12_Handle_SVG/` — locating and interacting with SVG elements: `271_SVG.spec.ts` clicks an inline SVG search icon on Flipkart and reads back the resulting product titles via XPath
  - `Template.spec.ts` — starter template for new specs
- `utils/CustomReporter.ts` — custom Playwright reporter that generates a self-contained, filterable HTML report (`Custom-Report Results/`) with per-step screenshots, console logs, video, and trace links
- `playwright.config.ts` — Playwright configuration (Firefox and WebKit projects currently disabled; Chromium only). Runs headed with `viewport: null` and `--window-size=1920,1080` so the page fills the actual browser window; the `chromium` project re-asserts `viewport: null` and clears `deviceScaleFactor` since the `Desktop Chrome` device preset would otherwise override both. Reporters: `line` and the custom reporter above (Allure disabled for now)
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
