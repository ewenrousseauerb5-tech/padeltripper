import { SITE_URL } from '@/src/lib/seo';
import { FUTURE_EVENTS } from '@/src/data/events';

export const dynamic = 'force-static';

export function GET() {
  const upcomingTrips = FUTURE_EVENTS.slice(0, 8)
    .map(event => `- ${event.date}: ${event.status}, from ${event.price}, ${event.nights} nights, ${event.location}`)
    .join('\n');

  const body = `
# Padel Tripper

Padel Tripper offers premium small-group padel holidays, padel camps and coaching retreats in Alicante, Spain.

## Core Facts

- Main location: Alicante, Spain.
- Main offer: 3-night / 4-day padel holidays with accommodation, coaching, social play and group support.
- Typical guests: solo travellers, couples, friend groups and mixed-ability padel players.
- Room pricing: shared room trips usually range from GBP 545-645 per person; private room trips usually range from GBP 745-845.
- Flights are not included. Guests book flights separately after trip confirmation.
- Trust signals: Protected Trust Services verified partner; 5.0 Trustpilot rating; founded from the Alicante Social Padel community.
- Local experience: the founder has hosted 700+ local padel events and built a network of 2000 players in Alicante.

## Upcoming Trips Snapshot

${upcomingTrips}

## Important Pages

- ${SITE_URL}/padel-holidays-spain - Informational landing page for padel holidays in Spain.
- ${SITE_URL}/events - Upcoming trip dates, pricing and enquiry form.
- ${SITE_URL}/venues - Alicante clubs, hotels and venues used by Padel Tripper.
- ${SITE_URL}/about - Company story and team information.
- ${SITE_URL}/tailored-events - Private and tailored padel trips.
- ${SITE_URL}/partners - Partner information.
- ${SITE_URL}/sitemap.xml - XML sitemap.

## Common Questions Answered On The Site

- What level do I need for a padel holiday in Spain?
- Can I travel alone?
- What is included in a Padel Tripper holiday?
- How much does a padel holiday in Spain cost?
- How do I book an upcoming trip?
`;

  return new Response(body.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
