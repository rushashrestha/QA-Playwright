import { expect } from "@playwright/test";
import { URLs } from "../fixtures/URLs.js";
import { statusCode } from "../fixtures/statusCodes.js";

const authURL = URLs.authURL;
const authData = {
  username: "admin",
  password: "password123",
};
let token;

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
    expect(booking).toMatchObject({
      firstname: expected.firstname,
      lastname: expected.lastname,
      totalprice: expected.totalprice,
      depositpaid: expected.depositpaid,
    });
  }

  async getAuthHeaders(token) {
    return {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    };
  }

  async auth(request) {
    const authResponse = await request.post(authURL, {
      headers: this.getAuthHeaders,
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
