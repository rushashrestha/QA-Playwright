import { expect, test } from '@playwright/test';
import { HomePage } from './pages/HomePage.js';
import { LoginPage } from './pages/LoginPage.js';

test('Task 2: Login', async({page})=>{
    const homePage = new HomePage(page);
    const login = new LoginPage(page);

    await homePage.navigate();
    await login.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
    console.log("Logged in")
});