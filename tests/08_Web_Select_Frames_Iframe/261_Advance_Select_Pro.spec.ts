import { test, expect } from '@playwright/test';
import { escape } from 'node:querystring';


test('Verify select drop down', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes");
    await page.getByTestId('rs-single-input').click();
    await page.getByRole('option', { name: 'Cypress' }).click();


    await page.getByTestId('rs-multi-input').click();
    await page.getByRole('option', { name: 'Pytest' }).click();
    await page.getByRole('option', { name: 'JUnit' }).click();
    await page.getByRole('button', { name: 'Remove JUnit' }).click();
    await page.keyboard.press('Escape');


    await page.getByTestId('rs-creatable-input').click();
    await page.getByRole('option', { name: 'api-testing' }).click();
    await page.keyboard.press('Escape');


    await page.getByTestId('rs-grouped-input').click();
    await page.getByText('Azure', { exact: true }).click();


    await page.getByTestId('rs-async-input').fill('pun');
    await page.getByTestId('rs-async-input').click();
    await expect(page.getByTestId('rs-async-menu')).toContainText('Pune');
    await page.pause();
    await page.getByRole('option', { name: 'Pune' }).click();
    await page.pause();

});











