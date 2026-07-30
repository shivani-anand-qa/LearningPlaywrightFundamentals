import { test, expect } from '@playwright/test';


test('Verify cura website', async ({ page }) => {

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    let makeAppointment_button = page.locator('xpath=//a[@id="btn-make-appointment"]');
    let username_label = page.locator('xpath=//input[@aria-describedby="demo_username_label"]');
    let password_label = page.locator('xpath=//input[@aria-describedby="demo_password_label"]');
    let username_textbox = page.locator('xpath=//input[@id = "txt-username"]');
    let password_textbox = page.locator('xpath=//input[@id = "txt-password"]');
    let login_button = page.locator('xpath = //button[@id = "btn-login"]');
    let facility_dropdown = page.locator("#combo_facility");
    let readmission_checkbox = page.locator("#chk_hospotal_readmission");
    let program_radioButton = page.locator("#radio_program_medicaid");
    let visitdate_cal = page.locator("#txt_visit_date");
    let comment_textArea = page.locator("#txt_comment");
    let bookappt_button = page.locator("#btn-book-appointment");


    await makeAppointment_button.click();
    let username = await username_label.inputValue()
    await username_textbox.fill(username);

    let password = await password_label.inputValue()
    await password_textbox.fill(password);

    await login_button.click();

    await facility_dropdown.selectOption('Seoul CURA Healthcare Center');
    await readmission_checkbox.check();
    await program_radioButton.click();
    await visitdate_cal.click();
    await visitdate_cal.pressSequentially('26/07/2026', { delay: 50 });
    await comment_textArea.fill("This is a test message");
    await bookappt_button.click();




});

