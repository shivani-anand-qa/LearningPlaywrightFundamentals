import { test, expect } from '@playwright/test'

test('Verify error message by entering invalid email', async ({ page }) => {

    await page.goto("https://vwo.com/free-trial/?utm_medium=website&utm_source=login-page&utm_campaign=mof_eg_loginpage");
    await page.getByRole('textbox', { name: "email" }).fill("abcd");
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: "Create a Free Trial Account" }).click();

    let error_message = await page.locator("//div[contains(@class,'invalid-reason')]").first().textContent();
    expect(error_message).toContain("The email address you entered is incorrect.");

});




