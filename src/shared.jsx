import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════ SCROLL REVEAL HOOK ═══════════════════════ */

export const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  };
  return { ref, style };
};

/* ═══════════════════════ CONSTANTS ═══════════════════════ */

export const PHONE = '(254) 205-6125';
export const PHONE_LINK = 'tel:+12542056125';

/* ═══════════════════════ ICONS ═══════════════════════ */

export const PhoneIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const MailIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const MapPinIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const ClockIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* ═══════════════════════ PAGE WRAPPER ═══════════════════════ */

const setMeta = (selector, attr, value) => {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
  } else {
    // Create the tag if it doesn't exist
    const m = document.createElement('meta');
    // Parse selector like meta[name="description"] or meta[property="og:url"]
    const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
    if (match) {
      m.setAttribute(match[1], match[2]);
      m.setAttribute(attr, value);
      document.head.appendChild(m);
    }
  }
};

const DEFAULT_OG_IMAGE = 'https://rankinwaste.com/truck-side.webp';

export const PageHead = ({ title, description, image, imageAlt }) => {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    const ogImage = image
      ? (image.startsWith('http') ? image : window.location.origin + image)
      : DEFAULT_OG_IMAGE;

    // Title + description
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    if (imageAlt) setMeta('meta[property="og:image:alt"]', 'content', imageAlt);

    // Twitter / X Card
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    if (imageAlt) setMeta('meta[name="twitter:image:alt"]', 'content', imageAlt);

    window.scrollTo(0, 0);
  }, [title, description, image, imageAlt]);
  return null;
};

/* ═══════════════════════ INNER PAGE HERO ═══════════════════════ */

export const InnerHero = ({ title, bgImage, bgImageAlt = '' }) => {
  if (bgImage) {
    return (
      <div className="relative pt-48 pb-40 md:pt-56 md:pb-52 lg:pt-64 lg:pb-64 border-b border-border-subtle overflow-hidden">
        <img
          src={bgImage}
          alt={bgImageAlt}
          aria-hidden={bgImageAlt ? undefined : 'true'}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-[clamp(2rem,5vw,4rem)] text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-36 pb-12 md:pt-40 md:pb-16 bg-dark-elevated border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[clamp(2rem,5vw,4rem)]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h1>
      </div>
    </div>
  );
};

/* ═══════════════════════ CTA BUTTON ═══════════════════════ */

export const CallCTA = ({ className = '' }) => (
  <a href={PHONE_LINK} className={`inline-flex items-center gap-2 bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-orange-600 transition-colors duration-300 min-h-[44px] ${className}`}>
    <PhoneIcon className="w-5 h-5" />
    Call {PHONE}
  </a>
);
