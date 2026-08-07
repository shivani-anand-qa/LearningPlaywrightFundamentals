import { test, expect, Locator } from '@playwright/test'
import { syncBuiltinESMExports } from 'node:module';


test("Verify drag and drop functionality", async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/widgets/dnd');
    //Method 1
    //  await page.locator("#card-write-spec").dragTo(page.locator("[data-testid='col-in-progress']"));
    // await page.getByText("Write Playwright spec for login").dragTo(page.locator("[data-testid='col-in-progress']"));

    //Method 2
    // await page.locator("#card-write-spec").dragTo(page.locator("[data-testid='col-in-progress']"),
    // { sourcePosition: { x: 10, y: 10 } }


    //Method 3
    // const card = page.locator("#card-write-spec");
    // const target = page.locator("[data-testid='col-in-progress']");

    // await card.hover();
    // await page.mouse.down();
    // await target.hover();
    // await page.mouse.up();


    //Method 4
    // Manual mouse path — for finicky DnD libraries
    //
    // Site bug: this widget's drop handler tracks the "dragged card" via
    // dragenter/hover events on whatever element the mouse passes over,
    // instead of locking onto the card from the original dragstart event.
    // A default/interpolated mouse.move (or dragTo) travels through sibling
    // cards in the source column on the way to the target column, and each
    // hover overwrites the site's internal "currently dragged" state — so
    // the card that actually gets dropped is whichever one the mouse last
    // brushed past, not the one you grabbed. Confirmed by reproducing with
    // plain mouse events: an interpolated multi-step move consistently
    // drops the wrong card, while a single-step jump (no intermediate
    // dragover events on siblings) drops the correct one.
    //
    // Workaround: use steps: 1 so no dragover fires on sibling cards.

    let source: Locator = page.locator('#card-write-spec');
    const sBox = (await source.boundingBox())!;

    // The empty "review" column div is CSS-stretched to match the tallest
    // column (8 cards in "To do"), so its own bounding box extends far
    // below the viewport. Using its vertical center as the drop point
    // aims the mouse off-screen. Drop just under the column header instead,
    // which stays on-screen regardless of how tall the column stretches.
    let target: Locator = page.locator('[data-status="review"] .column-head');
    const tBox = (await target.boundingBox())!;

    await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(tBox.x + tBox.width / 2, tBox.y + tBox.height + 20, { steps: 1 });
    await page.mouse.up();

    await expect(page.locator('[data-testid="col-review"]').locator('#card-write-spec')).toBeVisible();
    await page.pause();

});