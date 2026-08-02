import { test, expect } from '@playwright/test';


test('Verify select drop down', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");
    await page.getByTestId('lang-trigger').click();
    await page.getByRole('option', { name: 'JavaScript' }).click();

    await page.getByTestId('framework-trigger').click();
    await page.getByRole('option', { name: 'Vue' }).click();


    await page.getByTestId('experience-trigger').click();
    await page.getByText('Mid-level (4-6 years)', { exact: true }).click();
    await page.pause();
});











