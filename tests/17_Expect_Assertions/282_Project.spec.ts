import { test, expect } from '@playwright/test';

test('Visible  · enabled · disabled · checked', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice.html');
    let automationCheckbox = page.getByRole('checkbox', { name: /UFT/ });
    // await automationCheckbox.check();
    await expect(automationCheckbox).not.toBeChecked();


    let submitBtn = page.getByTestId('profile-submit');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();

    await expect(page).toHaveTitle(/QA Profile/);

    let appUrl = page.url;
    expect(appUrl).toContain('thetestingacademy');

    await page.pause();


});