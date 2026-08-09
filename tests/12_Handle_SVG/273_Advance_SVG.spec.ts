import { test, expect, Locator } from '@playwright/test';

const SimpleMaps = 'https://simplemaps.com/svg/country/in';

test.describe("Map Selection", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(SimpleMaps);
    });


    test('Verify the state selected is UP', async ({ page }) => {
        const states = await page.locator('//div[@id="admin1_map_inner"]//*[name() ="path" and contains(@class,"sm_state")]').all();

        for (let state of states) {
            let classState = await state.getAttribute("class");
            console.log(classState);
            if (classState.includes('INUP')) {
                state.click();
            }
        }
        await page.pause();
    })

});
