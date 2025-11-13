import { test, expect } from "@playwright/test";

test("Login to Swag Labs", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle(/Swag Labs/);

  const usernameInput = page.locator('input[data-test="username"]');
  await usernameInput.fill("standard_user");

  const passwordInput = page.locator('input[data-test="password"]');
  await passwordInput.fill("secret_sauce");

  const LoginButton = page.locator('input[data-test="login-button"]');
  await LoginButton.click();

  await expect(page).toHaveTitle(/Swag Labs/);
});
