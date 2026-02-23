import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';


test('Inventory tests', async({page})=>{
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);


    await home.navigate();
    await login.login("standard_user", "secret_sauce");
    await inventory.getItemCount();
    await inventory.addItemToCart(0);
    await expect(await inventory.getCartBadge()).toHaveText('1');
});