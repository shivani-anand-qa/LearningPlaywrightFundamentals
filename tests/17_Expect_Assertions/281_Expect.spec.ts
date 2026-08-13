import { test, expect } from '@playwright/test';

test.describe('Soft Assertions', () => {


    test('3 Soft Assertions & Negation', async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/tables/practice.html');
        let firstName = await page.getByTestId('first-name');

        //Soft Assertion: Each line records its own failure but test continues either way
        await expect.soft(firstName).toHaveAttribute('id', 'first-name');
        await expect.soft(firstName).toBeVisible();
        await expect.soft(firstName).toHaveValue('');

        //Hard - It halts the execution if it fails
        //Final hard assertion runs after he soft block
        await expect(firstName).toBeEnabled();
        //this line will not be executed if the above line fails
        await page.goto('https://app.thetestingacademy.com/playwright/webtable.html');
        await expect(page.locator('#error')).not.toBeVisible();

        let title = await page.title();
        expect(title).not.toContain('error');


    });
});