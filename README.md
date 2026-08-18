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
  - `12_Handle_SVG/` — locating and interacting with SVG elements: `271_SVG.spec.ts` clicks an inline SVG search icon on Flipkart and reads back the resulting product titles via XPath; `Task_July24.spec.ts` — practice spec that searches Flipkart for "macmini", collects titles/prices via XPath, and finds the cheapest Apple-branded listing; `272_SVG_Practice.spec.ts` clicks an SVG circle shape and a bar-chart filter, then reads each bar's `data-quarter`/`height` attributes; `273_Advance_SVG.spec.ts` and `Task_27July.spec.ts` click a specific Indian state on an SVG country map — by matching a class-name substring, and by looking up the state's code from a name→code object, respectively
  - `13_Shadow_DOM/` — `274_Shadow_DOM.spec.ts` fills and submits two separate shadow-DOM card forms via `data-testid` locators, and exercises a shadow-DOM counter widget with repeated increment clicks
  - `14_FileUpload/` — `275_File_Upload.spec.ts` uploads a single file via `setInputFiles` with a file path and asserts the success message/filename (the-internet.herokuapp.com); `276_Multiple_File_Upload.spec.ts` uploads multiple in-memory files (via `Buffer.from`) to a PatternFly multi-file-upload widget and asserts the upload-count message; `Task1_29Jul.spec.ts` — practice spec uploading a profile image (`setInputFiles`) on thetestingacademy.com's account settings page
  - `15_File_Download/` — `277_File_Download.spec.ts` captures a `download` event via `page.waitForEvent('download')` and saves it with `download.saveAs()` (thetestingacademy.com upload/download widget); `Task2_29JUly.spec.ts` — practice spec logging into qajobfit.com and downloading a generated resume PDF the same way
  - `16_Scroll_toElement/` — `278_ScrollToView.spec.ts` covers scrolling: `locator.scrollIntoViewIfNeeded()`, manual `window.scrollBy`/`scrollTo` via `page.evaluate`, and polling (`expect.poll`) for a lazy-loaded list to grow past its initial item count once scrolled into view
  - `17_Expect_Assertions/` — `279_Expect.spec.js` — value assertions (`toBe`, `toBeTruthy`, `toBeNull`, `toBeGreaterThan`, `toEqual`); `280_Expect.spec.ts` — locator assertions (`toBeVisible`, `toContainText`, `toHaveAttribute`, `toHaveCount`); `281_Expect.spec.ts` — soft vs. hard assertions (`expect.soft` records and continues, a failed hard assertion halts the test) and negation (`.not`); `282_Project.spec.ts` — visible/enabled/checked locator assertions plus page-level `toHaveTitle`; `283_Expect.cheatsheet.md` — full `expect` API reference (value/locator/page/API-response assertions, modifiers, interview Q&A)
  - `18_Test_hooks/` — `284_Test_Hook.spec.ts` — conditional `test.skip`/`test.slow` by `browserName`, `test.fixme`, and `test.fail`; `287_Group.spec.ts` — `test.step` to label sub-steps within a test for reporting; `288_Before_After.spec.ts` — `test.beforeAll`/`afterAll`/`beforeEach`/`afterEach` lifecycle, screenshotting on failure via `testInfo.status`; `289_TestDescribe.spec.ts` — `test.describe.serial` for tests that must run in order vs. standalone parallel tests; `290_TestPriority.spec.ts` — naming/tagging convention for prioritizing and filtering tests (`@p1`, `@smoke`); `285_Chrome_Arg_List.md` — reference of Chromium launch args (`--no-sandbox`, `--disable-gpu`, etc.) grouped by use case; `286_Test_Hook_Cheatsheet.md` — hook reference and execution order (`beforeAll` → `beforeEach` → test → `afterEach` → `afterAll`)
  - `19_Data_Driven_Testing/` — sourcing test data from different formats/stores and looping `test()` (or `test.step`) over it: `291_DDT.spec.ts` — inline array of objects; `292_TestData.json`/`293_Users.json` with `294_LoginTest.spec.ts`/`296_DDT_JSON_Array.spec.ts` — reading JSON via `import` vs. `fs.readFileSync`; `295_Read_Write_FileSystem.ts` — standalone `fs.readFileSync`/`writeFileSync` script (not a test); `297_DDT_CSV.spec.ts` — hand-rolled CSV parsing (`util/csvReader.ts`); `298_JSON_DDT.spec.ts` — JSON-driven registration data; `299_YAML_DDT.spec.ts` — YAML via `js-yaml` (`util/yamlReader.ts`); `300_MySQL_DDT.spec.ts` — data queried from a MySQL table via `mysql2/promise` (`util/mysqlReader.ts`, seed script `test-data/300_registration-data.sql`); `301_XLSX_DDT.spec.ts` — data read from an `.xlsx` workbook via `exceljs` (`util/xlsxReader.ts`). Since MySQL/XLSX reads are async, those two specs fetch in `beforeAll` and drive rows through `test.step` inside a single test rather than generating one `test()` per row like the sync (JSON/YAML/CSV) specs do; `302_DDT_FakerJS.spec.ts`/`303_DDT_FakerJS_Advance.spec.ts`/`304_DDT_FakeJS.spec.ts` — data generated at runtime with `@faker-js/faker` instead of read from a fixture: a basic single-user template, a `generateUser()` helper returning a full profile object, and a loop generating and registering multiple random users with per-user email domains
  - `20_Page_Object_Model/` — Page Object Model pattern: `305_NoPOM.spec.ts` — a login test with locators/data inlined directly in the spec, for contrast; `306_POM.spec.ts` — the same flow using a page object (`LoginPage.ts`) and Faker-generated credentials; `LoginPage.ts` — page object exposing login locators/actions; `LoginSnapLocator.ts`/`inventory.ts` — additional page objects (login and inventory-page locators) built with `getByTestId`/role/text locator fallback chains
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
