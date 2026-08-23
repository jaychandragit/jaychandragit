import { test, request, expect } from "@playwright/test";
import postAPIRequest from "../../testdata/api_requests/POST_API.Request.json";


test.use({
    baseURL: process.env.BASE_API_URL,
    //abcd
})


test("Create POST API Request using static file in playwright & typescript", async ({ request }) => {

    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: postAPIRequest })

    //Print JSON API Response
    const jsonPostAPIResponse = await postAPIResponse.json();
    console.log('Post API Response' + JSON.stringify(jsonPostAPIResponse, null, 2));
    //Print JSON API Response
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    //Validate Property/Key names
    expect(jsonPostAPIResponse.booking).toHaveProperty('firstname');
    expect(jsonPostAPIResponse.booking).toHaveProperty('lastname');

    expect(jsonPostAPIResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostAPIResponse.booking.bookingdates).toHaveProperty('checkout');

    //Validate API Response Body
    expect(jsonPostAPIResponse.bookingid).toBeGreaterThan(0);
     expect(jsonPostAPIResponse.booking.firstname).toBe('playwright typescript by testers talk');
      expect(jsonPostAPIResponse.booking.lastname).toBe('playwright javascript by testers talk');
      expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2025-01-15');
     expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2025-01-17');


});