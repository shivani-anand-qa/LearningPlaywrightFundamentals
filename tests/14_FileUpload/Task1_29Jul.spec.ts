import { test, expect } from '@playwright/test';
import path from 'path';

test('Verify file upload functionality', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/login');

    await page.getByPlaceholder('Enter your email address').fill("shivanianand90@gmail.com");
    await page.locator('.cl-internal-1pnppin').click();

    await page.pause();


    await page.locator("//button[@aria-label='Dismiss']").click();
    await page.getByText('Settings').click();

    const filePath = path.join(__dirname, 'download.jpeg');
    console.log('File path:', filePath);
    await page.setInputFiles('#avatar-upload', filePath);


    //await page.getByTestId('avatar-upload').click();
    await page.getByText('Save Changes').click();

    await page.pause();



});



