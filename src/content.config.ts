import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    pageType: z.enum(['home','about','servicesHub','service','insightsHub','insight','consultation','contact','legal']),
    locale: z.string(),
    slug: z.string(),
    status: z.enum(['PUBLISH_READY','DRAFT_READY_FOR_LEGAL_REVIEW']),
    seoTitle: z.string(),
    metaDescription: z.string(),
    canonical: z.string(),
    primaryTopic: z.string(),
    primaryCTA: z.string().optional(),
    secondaryCTA: z.string().optional(),
    proofVerified: z.array(z.string()).optional(),
    relatedService: z.string().optional(),
    robots: z.string().optional(),
    legalReview: z.boolean().default(false),
  }),
});

export const collections = { pages };
