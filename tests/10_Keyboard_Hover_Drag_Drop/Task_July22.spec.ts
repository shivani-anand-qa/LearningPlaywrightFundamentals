import { test, expect } from '@playwright/test';

test('Verify hover menus', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu");
    await page.locator('[data-testid="nav-add-ons"]').hover();
    let menu: String[] = await page.getByLabel("Add-ons submenu").allInnerTexts();
    console.log(menu);
    await page.locator('[data-testid="nav-add-ons"]').hover();
    await page.locator('[data-testid="test-id-Wifi"]').click();
    await page.pause();
});


