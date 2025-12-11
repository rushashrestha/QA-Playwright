import { test } from "@playwright/test";
import { URLs } from "./fixtures/URLs.js";
import { validator } from "./helpers/apiHelpers.js";
let api;

const bookingId = 9;
const putURL = `${URLs.bookingURL}/${bookingId}`;

const payload = {
  firstname: "UpdatedFirstName",
  lastname: "UpdatedLastName",
  totalprice: 2222,
  depositpaid: true,
  bookingdates: {
    checkin: "2024-02-01",
    checkout: "2024-02-10",
  },
  additionalneeds: "lunch",
};

let token;

test.describe("Booking CRUD operations", () => {
  test.beforeEach(async ({ request }) => {
    api = new validator();
    token = await api.auth(request);
  });
  test("PUT: updating an existing booking with authentication", async ({
    request,
  }) => {
    const response = await request.put(putURL, {
      headers: await api.getAuthHeaders(token),
      data: payload,
    });

    console.log("PUT Status:", response.status());
    console.log("PUT Status Text:", response.statusText());
    console.log("PUT URL:", putURL);
    console.log("Token:", token);
    console.log("Headers:", api.getAuthHeaders(token));

    await api.statusValidation(response);
    await api.validateResponseBody(response);
  });

  test("GET: verify the booking was updated", async ({ request }) => {
    const response = await request.get(putURL);
    await api.statusValidation(response);
    await api.validateResponseBody(response);
  });
});
