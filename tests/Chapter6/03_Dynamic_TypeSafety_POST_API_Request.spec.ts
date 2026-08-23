import { test, expect } from "@playwright/test";
import { getPOSTAPIRequestBody} from "../../src/utils/APIHelper";



import { faker } from "@faker-js/faker";

test.use({
    baseURL: process.env.BASE_API_URL,
})


test("Create TypeSafety POST API Request using dynamic api request body in playwright & typescript'", async ({ request }) => {

    const firstName=faker.person.firstName();
    const lastName=faker.person.lastName();
    const totalprice=faker.number.int({min:1000,max:10000})

    const postAPIRequest=await getPOSTAPIRequestBody(firstName,lastName,totalprice,
    true,"breakfast","2025-01-25","2025-01-27");

    
    
    // Create POST API Request
    const postAPIResponse = await request.post('/booking', { data: postAPIRequest}) ;

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


});

