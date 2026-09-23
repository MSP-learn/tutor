import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://msp-learn.github.io',
  base: '/tutor',
  output: 'static',
  integrations: [
    starlight({
      title: 'Tutor',
      description: 'Clear, practical tutorials from MSP Learn.',
      customCss: ['./src/styles/custom.css'],
      pagefind: true,
      sidebar: [
        {
          label: 'Tutorials',
          items: [{ label: 'First tutorial', slug: 'tutorials/first-tutorial' }],
        },
      ],
    }),
  ],
});
