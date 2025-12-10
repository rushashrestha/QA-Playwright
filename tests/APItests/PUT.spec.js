import { test } from "@playwright/test";

import { URLs } from "./fixtures/URLs.js";
import { validator } from "./helpers/apiHelpers.js";
let api;

test.beforeEach(async ({}) => {
  api = new validator();
});

const bookingId = 6;
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
      token = await api.auth(request);
   
  });

  test("PUT: updating an existing booking with authentication", async ({
    request,
  }) => {
    const response = await request.put(putURL, {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });

    await api.statusValidation(response);
    await api.validateResponseBody(response);
  });

  test("GET: verify the booking was updated", async ({ request }) => {
    const response = await request.get(putURL);
    await api.statusValidation(response);
    await api.validateResponseBody(response);
  });
});
