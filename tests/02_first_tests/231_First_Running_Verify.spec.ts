import { test, expect } from '@playwright/test';


test('Verify our first TC', async ({ page }) => {
 await page.goto('https://app.vwo.com/#/login');
 await expect(page).toHaveTitle('Login - Wingify');
 const logo_img = page.locator('#vow-login-logo');
 //id = 'vow-login-logo'
 //# is for css selector
 await expect(logo_img).toBeVisible();

});