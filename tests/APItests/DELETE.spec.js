import { test, expect } from "@playwright/test";
import { URLs } from "./fixtures/URLs.js";
import { validator } from './helpers/apiHelpers.js';
let api;

test.beforeEach(async ({}) => {
    api = new validator();
});

let token;

const bookingURL = URLs.bookingURL;
const bookingId = 10;
const deleteURL = `${bookingURL}/${bookingId}`;

test.beforeEach(async ({ request }) => {
  token = await api.auth(request);
});

test("DELETE: removing a booking", async ({ request }) => {
  const response = await request.delete(deleteURL, {
    headers: {
      'Cookie': `token=${token}`,
      "Content-Type": "application/json",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.statusText()).toBe("Created");
});
