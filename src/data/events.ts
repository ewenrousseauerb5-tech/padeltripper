export interface PadelEvent {
  id: number;
  startDate: string;
  date: string;
  dateShort: string;
  nights: number;
  status: 'Filling Fast' | 'Available' | 'Limited Spaces' | 'Sold Out';
  price: string;
  filled: number;
  max: number;
  location: string;
  hotel: string;
  image?: string;
  imagePosition?: 'top' | 'center' | 'bottom' | 'lower' | 'slightLower' | 'midPosition' | 'slightTop';
  name?: string;
  eligibilityNote?: string;
  originalPrice?: string;
  promoNote?: string;
  formatNote?: string;
}

const EARLY_BIRD_HIDE_FROM_UTC = new Date('2026-06-30T00:00:00Z');

export function getVisiblePromoNote(event: PadelEvent): string | undefined {
  if (!event.promoNote) return undefined;

  const isEarlyBirdCopy = event.promoNote.toLowerCase().includes('book before 30 june');
  if (!isEarlyBirdCopy) return event.promoNote;

  const now = new Date();
  if (now >= EARLY_BIRD_HIDE_FROM_UTC) return undefined;

  return event.promoNote;
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
    price: '£745.00',
    filled: 2,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/padel-coaching-session-optimized.jpg',
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
    status: 'Sold Out',
    price: '£745.00',
    filled: 9,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-bela-court-card.jpg',
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
    image: '/images/group-photo-may-2026.jpg',
    imagePosition: 'midPosition',
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
    promoNote: 'Special Offer on this date',
    filled: 5,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/padel-coaching-session-card.jpg',
    imagePosition: 'center',
  },
  {
    id: 97,
    startDate: '2026-09-15',
    name: 'Hosted Alicante Padel Experience: Ben Kettleborough',
    date: '15th - 18th September 2026',
    dateShort: 'Sep 15–18',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    promoNote: 'Hosted by Ben Kettleborough',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/Ben.jpeg',
    imagePosition: 'slightTop',
  },
  {
    id: 91,
    startDate: '2026-09-22',
    date: '22nd - 25th September 2026',
    dateShort: 'Sep 22–25',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-bela-court.jpg',
    imagePosition: 'slightLower',
  },
  {
    id: 92,
    startDate: '2026-10-20',
    date: '20th - 23rd October 2026',
    dateShort: 'Oct 20–23',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-photo.jpg',
    imagePosition: 'lower',
  },
  {
    id: 93,
    startDate: '2026-11-03',
    date: '3rd - 6th November 2026',
    dateShort: 'Nov 3–6',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-bela-court.jpg',
    imagePosition: 'slightLower',
  },
  {
    id: 94,
    startDate: '2026-11-17',
    date: '17th - 20th November 2026',
    dateShort: 'Nov 17–20',
    nights: 3,
    status: 'Available',
    price: '£645.00',
    originalPrice: '£745.00',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-photo.jpg',
    imagePosition: 'lower',
  },
  {
    id: 96,
    startDate: '2026-11-24',
    date: '24th - 27th November 2026',
    dateShort: 'Nov 24–27',
    nights: 3,
    status: 'Available',
    price: '£545.00',
    originalPrice: '£645.00',
    promoNote: 'Play-only format: 4 hours per day',
    formatNote: 'Play-only format: 4 hours of padel per day',
    filled: 0,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-bela-court.jpg',
    imagePosition: 'slightLower',
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
