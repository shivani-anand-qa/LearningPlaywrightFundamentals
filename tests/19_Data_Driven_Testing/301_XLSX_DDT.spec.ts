import { test, expect } from '@playwright/test';
import path from 'path';
import { readXLSX, RegistrationData } from './util/xlsxReader';

test.describe('DDT XLSX', () => {
    let loginData: RegistrationData[] = [];

    test.beforeAll(async () => {
        loginData = await readXLSX(path.join(__dirname, '/test-data/301_registration-data.xlsx'));
    });

    test.afterEach(async ({ }, testInfo) => {
        console.log(`afterEach: ${testInfo.title} - status: ${testInfo.status}`);
    });

    // Data only exists once beforeAll resolves, so rows are driven inside one
    // test via test.step rather than generated as separate top-level tests.
    test('Login with data fetched from XLSX', async ({ page }) => {
        for (const data of loginData) {
            await test.step(`Login with: ${data.description}`, async () => {
                await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

                const textboxEmailAddress = page.getByRole("textbox", { name: "Email Address" });
                const textboxPassword = page.getByRole("textbox", { name: "Password" })
                    .or(page.locator("#password"))
                    .or(page.locator("[name =\"password\"]"));
                const buttonLogin = page.getByRole("button", { name: "Login to Practice Account" })
                    .or(page.getByTestId("login-button"))
                    .or(page.getByText("Login to Practice Account"));

                await textboxEmailAddress.fill(data.username);
                await textboxPassword.fill(data.password);
                await buttonLogin.click();
            });
        }
    });

});
