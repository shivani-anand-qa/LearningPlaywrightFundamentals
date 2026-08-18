import { Locator, Page } from '@playwright/test';

export class Loginpage {
    readonly page: Page;
    readonly itemTestAllthethingsTshirtRed: Locator;
    readonly addToCartTestAllthethings: Locator;
    readonly itemTtaBoltTshirtTitle: Locator;
    readonly addToCartTtaBolt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemTestAllthethingsTshirtRed = page.getByTestId("item-test-allthethings-tshirt-red-title-link").or(page.getByRole("link", { name: "Test.allTheThings() T-Shirt (Red)" })).or(page.getByText("Test.allTheThings() T-Shirt (Red)"));
        this.addToCartTestAllthethings = page.getByTestId("add-to-cart-test-allthethings-tshirt-red").or(page.getByRole("button", { name: "Add to cart" })).or(page.getByText("Add to cart"));
        this.itemTtaBoltTshirtTitle = page.getByTestId("item-tta-bolt-tshirt-title-link").or(page.getByRole("link", { name: "TTA Bolt T-Shirt" })).or(page.getByText("TTA Bolt T-Shirt"));
        this.addToCartTtaBolt = page.getByTestId("add-to-cart-tta-bolt-tshirt").or(page.getByRole("button", { name: "Add to cart" })).or(page.getByText("Add to cart"));
    }

    async goto() {
        await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/inventory");
    }
}
