import { test, Page, Locator, expect } from '@playwright/test';
import { log } from 'console';

async function findRowByName(page: Page, name: string): Promise<Locator> {
    while (true) {
        const row = page.locator('#employees-tbody tr').filter({ hasText: name });
        if (await row.count()) {
            return row;
        }

        let next = page.locator("#next-page");
        if (await next.isDisabled()) {
            console.log("Row not found");
            break;
        }
        await next.click();
    }
}

test('Verify the email id of a user', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    let name = 'Mia Hoffmann';
    const row = await findRowByName(page, name);
    const email = await row.locator('td[data-col="email"]').innerText();
    console.log(`${name} emailaddress is ${email}`);
    await page.waitForTimeout(5000);
});