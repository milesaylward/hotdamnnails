/* eslint-disable */
import SolidCover from '@/assets/images/designs/basic/solids/cover.jpg';
import FrenchCover from '@/assets/images/designs/basic/french/cover.jpg';
import MinimalCover from '@/assets/images/designs/minimal/cover.jpg';
import ModerateCover from '@/assets/images/designs/moderate/cover.jpg';
import ExtremeCover from '@/assets/images/designs/extreme/cover.jpg';

function importAll(r) {
  return r.keys().map(r);
}
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

export const POLICY_COPY = [
  [
    'This booking site allows you to curate your appointment based on your desired time and budget (yay!!)',
    'Nail art is difficult to price due to custom designs and addons. But hopefully this makes it easy for you and I to understand. Feedback on how to improve the site is greatly appreciated!',
    'Feel free consult before booking if you have any confusion with the booking process. Services / Designs can take anywhere from 2 to 4 hours based on your design and service needs.',
  ],
  [
    'Being decisive about your design is very important because I do not function like a walk-in salon, but I really do want to give you the best possible service and experience.',
    'Please make sure you have the time before you book an appointment slot, and if things like broken nails happen after you book please let me know ahead so we can plan/adjust your time slot if needed.',
    'The services you book are all that can be done in that time. All other changes during your appointment can change the time needed and the remaining price.',
    'I hope to see you all soon!!',
  ],
];

export const DESIGN_CAROUSELS = [
  {
    cover: SolidCover,
    title: 'Solid',
    slides: importAll(require.context('@/assets/images/designs/basic/solids/slides', false, /\.(png|jpe?g|svg)$/)),
    description: [
      [
        'Solid Styles:',
        'Solid colors only on each nails',
        'It can be different colors or one',
      ]
    ]
  },
  {
    cover: FrenchCover,
    title: 'French',
    slides: importAll(require.context('@/assets/images/designs/basic/french/slides', false, /\.(png|jpe?g|svg)$/)),
    description: [
      [
        'French Styles:',
        'One style of French tips on set of nails.',
        'It can be different colors or one',
        'Styles of french tips include: Basic french, V-tips, Edge Tips, Diagonal, Thin line',
        'Handpainted application method only'
      ],
      [
        'Ombres:',
        'Ombre application will depend on the color available.',
		    'Some can be sponged, acrylic, or powdered.',
      ]
    ]
  },
  {
    cover: MinimalCover,
    title: 'Minimal',
    slides: importAll(require.context('@/assets/images/designs/minimal/slides', false, /\.(png|jpe?g|svg)$/)),
    description: [
      [
        'Minimal Styles:',
        'Basic nails with 2-4 simple accent nails such as gold foils, glitter shapes',
		    'It can be a set of nails with minimal abstract / organic art such as swirls, simple florals, glitter shapes or minimal detailed lines or marbles.',
		    'The set is composed of 1-3 color palette',
		    'Overall minimal look',
      ]
    ]
  },
  {
    cover: ModerateCover,
    title: 'Moderate',
    slides: importAll(require.context('@/assets/images/designs/moderate/slides', false, /\.(png|jpe?g|svg)$/)),
    description: [
      [
        'Moderate Styles:',
        'Multiple nails with detailed accent nails or 3D / bling, chrome.',
		    'It can be a set of nails with specific details such as fire, clouds, smiley faces, stars, your initials, checkerboard, logo or 	anything that seems detailed.',
		    'Composed of 3+ color palette',
		    'Most clients that likes handpainted designs or minimal bling arrangement choose this design category',
      ]
    ]
  },
  {
    cover: ExtremeCover,
    title: 'Extreme',
    slides: importAll(require.context('@/assets/images/designs/extreme/slides', false, /\.(png|jpe?g|svg)$/)),
    description: [
      [
        'Extreme Styles:',
        'When most or all nails have different designs/ styles',
		    'When most nails have multiple layered art such as chrome, sugar glitter, 3D / Bling.',
		    'Unlimited color palette',
		    'Any textured set, anime design, and other extremely detailed set may fall in this category.',
      ]
    ]
  },
]

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
