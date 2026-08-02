import { test, expect } from '@playwright/test';
import { log } from 'console';


test('Verify the email id of a user', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");


    let pageCount = 3;
    let emailsarr = [];
    for (let p = 1; p <= pageCount; p++) {
        let email = await page.locator('#employees-tbody tr td[data-col="email"]').allInnerTexts();
        console.log(email);

        if (await page.locator("#next-page").isEnabled()) {
            await page.locator("#next-page").click();
        }
        emailsarr.push(...email);
    }



});