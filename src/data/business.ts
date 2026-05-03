// Single source of truth for NAP per CLAUDE.md spec.
// Values match what is currently emitted in schema blocks
// across index.html and the inner page components.

export const business = {
  name: 'Rankin Waste Management',
  legalName: 'Rankin Waste Management',
  phone: '(254) 205-6125',
  phoneLink: 'tel:+12542056125',
  email: 'rankinwaste@gmail.com',
  address: {
    street: '175 PR335',
    city: 'Hubbard',
    state: 'TX',
    zip: '76648',
    country: 'US',
  },
  geo: {
    lat: 31.8468,
    lng: -96.8011,
  },
  hours: {
    monday: '8:00 AM – 6:00 PM',
    tuesday: '8:00 AM – 6:00 PM',
    wednesday: '8:00 AM – 6:00 PM',
    thursday: '8:00 AM – 6:00 PM',
    friday: '8:00 AM – 6:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  serviceArea: ['Hubbard', 'Axtell', 'Dawson', 'Malone', 'Mertens', 'Purdon'],
  description: 'Professional waste management services serving Hubbard and surrounding areas for 6 years.',
  siteUrl: 'https://rankinwaste.com',
} as const;

// Convenient flat exports for legacy ergonomics.
// Mirrors src/shared.jsx's PHONE / PHONE_LINK constants.
export const PHONE = business.phone;
export const PHONE_LINK = business.phoneLink;
