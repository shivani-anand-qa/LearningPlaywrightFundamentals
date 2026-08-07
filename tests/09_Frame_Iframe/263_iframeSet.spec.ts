import { test, expect, FrameLocator, Locator } from '@playwright/test';


test('Verify frameSet', async ({ page }) => {

    page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames");

    let mainFrame: FrameLocator = await page.frameLocator("[name ='main']");
    const headerText = await mainFrame.locator("#main-heading").innerText();
    console.log(headerText);

    let sideFrame: FrameLocator = await page.frameLocator("[name ='side']");
    let footerFrame: FrameLocator = await page.frameLocator("[name ='footer']");

    let allFrames: Locator[] = await page.locator("//frame").all();
    console.log(allFrames);


    for (let frame of allFrames) {
        console.log(await frame.getAttribute('name'), ': ', await frame.getAttribute('src'));

    }

    await sideFrame.getByTestId('side-link-registration').click();
    await page.pause();



});