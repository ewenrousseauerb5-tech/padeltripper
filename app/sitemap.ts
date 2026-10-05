import type { MetadataRoute } from 'next';
import { FUTURE_EVENTS, getEventSlug } from '@/src/data/events';
import { SITE_URL } from '@/src/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${SITE_URL}/images/foto-movil-1.jpeg`,
        `${SITE_URL}/images/post-tournament-celebration-mobile.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${SITE_URL}/images/post-tournament-celebration.jpg`,
        `${SITE_URL}/images/group-bela-court.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/padel-holidays-spain`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [
        `${SITE_URL}/images/padel-group-holiday.jpg`,
        `${SITE_URL}/images/venues/bela-center.webp`,
      ],
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        `${SITE_URL}/images/ollie.jpg`,
        `${SITE_URL}/images/group-social-evening.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/tailored-events`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [
        `${SITE_URL}/images/padel-coaching-session.jpg`,
        `${SITE_URL}/images/group-photo.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/venues`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [
        `${SITE_URL}/images/venues/Montemar-pistas.jpg`,
        `${SITE_URL}/images/venues/Hotel-piscina.webp`,
        `${SITE_URL}/images/venues/bela-center.webp`,
      ],
    },
    {
      url: `${SITE_URL}/partners`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [
        `${SITE_URL}/images/group-photo.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/may-padel-retreat`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [
        `${SITE_URL}/images/group-photo-may-2026.jpg`,
        `${SITE_URL}/images/padel-coaching-session-card.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.2,
    },
  ];

  const eventRoutes: MetadataRoute.Sitemap = FUTURE_EVENTS.map(event => ({
    url: `${SITE_URL}/events/${getEventSlug(event)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: event.status === 'Sold Out' ? 0.45 : 0.75,
    images: event.image ? [`${SITE_URL}${event.image}`] : [`${SITE_URL}/images/post-tournament-celebration.jpg`],
  }));

  return [...staticRoutes, ...eventRoutes];
}
