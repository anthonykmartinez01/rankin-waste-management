// src/components/location-types.ts
// Shared types for the LocationPage component and the /service-areas/<town>
// page files. Kept in a .ts module because Astro frontmatter doesn't accept
// exported `type`/`interface` declarations.
export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] };

export interface LocationSection {
  heading: string;
  img: string; // basename under /images/<slug>/ (e.g. 'rural-route')
  imgAlt: string;
  lead: string;
  blocks: Block[];
}

export type { Faq } from '../data/faqs';
