//POST request with static data from JSON file
import { test, expect } from '@playwright/test';
import bookingDetails from './fixtures/test-data.json' assert { type: 'json' };
import { URLs } from './fixtures/URLs.js';
import { validator } from './helpers/apiHelpers.js';
let api;

const bookingURL = URLs.bookingURL;

test.beforeEach(async ({}) => {
    api = new validator();
});

test('creating a booking', async ({ request }) => {
    //making a post request to endpoint /booking
     const response = await request.post(bookingURL, {
        //payload 
        data: bookingDetails
    });
    //assertions
    await api.statusValidation(response);
    const responseBody = await api.validateResponseBody(response);
    await api.validateBookingFields(responseBody.booking, bookingDetails);

});