import { test, expect } from '@playwright/test'

test('Verify error message by entering invalid email', async ({ page }) => {

    await page.goto("https://vwo.com/free-trial/?utm_medium=website&utm_source=login-page&utm_campaign=mof_eg_loginpage");
    await page.locator('#page-v1-step1-email').fill("abcd");
    await page.locator('#page-free-trial-step1-cu-gdpr-consent-checkbox').first().click();
    await page.locator('//button[@data-qa="page-su-submit"]').first().click();

    let error_message = await page.locator("//div[contains(@class,'invalid-reason')]").first().textContent();
    expect(error_message).toContain("The email address you entered is incorrect.");

});




