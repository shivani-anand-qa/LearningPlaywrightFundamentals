import { test, expect } from '@playwright/test'
import { log } from 'node:console';

test('Basic verify how to handle multiple elements', async ({ page }) => {


    await page.goto("https://awesomeqa.com/webtable1.html");

    // //table[@summary ='Sample Table']/tbody/tr - xpath
    // table[summary ='Sample Table'] tbody tr - css
    const rows = page.locator("table[summary ='Sample Table'] tbody tr");
    console.log(rows);

    const rowCount = await rows.count();
    console.log(rowCount);

    for (let i = 0; i <= rowCount; i++) {
        const rowData = await rows.nth(i).locator('td').allInnerTexts();
        console.log(`Row ${i + 1}: `, rowData);

    }

});