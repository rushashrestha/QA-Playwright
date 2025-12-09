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

test("DELETE: removing a booking", async ({ request }) => {
  const response = await request.delete("/booking/3", {
    headers: {
      'Cookie': `token=${token}`,
      "Content-Type": "application/json",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.statusText()).toBe("Created");
});
