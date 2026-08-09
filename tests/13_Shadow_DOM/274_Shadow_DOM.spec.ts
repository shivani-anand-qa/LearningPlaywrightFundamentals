import { test, expect, Locator } from '@playwright/test';

const URL = 'https://app.thetestingacademy.com/playwright/widgets/shadow-dom'; // replace with target page

test.describe('Shadow handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });


    test('Locate Shadow DOM and Assert Visible', async ({ page }) => {

        const card1 = page.locator('[data-testid="card-account-card"]');
        await card1.locator('[data-testid="card-account-email"]').fill("shivani");
        await card1.locator('[data-testid="card-account-password"]').fill("shivani");
        await card1.locator('[data-testid="card-account-submit"]').click();
        // await expect(page.getByTestId('card-account-status')).toContainText('student@thetestingacademy.com');

        const countCart = page.getByTestId('counter-cart');
        await countCart.getByRole('button', { name: 'Increment' }).click();
        await countCart.getByRole('button', { name: 'Increment' }).click();
        let count1 = await countCart.getByTestId('counter-value').innerText();
        console.log(count1);
        await expect(countCart.getByTestId('counter-value')).toHaveText('5');

        const card2 = page.locator('[data-testid="card-inside"]');
        await card2.locator('[data-testid="card-inside-email"]').fill("shivani");
        await card2.locator('[data-testid="card-inside-password"]').fill("shivani");
        await card2.locator('[data-testid="card-inside-submit"]').click();

        await page.pause();
    });

});