import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('articles', (entry) => !entry.data.draft);
  return rss({
    title: 'رؤى MGBC',
    description: 'مقالات مالية وضريبية ودراسات جدوى للسوق السعودي.',
    site: context.site ?? 'https://mgbc.sa',
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.excerpt,
      pubDate: article.data.publishedAt,
      link: `/insights/${article.data.slug}`,
    })),
    customData: '<language>ar-SA</language>',
  });
};
