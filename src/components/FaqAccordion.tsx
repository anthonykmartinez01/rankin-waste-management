// src/components/FaqAccordion.tsx
// Byte-identical port of pre-migration src/App.jsx FAQItem +
// linkifyPhone + ChevronIcon (lines 691-737). React island
// hydrated via client:idle from src/pages/index.astro. Preserves
// the open/close button with aria-expanded, animated max-height
// transition, and inline phone-link substitution in answers.
//
// Wrapper is <div className="max-w-[800px]"> with NO mx-auto —
// matches pre-migration App.jsx FAQ section verbatim. The accordion
// left-aligns within the max-w-[1200px] parent in index.astro.
//
// Logged as FAQ-1 (P1) in post-migration-improvements.md: could be
// replaced post-migration with native <details>/<summary> for
// zero-JS rendering. Visual difference: native is binary open/close
// (no animation); current React version has height transition.
import { useState } from 'react';
import { PHONE_LINK } from '../data/business';
import type { Faq } from '../data/faqs';

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const linkifyPhone = (text: string) => {
  const parts = text.split(/(\(254\) 205-6125)/g);
  return parts.map((part, i) =>
    part === '(254) 205-6125' ? (
      <a
        key={i}
        href={PHONE_LINK}
        className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

const FAQItem = ({ faq }: { faq: Faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-6 min-h-[44px] group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-[1.05rem] group-hover:text-orange-500 transition-colors duration-300">
          {faq.q}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          open ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-text-muted leading-relaxed max-w-[700px]">{linkifyPhone(faq.a)}</p>
      </div>
    </div>
  );
};

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="max-w-[800px]">
      {faqs.map((faq, i) => (
        <FAQItem key={i} faq={faq} />
      ))}
    </div>
  );
}
