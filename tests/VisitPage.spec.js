import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage.js';

test('Task 1: Visit Page', async ({ page })=>{
    const homePage = new HomePage(page);
    await homePage.navigate();
    console.log('Page visited successfully'); 
});