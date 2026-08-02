import { test, expect } from '@playwright/test';


test('Verify Element by Filter', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    const forgotpass_button = await page.locator("a.list-group-item")
        .filter({ hasText: 'Forgotten Password' });
    await forgotpass_button.click();
    // await page.pause();


    // Order" vs "Order History
    //  /^Order/

    const accountLinks = page.locator('a.list-group-item');
    await expect(accountLinks).toHaveCount(13);


    const privacyLink = page.locator('footer a').filter({ hasText: 'Privacy Policy' });
    await expect(privacyLink).toHaveAttribute('href', '#privacy-policy');


});