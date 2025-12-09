//POST request with static data from JSON file

const { test, expect } = require('@playwright/test');
const bookingDetails = require('./fixtures/test-data.json');

test('creating a booking', async ({ request }) => {
    //making a post request to endpoint /booking
     const response = await request.post("/booking", {
        //payload 
        data: bookingDetails
    });
    //assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    console.log(responseBody);
    expect(responseBody.booking).toHaveProperty("firstname", "Rusha");
    expect(responseBody.booking).toHaveProperty("lastname", "Shrestha");
    expect(responseBody.booking).toHaveProperty("totalprice", 111);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);
});