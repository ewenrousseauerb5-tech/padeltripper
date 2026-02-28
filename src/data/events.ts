export interface PadelEvent {
  id: number;
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
  imagePosition?: 'top' | 'center' | 'bottom';
  name?: string;
}

export const ALL_EVENTS: PadelEvent[] = [
  {
    id: 80,
    date: '17th - 20th March 2026',
    dateShort: 'Mar 17–20',
    nights: 3,
    status: 'Available',
    price: '£695',
    filled: 2,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/tournament-feb-25.jpg',
    imagePosition: 'center',
  },
  {
    id: 73,
    date: '23rd - 27th March 2026',
    dateShort: 'Mar 23–27',
    nights: 4,
    status: 'Filling Fast',
    price: '£895',
    filled: 9,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-bela-court.jpg',
  },
  {
    id: 68,
    date: '31st March - 3rd April 2026',
    dateShort: 'Mar 31 – Apr 3',
    nights: 3,
    status: 'Available',
    price: '£795',
    filled: 6,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
    image: '/images/group-photo.jpg',
  },
  {
    id: 69,
    date: '14th - 17th April 2026',
    dateShort: 'Apr 14–17',
    nights: 3,
    status: 'Available',
    price: '£795',
    filled: 2,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 62,
    date: '5th - 8th May 2026',
    dateShort: 'May 5–8',
    nights: 3,
    status: 'Filling Fast',
    price: '£895',
    filled: 9,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 88,
    name: 'Hosted Alicante Padel Experience: Ben Kettleborough',
    date: '12th - 15th May 2026',
    dateShort: 'May 12–15',
    nights: 3,
    status: 'Available',
    price: '£795',
    filled: 4,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
  {
    id: 70,
    date: '26th - 29th May 2026',
    dateShort: 'May 26–29',
    nights: 3,
    status: 'Available',
    price: '£795',
    filled: 5,
    max: 16,
    location: 'Alicante, Spain',
    hotel: '4* Hotel Alicante Golf',
  },
];

export const UPCOMING_EVENTS = ALL_EVENTS.slice(0, 3);
