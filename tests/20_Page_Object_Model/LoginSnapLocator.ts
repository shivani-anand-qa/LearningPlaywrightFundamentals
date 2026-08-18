import { Locator, Page } from '@playwright/test';

export class Loginpage {
    readonly page: Page;
    readonly headingTtacart: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headingTtacart = page.getByRole("heading", { name: "TTACart" }).or(page.getByText("TTACart"));
        this.username = page.getByTestId("username").or(page.getByRole("textbox", { name: "Username" })).or(page.locator("#user-name"));
        this.password = page.getByTestId("password").or(page.getByRole("textbox", { name: "Password" })).or(page.locator("#password"));
        this.loginButton = page.getByTestId("login-button").or(page.getByRole("button", { name: "Login" })).or(page.locator("#login-button"));
    }

    async goto() {
        await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/inventory");
    }
}
