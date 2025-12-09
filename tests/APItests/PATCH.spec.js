import { test, expect } from "@playwright/test";

let token;

test.beforeAll(async ({ request }) => {
  const authResponse = await request.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
  });
  const authBody = await authResponse.json();
  token = authBody.token;
  console.log("Authentication token:", token);
});

test("PATCH: Updating a resource partially", async ({ request }) => {
  const response = await request.patch("/booking/3", {  
    headers: {
      'Cookie': `token=${token}`,
      'Content-Type': 'application/json'  
    },
    data: {
      firstname: "UpdatedFirstName1",
      lastname: "UpdatedLastName1",
    },
  });

  console.log("PATCH Response Status:", response.status());
  console.log("PATCH Response Headers:", response.headers());
  
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();
  console.log("PATCH Response Body:", responseBody);
  expect(responseBody).toHaveProperty("firstname", "UpdatedFirstName1");
  expect(responseBody).toHaveProperty("lastname", "UpdatedLastName1");
});

test('GET: verify the booking was updated', async ({ request }) => {
  const response = await request.get('/booking/3');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log('GET Response after update:', responseBody);
  expect(responseBody.firstname).toBe("UpdatedFirstName1");
  expect(responseBody.lastname).toBe("UpdatedLastName1");
});