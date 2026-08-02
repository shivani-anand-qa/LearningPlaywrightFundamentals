import { test, expect } from '@playwright/test';

test('Verify the email id of a user', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    let name = 'Yoshi Tannamuri';
    const row = page.locator("//table[@id ='companies-table']/tbody/tr").filter({ hasText: name });
    const country = await row.locator('td[data-col="country"]').innerText();
    console.log(`${name} lives in ${country}`);
    await page.waitForTimeout(5000);
});