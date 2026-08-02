import { test, expect } from '@playwright/test';


test('Verify Webtables', async ({ page }) => {

    page.goto("https://awesomeqa.com/hr/web/index.php/auth/login");
    //div[@class ='oxd-table-body']//div[contains(text(), 'Terminated')]/parent::div/following-sibling::div[3]/div/button[1]
    await page.getByRole('textbox', { name: 'username' }).fill('admin');
    await page.getByRole('textbox', { name: 'password' }).fill('Awesomeqa@4321');
    await page.locator('button.oxd-button').click();

    await page.locator("//div[@class ='oxd-table-body']//div[contains(text(), 'Terminated')]/parent::div/following-sibling::div[3]/div/button[1]").click();
    await page.pause();
});