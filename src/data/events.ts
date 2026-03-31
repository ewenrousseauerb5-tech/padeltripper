export interface PadelEvent {
  id: number;
  startDate: string;
  date: string;
  dateShort: string;
  nights: number;
  status: 'Filling Fast' | 'Available' | 'Limited Spaces';
  price: string;
  filled: number;
  max: number;
  location: string;
  hotel: string;
  image?: string;
  imagePosition?: 'top' | 'center' | 'bottom' | 'lower' | 'slightLower';
  name?: string;
  eligibilityNote?: string;
  originalPrice?: string;
  promoNote?: string;
}

export const ALL_EVENTS: PadelEvent[] = [
  {
    id: 68,
    startDate: '2026-03-31',
    date: '31st March - 3rd April 2026',
    dateShort: 'Mar 31 – Apr 3',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 6,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-photo.jpg',
    imagePosition: 'lower',
  },
  {
    id: 69,
    startDate: '2026-04-14',
    date: '14th - 17th April 2026',
    dateShort: 'Apr 14–17',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    promoNote: '£100 discount until 31 March',
    filled: 2,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/padel-coaching-session.jpg',
    imagePosition: 'center',
    eligibilityNote: 'Only for players rated 3.0+ on Playtomic (or equivalent)',
  },
  {
    id: 95,
    startDate: '2026-04-20',
    date: '20th - 23rd April 2026',
    dateShort: 'Apr 20–23',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-photo.jpg',
    imagePosition: 'lower',
  },
  {
    id: 62,
    startDate: '2026-05-05',
    date: '5th - 8th May 2026',
    dateShort: 'May 5–8',
    nights: 3,
    status: 'Filling Fast',
    price: '£745.00',
    filled: 9,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-bela-court.jpg',
    imagePosition: 'slightLower',
  },
  {
    id: 88,
    startDate: '2026-05-12',
    name: 'Hosted Alicante Padel Experience: Ben Kettleborough',
    date: '12th - 15th May 2026',
    dateShort: 'May 12–15',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 4,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 70,
    startDate: '2026-05-26',
    date: '26th - 29th May 2026',
    dateShort: 'May 26–29',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    promoNote: '£100 off this event',
    filled: 5,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 91,
    startDate: '2026-09-21',
    date: '21st - 24th September 2026',
    dateShort: 'Sep 21–24',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 92,
    startDate: '2026-10-19',
    date: '19th - 22nd October 2026',
    dateShort: 'Oct 19–22',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 93,
    startDate: '2026-11-02',
    date: '2nd - 5th November 2026',
    dateShort: 'Nov 2–5',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    eligibilityNote: 'Only for players rated 3.0+ on Playtomic (or equivalent)',
  },
  {
    id: 94,
    startDate: '2026-11-16',
    date: '16th - 19th November 2026',
    dateShort: 'Nov 16–19',
    nights: 3,
    status: 'Available',
    price: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

export const FUTURE_EVENTS = ALL_EVENTS
  .filter(event => {
    const eventDate = new Date(`${event.startDate}T00:00:00`);
    return eventDate >= today;
  })
  .sort((a, b) => a.startDate.localeCompare(b.startDate));

export const UPCOMING_EVENTS = FUTURE_EVENTS.slice(0, 3);
