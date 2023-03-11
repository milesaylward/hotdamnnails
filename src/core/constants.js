/* eslint-disable */

export const HEADER_HEIGHT = 85;
export const HEADER_HEIGHT_MOBILE = 65;
export const USER_INPUTS = [
  {
    label: 'First Name',
    type: 'text',
    id: 'firstName',
    icon: 'person',
  },
  {
    label: 'Last Name',
    type: 'text',
    id: 'lastName',
    icon: 'person',
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email',
    icon: 'email',
  },
  {
    label: 'Number',
    type: 'tel',
    id: 'number',
    icon: 'smartphone',
  },
];

export const TEST_BOOKING = {
  "id": 659786147,
  "firstName": "Miles",
  "lastName": "Aylward",
  "phone": "7573390985",
  "email": "miles.aylward@gmail.com",
  "date": "August 31, 2021",
  "time": "10:00am",
  "endTime": "11:30am",
  "dateCreated": "August 29, 2021",
  "datetimeCreated": "2021-08-29T12:02:25-0500",
  "datetime": "2021-08-31T10:00:00-0400",
  "price": "40.00",
  "priceSold": "40.00",
  "paid": "no",
  "amountPaid": "0.00",
  "type": "Fresh Set + Pre:NO SOAK OFF, Length:Short, Design:Basic Art",
  "appointmentTypeID": 26099563,
  "classID": null,
  "addonIDs": [
      2112569,
      2112113,
      2112127
  ],
  "category": "",
  "duration": "180",
  "calendar": "Coleene Quintana",
  "calendarID": 4672347,
  "certificate": null,
  "confirmationPage": "https://app.acuityscheduling.com/schedule.php?owner=21110176&action=appt&id%5B%5D=af83c506c9ebf745cb6f1a5996a35bfa",
  "location": "",
  "notes": "",
  duration_parsed: '3 Hours',
  deposit: 20,
  "timezone": "America/New_York",
  "calendarTimezone": "America/New_York",
  "canceled": false,
  "canClientCancel": false,
  "canClientReschedule": false,
  "labels": null,
  "forms": [],
  "formsText": "Name: Miles Aylward\nPhone: (757) 339-0985\nEmail: miles.aylward@gmail.com\nPrice: $40.00\n\nAdd Ons\n============\nPre:NO SOAK OFF\nLength:Short\nDesign:Basic Art\n",
  "isVerified": false,
  "scheduledBy": "hotdamnnails@gmail.com"
};
export const MODAL_TYPES = {
  DESIGN_CONFIRM: 'DESIGN_CONFIRM',
};

export const EVENT_BUS_EVENTS = {
  DESIGN_CONFIRM: 'DESIGN_CONFIRM',
};