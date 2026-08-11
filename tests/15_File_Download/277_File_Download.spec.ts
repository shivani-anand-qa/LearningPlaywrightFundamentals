import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Download Code', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/upload-download');
    });

    test('Verify the download button functionality and file is saved', async ({ page }) => {

        // Event happned, we need to capture, similar to the JS Alert. 
        const [staticDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-static').click()
        ]);

        const filePath = path.join('output', staticDownload.suggestedFilename());
        await staticDownload.saveAs(filePath);

    });

});
