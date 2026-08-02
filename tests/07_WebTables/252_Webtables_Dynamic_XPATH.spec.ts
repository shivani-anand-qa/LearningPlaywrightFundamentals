import { test, expect } from '@playwright/test'
import { log } from 'node:console';

test('Basic verify how to handle WebTables', async ({ page }) => {


    await page.goto("https://awesomeqa.com/webtable.html");

    // //table[@id = 'customers']/tbody/tr[5]/td[2]
    // 5 - i , 1 to 7 ( 1 header) 2 to 7
    // ]/td[
    // 2 - j , j -> 1,2,3
    // ]
    const firstpart = "//table[@id = 'customers']/tbody/tr[";
    const secpart = "]/td[";
    const thirdpart = "]";

    for (let i = 2; i <= 7; i++) {
        for (let j = 1; j <= 3; j++) {
            let dynamic_xpath = `${firstpart}${i}${secpart}${j}${thirdpart}`;
            console.log(dynamic_xpath);
            let locatorText = await page.locator(dynamic_xpath).innerText();
            console.log(locatorText);
            if (locatorText.includes("Helen Bennett")) {
                const countrypath_locator = `${dynamic_xpath}/following-sibling::td`
                const countrytext = await page.locator(countrypath_locator).innerText();
                console.log("-----")
                console.log(`${locatorText} is in ${countrytext}`);

            }
        }

    }
});