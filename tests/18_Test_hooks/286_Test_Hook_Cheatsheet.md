# Playwright Test Hooks — Cheatsheet

| Hook / Method | What | Example |
|---|---|---|
| `test.beforeAll` | Runs once before all tests in a file/describe. | `test.beforeAll(async () => { ... });` |
| `test.afterAll` | Runs once after all tests in a file/describe. | `test.afterAll(async () => { ... });` |
| `test.beforeEach` | Runs before every test. | `test.beforeEach(async ({ page }) => { await page.goto(URL); });` |
| `test.afterEach` | Runs after every test. | `test.afterEach(async ({ page }) => { ... });` |
| `test.skip()` | Skip a test conditionally. | `test.skip(browserName === 'firefox', 'not supported');` |
| `test.slow()` | Triple the timeout for a test. | `test.slow(browserName === 'firefox', 'slow on ff');` |
| `test.fixme()` | Mark test as broken, skip it. | `test.fixme('broken in Safari', async ({ page }) => {...});` |
| `test.fail()` | Mark test as expected to fail. | `test.fail(); // inside test body` |
| `test.describe()` | Group related tests. | `test.describe('Login', () => { ... });` |
| `test.step()` | Label a step inside a test for reporting. | `await test.step('fill form', async () => { ... });` |

## Execution Order

| Step | Hook |
|---|---|
| 1 | `beforeAll` |
| 2 | `beforeEach` |
| 3 | Test |
| 4 | `afterEach` |
| 5 | *(repeat 2-4 per test)* |
| 6 | `afterAll` |
