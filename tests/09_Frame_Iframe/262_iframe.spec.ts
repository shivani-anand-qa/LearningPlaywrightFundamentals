import { test, expect, FrameLocator } from '@playwright/test';


test('Verify frames on page', async ({ page }) => {

    page.goto("https://app.thetestingacademy.com/playwright/frames/");
    let vehicleframe: FrameLocator = await page.frameLocator("#frame-one");
    await vehicleframe.locator("#RESULT_TextField-1").fill('Hyundai i10');
    await vehicleframe.locator("#RESULT_TextField-2").fill('Shivani Anand');
    await vehicleframe.locator("#RESULT_TextField-3").fill('2012');
    await vehicleframe.locator("#RESULT_RadioButton-1").selectOption('Hatchback');

    await vehicleframe.locator("#RESULT_TextArea-1").fill('Amazing car with amazing family');
    await vehicleframe.locator("#vehicle-submit").click();
    let output = await vehicleframe.locator("#vehicle-output").innerText();
    console.log(output);

    await page.pause();



});