import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Download Code', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://qajobfit.com/auth');

    });
    test('Verify the download button functionality and file is saved', async ({ page }) => {
        await page.locator('input[name="email"]').fill('shivanianand90@gmail.com');
        await page.locator('input[name="password"]').fill('Shivani@1');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForTimeout(5000);
        //  await page.locator("button[title = 'Close onboarding for this session' ]").click();
        await page.locator('[data-sidebar="menu-item"]').getByRole('link', { name: 'Resume Studio' }).click();


        const [staticDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByRole("button", { name: "PDF" }).click()
        ]);

        const filePath = path.join('output', staticDownload.suggestedFilename());
        await staticDownload.saveAs(filePath);
        await page.pause();
    });



});