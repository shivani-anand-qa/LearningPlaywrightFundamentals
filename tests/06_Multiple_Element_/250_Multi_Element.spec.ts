import { test, expect } from '@playwright/test'
import { log } from 'node:console';
import { link } from 'node:fs';

test('Basic verify how to handle multiple elements', async ({ page }) => {

    // Navigate to the page.
    // Find the locator which gives all the elements and text
    // loop through it and find the one which we want to click

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    const button_labels: string[] = await page.locator("a.list-group-item").allInnerTexts();
    console.log(button_labels.length);

    for (let linkText of button_labels) {
        if (linkText === "Forgotten Password") {
            await page.getByText(linkText).first().click();
        }
    }

    const rightlinks = await page.locator('a.list-group-item').all();
    for (let link of rightlinks) {
        console.log(await link.getAttribute("href"));

    }
    for (let linkText of button_labels) {
        console.log(linkText);
    }

});


