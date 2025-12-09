// POST request with dynamic data generation: faker

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

const firstname = faker.person.firstName()
const lastname = faker.person.lastName()
const totalprice = faker.number.int({ min: 1000, max: 9999 }); 
const currentDate = DateTime.now().toFormat('yyyy-MM-dd')
const checkoutDate = DateTime.now().plus({ days:5 }).toFormat('yyyy-MM-dd')

test('creating a booking with dynamic data', async({ request }) => {
    const response = await request.post('/booking', {
        //payload with dynamic data
        data: {
            firstname: firstname,
            lastname: lastname,
            totalprice: totalprice,
            depositpaid: true,
            bookingdates: {
                checkin: currentDate,
                checkout: checkoutDate
            },
            "additionalneeds": "Breakfast"
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.booking).toHaveProperty("firstname", firstname);
    expect(responseBody.booking).toHaveProperty("lastname", lastname);
    expect(responseBody.booking).toHaveProperty("totalprice", totalprice);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);

});