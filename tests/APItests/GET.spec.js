import { test } from "@playwright/test";
import { URLs } from "./fixtures/URLs.js";
import { validator } from "./helpers/apiHelpers.js";
let api;

test.beforeEach(async ({}) => {
  api = new validator();
});

const bookingURL = URLs.bookingURL
const bookingId = 3;
const getURL = `${URLs.bookingURL}/${bookingId}`;

const filterData1 = {
    firstname: "Jim",
    lastname: "Wilson"
}

const filterData2 = {
    totalprice: 111,
    depositpaid: true
}

test('GET all booking IDs', async ({ request}) =>{
    const response = await request.get(bookingURL);
    await api.statusValidation(response);
    await api.validateResponseBody(response);
})

test ('GET specific booking ID', async ({ request })=>{
    const response = await request.get(getURL);
    await api.statusValidation(response);
    await api.validateResponseBody(response);
})

test('GET with filtered parameters', async ({ request })=>{
    const response = await request.get(bookingURL, {
        params: filterData1,
    });
    await api.statusValidation(response);
    await api.validateResponseBody(response);  
})

test('GET with filtered parameters 2', async ({ request })=>{
    const response = await request.get(bookingURL, {
        params: filterData2,
    });
    await api.statusValidation(response);
    await api.validateResponseBody(response); 
})

test.afterAll(async ()=>{
    console.log('GET requests completed');
})