import { test, expect } from '@playwright/test';

let token;

test.describe('Booking CRUD operations', () => {
    test.beforeAll(async ({ request }) => {
        //POST request to the endpoint /auth to generate the token to pass with the PUT request
        const authResponse = await request.post('/auth', {
            data: {
                username: "admin",
                password: "password123"
            }
        });
        const authBody = await authResponse.json();
        token = authBody.token;
        console.log('Authentication token:', token);
    });

    test('PUT: updating an existing booking with authentication', async ({ request }) => {
        const response = await request.put('/booking/2', {
            headers: {
                'Cookie': `token=${token}`
            },
            data: {
                firstname: "UpdatedFirstName",
                lastname: "UpdatedLastName",
                totalprice: 2222,
                depositpaid: true,
                bookingdates: {
                    checkin: "2024-02-01",
                    checkout: "2024-02-10"
                },
                additionalneeds: "lunch"
            }
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('PUT Response:', responseBody);
    });

    test('GET: verify the booking was updated', async ({ request }) => {
        const response = await request.get('/booking/2');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('GET Response after update:', responseBody);
        expect(responseBody.firstname).toBe("UpdatedFirstName");
        expect(responseBody.lastname).toBe("UpdatedLastName");
        expect(responseBody.totalprice).toBe(2222);
        expect(responseBody.bookingdates.checkin).toBe("2024-02-01");
        expect(responseBody.bookingdates.checkout).toBe("2024-02-10");
        expect(responseBody.additionalneeds).toBe("lunch");
    });
});