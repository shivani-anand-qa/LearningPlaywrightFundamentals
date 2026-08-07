import { test, expect } from '@playwright/test'


test("Verify drag and drop functionality", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const a = await page.locator("#column-a");
    const b = await page.locator("#column-b");

    await a.dragTo(b);
    await page.pause();

})