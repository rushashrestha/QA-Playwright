import { expect } from "@playwright/test";
import { URLs } from "../fixtures/URLs.js";
import { statusCode } from "../fixtures/statusCodes.js";

const authURL = URLs.authURL;
const authData = {
  username: "admin",
  password: "password123",
};
let token;
const headers = {
  Cookie: `token=${token}`,
  "Content-Type": "application/json",
};

export class validator {
  async statusValidation(response, expectedStatus = statusCode.successCode) {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(expectedStatus);
  }

  async validateResponseBody(response) {
    const responseBody = await response.json();
    console.log(responseBody);
    return responseBody;
  }

  async validateBookingFields(booking, expected) {
    expect(booking.firstname).toBe(expected.firstname);
    expect(booking.lastname).toBe(expected.lastname);
    expect(booking.totalprice).toBe(expected.totalprice);
    expect(booking.depositpaid).toBe(expected.depositpaid);
  }

  async auth(request) {
    const authResponse = await request.post(authURL, {
      headers: {
        "content-Type": "application/json"
      },
      data: authData,
    });
    expect(authResponse.ok()).toBeTruthy();
    expect(authResponse.status()).toBe(statusCode.successCode);
    const authBody = await authResponse.json();
    const token = authBody.token;
    console.log("Authentication token: ", token);
    return token;
  }
}
