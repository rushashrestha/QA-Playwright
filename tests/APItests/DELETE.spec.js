import { test } from "@playwright/test";
import { URLs } from "./fixtures/URLs.js";
import { validator } from "./helpers/apiHelpers.js";
import { statusCode } from "./fixtures/statusCodes.js";
let api;

let token;

const bookingURL = URLs.bookingURL;
const bookingId = 14;
const deleteURL = `${bookingURL}/${bookingId}`;

test.beforeEach(async ({request}) => {
  api = new validator(request);
  token = await api.auth(request);
});

test("DELETE: removing a booking", async ({ request }) => {
  const response = await request.delete(deleteURL, {
    headers: await api.getAuthHeaders(token),
  });
  await api.statusValidation(response, statusCode.created);
});
