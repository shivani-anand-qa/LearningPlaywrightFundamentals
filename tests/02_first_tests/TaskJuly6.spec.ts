import { test, expect } from '@playwright/test';


test('Verify two different context', async ({ browser }) => {
    let ttcartContext = await browser.newContext();
    let cartPage = await ttcartContext.newPage();


    let ttabankContext = await browser.newContext();
    let bankPage = await ttabankContext.newPage();

    await cartPage.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    await bankPage.goto("https://tta-bank-digital-973242068062.us-west1.run.app/");
    console.log("TTA Cart: ", cartPage.url());
    console.log("Bank: ", bankPage.url());
    await ttcartContext.close();
    await ttabankContext.close();

})