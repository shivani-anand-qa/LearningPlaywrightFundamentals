import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Scroll to Element-TestingAcademy', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');
    });

    test('scroll to view', async ({ page }) => {

        //1. ScrollIntoViewIfNeeded - Playwright does the scroll automatically
        await page.getByTestId('deep-anchor').scrollIntoViewIfNeeded();
        await page.getByTestId('deep-anchor').click();

        //2. ScrollBy 1000px
        //page.evaluate - this can execute a JS Code
        await page.evaluate(() => window.scrollBy(0, 1000));

        //3. Jump to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.getByTestId('cta-button')).toBeEnabled();

        //4 Jump back to top
        await page.evaluate(() => window.scrollTo(0, 0));

        //5 Lazy list grows past 10 once visible

        await page.getByTestId('section-lazy').scrollIntoViewIfNeeded();

        await page.getByTestId('lazy-list').scrollIntoViewIfNeeded();


        const list = page.getByTestId('lazy-list').locator('li');
        const initialCount = await list.count();

        // scroll the LAST existing item into view — item 11 does not exist yet,
        // so nth(10) would just wait until the test times out.
        await list.last().scrollIntoViewIfNeeded();
        // poll untill the new items appened.

        await expect.poll(async () => list.count(), {
            message: 'expected items > 10',
            timeout: 10_000
        }).toBeGreaterThan(initialCount);

        const finalCount = await list.count();
        console.log(finalCount);


    })



})