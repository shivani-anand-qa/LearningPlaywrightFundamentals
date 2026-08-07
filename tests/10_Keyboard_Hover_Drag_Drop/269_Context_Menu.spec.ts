import { test, expect } from '@playwright/test'
import { log } from 'console';

test('Verify context click', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/widgets/context-menu');
    await page.locator('[data-testid="ctx-target"]').first().click({ button: 'right' });


    const allOptions: string[] = await page.locator('ul.context-menu-list span').allInnerTexts();
    console.log(allOptions);


    await page.getByText('Copy', { exact: true }).first().click();



    await page.pause();
});