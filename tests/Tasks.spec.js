import { test, expect } from '@playwright/test';

test('Task 1', async ({ page }) => {
    console.log('Task 1 executed');
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
    const title = await page.title();
    console.log('page title: ', title)
});

test('Task 2', async ({page}) =>{
    console.log('Task 2 executed');
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
    await page.close(); //closing the page with .close() method
    console.log('page closed');
});

test('Task 3', async ({page})=> {
    console.log('Task 3 executed');
    await page.goto('https://example.com');
    const h1 =  page.locator('h1');
    const header = await h1.textContent();
    const p =  page.locator('p').first();
    const para = await p.textContent();
    console.log('h1 and p located using locator()')
    console.log(header);  
    console.log(para);  
});

test('Taks 4', async ({page})=> {
    console.log('Task 4 executed');
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
    const link = page.locator('a');
    await link.click();
    await expect(page).toHaveURL(/iana.org/);
    console.log('Link clicked and navigated to iana.org');
});