const { test, expect } = require('@playwright/test');

test('GET all booking IDs', async ({ request}) =>{
    const response = await request.get('/booking');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
})

test ('GET specific booking ID', async ({ request })=>{
    const response = await request.get('/booking/2');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
})

test('GET with filtered parameters', async ({ request })=>{
    const response = await request.get('/booking', {
        params:{//query parameters
            firstname: "Jim",//filter by firstname
            lastname: "Wilson"//filter by lastname
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
})

test('GET with filtered parameters 2', async ({ request })=>{
    const response = await request.get('/booking', {
        params: {
            totalprice: 111,
            depositpaid: true
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
})



test.afterAll(async ()=>{
    console.log('GET requests completed');
})