import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const tutorialSchema = docsSchema({
  extend: z.object({
    title: z.string().trim().min(1, 'Tutorial frontmatter field "title" must not be empty.'),
    description: z
      .string()
      .trim()
      .min(1, 'Tutorial frontmatter field "description" is required and must not be empty.'),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: tutorialSchema }),
};
