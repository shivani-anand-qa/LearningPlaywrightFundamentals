import { test, expect } from '@playwright/test';
import { log } from 'console';


test('Verify the email id of a user', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    let name = 'Camila Lopez';
    let row;
    while (true) {
        row = page.locator('#employees-tbody tr').filter({ hasText: name });
        if (await row.count()) {
            break;
        }
        else {

            let next = page.locator("#next-page");
            await next.click();
            if (await next.isDisabled()) {
                console.log("Row not found");

                break;
            }
        }
    }
    const email = await row.locator('td[data-col="email"]').innerText();
    const country = await row.locator('td[data-col="country"]').innerText();

    console.log(`${name} lives in ${country} and her emailaddress is ${email}`);


});