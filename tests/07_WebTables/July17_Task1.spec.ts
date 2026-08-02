import { test, expect } from '@playwright/test';


test('Verify Webtables', async ({ page }) => {
    let url = "https://app.thetestingacademy.com/playwright/multiple_element_filter?email=addasda@adsd.com&password=dasdadasda&remember=yes#login-success";
    let emailId = "shivaniqa1@gmail.com";
    let pass = "test";
    // https://app.thetestingacademy.com/playwright/multiple_element_filter?email=sdfsdf%40cfgdf&password=fsdfsdfsd&remember=yes#login-success
    // https://app.thetestingacademy.com/playwright/multiple_element_filter?email=shivaniqa%40gmail.com&password=test&remember=yes#login-success

    await page.goto(url);

    await page.getByRole('textbox', { name: 'email' }).fill(emailId);
    await page.getByRole('textbox', { name: 'password' }).fill(pass);
    await page.getByRole("checkbox", { name: 'remember' }).check();
    await page.getByTestId('login-button').click();

    let actual_URL = page.url();
    console.log(url);
    console.log(actual_URL);
    expect(actual_URL).toBe(`https://app.thetestingacademy.com/playwright/multiple_element_filter?email=${emailId}&password=${pass}&remember=yes#login-success`);

});