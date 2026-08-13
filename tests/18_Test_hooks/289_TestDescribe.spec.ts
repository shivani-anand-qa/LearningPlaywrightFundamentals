import { test, expect } from '@playwright/test';


//These run sequentially
test.describe.serial('Checkout suite - must  run in order', () => {
    test('open landing', async () => { console.log('1') });
    test('search product', async () => { console.log('2') });
    test('add to cart', async () => { console.log('3') });
    test('go to checkout', async () => { console.log('4') });
});
// These two run in parallel — independent of the serial suite above.
test('standAlone A', async () => { console.log('A') });
test('standAlone B', async () => { console.log('B') });
