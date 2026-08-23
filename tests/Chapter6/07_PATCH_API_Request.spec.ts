import { test, expect } from "@playwright/test";
import { getPOSTAPIRequestBody } from "../../src/utils/APIHelper";



import { faker } from "@faker-js/faker";

import tokenAPIRequest from "../../testdata/api_requests/Token_API_Request.json"
//import putAPIRequest from "../../testdata/api_requests/PUT_API_Request.json"
import patchAPIRequest from "../../testdata/api_requests/PATCH_API_Request.json"

test.use({
    baseURL: process.env.BASE_API_URL,
})


test("Create PATCH API Request using playwright & typescript", async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int({ min: 1000, max: 10000 })

    const postAPIRequest = await getPOSTAPIRequestBody(firstName, lastName, totalprice,
        true, "breakfast", "2025-01-25", "2025-01-27");



    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: postAPIRequest });

    //Print JSON API Response
    const jsonPostAPIResponse = await postAPIResponse.json();

    console.log('Post API Response' + JSON.stringify(jsonPostAPIResponse, null, 2));



    //Validate API Response
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
    expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe('2025-01-25');
    expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe('2025-01-27');

    //Create GET API Request ...................GET...................

    const bookingId = jsonPostAPIResponse.bookingid;
    console.log("Booking Id is: " + bookingId)
    const getAPIResponse = await request.get(`/booking/${bookingId}`)

    //Validate status code and status text
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');

    //Print JSON API Response
    const getAPIJSONResponse = await getAPIResponse.json();

    console.log('GET API Response' + JSON.stringify(getAPIJSONResponse, null, 2));

    //Generate Token
    const tokenAPIResponse = await request.post(`/auth`, { data: tokenAPIRequest })

    //Validate status code and status text
    expect(tokenAPIResponse.status()).toBe(200);
    expect(tokenAPIResponse.statusText()).toBe('OK');

    const tokenAPIJSONResponse = await tokenAPIResponse.json();
    const token = tokenAPIJSONResponse.token;
    console.log("Token: " + token);

    //Create PATCH API Request ............................PATCH..............
    const patchAPIResponse=await request.patch(`/booking/${bookingId}`,
     {
        headers:{

               "Content-Type":"application/json",
               "Cookie":`token= ${token}`
      
        },
        data:patchAPIRequest
        
     }
    )
    //Validate status code and status text
    expect(patchAPIResponse.status()).toBe(200);
    expect(patchAPIResponse.statusText()).toBe('OK');

    //Print PATCH JSON API Response
    const patchAPIJSONResponse = await patchAPIResponse.json();

    console.log('PATCH API Response' + JSON.stringify(patchAPIJSONResponse, null, 2));

});

