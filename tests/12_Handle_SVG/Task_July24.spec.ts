import { test, expect, Locator } from '@playwright/test';

test('Verify titles and cheapest macmini', async ({ page }) => {
    await page.goto('https://www.flipkart.com/search');
    await page.locator('[name="q"]').fill('macmini');
    await page.locator('button[type="submit"]').click();
    const titleLocator: Locator = page.locator('//div[starts-with(@data-id,"CPU") or starts-with(@data-id,"MPC" )]/div/a[2]');
    await page.waitForTimeout(5000);

    const allElements: String[] = await titleLocator.allInnerTexts();

    await page.waitForTimeout(5000);
    for (let element of allElements) {
        console.log(element);
    }

    const priceLocator: Locator = page.locator('//div[starts-with(@data-id,"CPU") or starts-with(@data-id,"MPC" )]/div/a[2]/following-sibling::a');

    const allPrices: String[] = await priceLocator.allInnerTexts();
    let lowestPrice = Infinity;
    let itemTitle;
    for (let i = 0; i < allElements.length; i++) {
        {
            if (allElements[i].startsWith("Apple")) {
                let price = Number(allPrices[i].replace(/[^0-9]/g, ""));
                if (price < lowestPrice) {
                    lowestPrice = price;
                    itemTitle = allElements[i];
                }

            }

        }
    }
    console.log("lowest price is: " + lowestPrice + " and item is:  " + itemTitle);
});