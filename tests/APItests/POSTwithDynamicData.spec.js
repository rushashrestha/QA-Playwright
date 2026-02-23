// POST request with dynamic data generation: faker

import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { URLs } from "./fixtures/URLs.js";
import { validator } from "./helpers/apiHelpers.js";
let api;

const bookingURL = URLs.bookingURL;

test.beforeEach(async ({}) => {
  api = new validator();
});

const bookingDetails = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: faker.number.int({ min: 1000, max: 9999 }),
  depositpaid: true,
  currentDate: DateTime.now().toFormat("yyyy-MM-dd"),
  checkoutDate: DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd"),
};

test("creating a booking with dynamic data", async ({ request }) => {
  const response = await request.post(bookingURL, {
    //payload with dynamic data
    data: {
      firstname: bookingDetails.firstname,
      lastname: bookingDetails.lastname,
      totalprice: bookingDetails.totalprice,
      depositpaid: bookingDetails.depositpaid,
      bookingdates: {
        checkin: bookingDetails.currentDate,
        checkout: bookingDetails.checkoutDate,
      },
      additionalneeds: "Breakfast",
    },
  });
  await api.statusValidation(response);
  const responseBody = await api.validateResponseBody(response);
  await api.validateBookingFields(responseBody.booking, bookingDetails);
});
