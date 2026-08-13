import { test, expect } from '@playwright/test';

test.describe('Expected Assertion', () => {


    test('1 Verification', async () => {
        // page fixture, we will inject the page direclty into the test
        // fixture, before running the test
        // BrowserContext, Browser, Page was created. 

        // BCP Automaitically done - page fixture which you can use automatically
        expect(1 + 2).toBe(3);
        // expect(actual).toBe(expected)
        let ac = false;
        expect(ac).toBeFalsy();
        expect(true).toBeTruthy();
        expect(null).toBeNull();
        expect(34).toBeGreaterThan(11);
        expect([1, 2, 3]).toEqual([1, 2, 3]);
        expect({ role: 'admin' }).toEqual({ role: 'admin' });
        expect({ age: 20, role: 'admin' }).toEqual({ role: 'admin', age: 20 });



    })
})