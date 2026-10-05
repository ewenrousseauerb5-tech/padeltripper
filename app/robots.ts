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
  const disallowedPaths = ['/api/', '/_next/', '/dashboard/'];

  return {
    rules: [
      ...aiSearchCrawlers.map(userAgent => ({
        userAgent,
        allow: '/',
        disallow: disallowedPaths,
      })),
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
