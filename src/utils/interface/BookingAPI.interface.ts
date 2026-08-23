 export interface BookingAPI {
    "firstname": string,
    "lastname": string,
    "totalprice": number,
    "depositpaid": boolean,
    "additionalneeds": string,
    "bookingdates":BookingDates
}
export interface BookingDates {
    "checkin": string,
    "checkout": string
}