import { test, expect } from "@playwright/test";
import { URLs } from "./fixtures/URLs.js";
import { validator } from "./helpers/apiHelpers.js";
let api;
let token;

const bookingId = 8;
const patchURL = `${URLs.bookingURL}/${bookingId}`;

const payload = {
  firstname: "updatedFirstName3",
  lastname: "updatedLastName3",
};

test.beforeEach(async ({ request }) => {
  api = new validator();
  token = await api.auth(request);
});

test("PATCH: Updating a resource partially", async ({ request }) => {
  const response = await request.patch(patchURL, {
    headers: await api.getAuthHeaders(token),
    data: payload,
  });

  console.log("PATCH Response Status:", response.status());
  console.log("PATCH Response Headers:", response.headers());

  await api.statusValidation(response);
  const responseBody = await api.validateResponseBody(response);
  expect(responseBody.firstname).toBe(payload.firstname);
  expect(responseBody.lastname).toBe(payload.lastname);
});

test("GET: verify the booking was updated", async ({ request }) => {
  const response = await request.get(patchURL);
  await api.statusValidation(response);
  const responseBody = await api.validateResponseBody(response);
  expect(responseBody.firstname).toBe(payload.firstname);
  expect(responseBody.lastname).toBe(payload.lastname);
});
