import { test, expect } from '@playwright/test';


test('Priority 1- TC01-Login should work', async ({ page }) => {
    await page.goto('https://app.vwo.com');
});


test('Priority 2-TC02-dashboard should open', async ({ page }) => {
    await page.goto('https://app.vwo.com');
});


test('Priority 3- Logout test', async ({ page }) => {
    await page.goto('https://app.vwo.com');
});


test('Login test @p1 @smoke', async ({ page }) => {
    await page.goto('https://app.vwo.com');
})


test('Login test @p2', async ({ page }) => {
    await page.goto('https://app.vwo.com');
});
