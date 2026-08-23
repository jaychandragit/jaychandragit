import { test, expect } from "@playwright/test";
import { formatAPIRequest } from "../../src/utils/APIHelper";

import path from "path";
import fs from "fs";

import { faker } from "@faker-js/faker";

test.use({
    baseURL: process.env.BASE_API_URL,
    //test
})


test("Create POST Dynamic API Request body using file JFaker in playwright & typescript", async ({ request }) => {

    //Reading Json File
    const filepath = path.join(__dirname, '../../testdata/api_requests/Dynamic_POST_API.Request.json')
    const jsonTempalte = fs.readFileSync(filepath, 'utf-8');

    const firstName=faker.person.firstName();
    const lastName=faker.person.lastName();
    const totalprice=faker.number.int({min:1000,max:10000})

    const values = [firstName, lastName,totalprice];
    //Updating POST API Request Body
    const postAPIRequest = await formatAPIRequest(jsonTempalte, values)
    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: JSON.parse(postAPIRequest) })

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
    expect(jsonPostAPIResponse.booking.firstname).toBe(firstName);
    expect(jsonPostAPIResponse.booking.lastname).toBe(lastName);
    expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2025-01-15');
    expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2025-01-17');


});