import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/seo';

const aiSearchCrawlers = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...aiSearchCrawlers.map(userAgent => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/_next/'],
      })),
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
