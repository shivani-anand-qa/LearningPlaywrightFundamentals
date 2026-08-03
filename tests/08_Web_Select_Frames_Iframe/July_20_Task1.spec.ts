import { test, expect } from '@playwright/test';


test('Verify select drop down', async ({ page }) => {

    await page.goto('https://www.spicejet.com/');
    await page.getByTestId('to-testID-origin').click();
    //  await page.pause();
    await page.getByTestId('to-testID-origin').getByRole('textbox').fill('Del');
    //  await page.pause();
    await page.getByTestId('to-testID-destination').getByRole('textbox').fill('Ben');
    await page.locator('div').filter({ hasText: /^Bengaluru$/ }).first().click();
    await page.pause();

});








