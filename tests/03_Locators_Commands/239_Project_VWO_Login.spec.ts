// https://app.vwo.com/#/login

import { test, expect } from '@playwright/test'

test("TC#1: Very login is not working and gives error with lazy, strict, and autowait concepts", async ({ page }) => {
    await page.goto("https://app.vwo.com/#/login");
    let username = page.locator("#login-username");
    let password = page.locator("#login-password");
    let signIn = page.locator("#js-login-btn");


    await username.fill("admin@admin.com");
    await password.fill("Tests");
    await signIn.click();

    let errorMessage = page.locator('#js-notification-box-msg');
    await expect(errorMessage).toContainText("Your email, password, IP address or location did not match");
})
