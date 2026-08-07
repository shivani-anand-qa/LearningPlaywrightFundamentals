import { test, expect, Locator, FrameLocator } from '@playwright/test';


test('Verify frames', async ({ page }) => {

    await page.goto("https://selectorshub.com/iframe-scenario/");

    let frame1: FrameLocator = page.frameLocator("#pact1").first();
    await frame1.locator("#inp_val").fill("Aish");
    let header = await frame1.locator('h3').innerText();
    console.log(header);

    let frame2: FrameLocator = frame1.frameLocator("#pact2");
    await frame2.locator("#jex").fill("Pretty");


    let frame3: FrameLocator = frame2.frameLocator("#pact3");
    await frame3.locator("#glaf").fill("Sam");
    await page.pause();
}); 