import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seo = z.object({
  title: z.string(),
  description: z.string().max(170),
  noindex: z.boolean().default(false),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    icon: z.enum(['chart', 'tax', 'study']),
    order: z.number(),
    outcomes: z.array(z.string()),
    process: z.array(z.string()),
    audience: z.array(z.string()),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })),
    seo,
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('فريق MGBC'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo,
  }),
});

export const collections = { services, articles };
