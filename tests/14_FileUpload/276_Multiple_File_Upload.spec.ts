import { test, expect, Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/'; // replace with target page

test.describe('FileUpload handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });


    test('Locate FileUpload and upload', async ({ page }) => {
        const file1Buffer = Buffer.from('text from tta');
        const file2Buffer = Buffer.from('about the file');

        await page.locator("div.pf-v6-c-multiple-file-upload input[type='file']").setInputFiles(
            [{
                name: 'file1.jpg',
                mimeType: 'image/jpeg',
                buffer: file1Buffer
            },
            {
                name: 'file2.png',
                mimeType: 'image/png',
                buffer: file2Buffer
            }
            ]);

        await expect(page.getByText('2 of 2 files uploaded')).toBeVisible();

        await page.pause();
    });

});
