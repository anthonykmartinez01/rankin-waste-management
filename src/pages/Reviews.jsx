import { useEffect, useRef, useState } from 'react';
import { PageHead, InnerHero } from '../shared';

const STAR = (
  <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const HALF_STAR = (
  <svg viewBox="0 0 24 24">
    <defs><linearGradient id="rw-half"><stop offset="80%" stopColor="#FBBC04"/><stop offset="80%" stopColor="#555"/></linearGradient></defs>
    <path fill="url(#rw-half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const GOOGLE_ICON = (
  <svg viewBox="0 0 48 48" style={{width:18,height:18,flexShrink:0}}><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></svg>
);

const GOOGLE_ICON_SM = (
  <svg viewBox="0 0 48 48" style={{width:14,height:14,flexShrink:0}}><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></svg>
);

const REVIEWS = [
  { name: "Megan Lee", initials: "ML", date: "a month ago", rating: 5, text: "We switched to Rankin after spending hundreds on mediocre service. Rankin has exceeded our expectations! They are communicative, passionate about what they do, and truly care about their customers. Highly recommend!" },
  { name: "Buffy Nehring", initials: "BN", date: "a month ago", rating: 5, text: "They are a family owned business. They are always on time for pickup. They provide amazing customer service. They have quick response should you have questions. They treat you like family not just another account. They have great pricing. I highly recommend them, reach today and signup for their service you will not regret it." },
  { name: "Deborah Headley", initials: "DH", date: "a month ago", rating: 5, text: "Rankin Waste is a great family owned business. They provide an awesome service and are always on time. They will let you know if they cannot make it for service like they had to recently during the ice storm. I encourage anyone looking for a reliable trash company to give them a call." },
  { name: "Jason Seay", initials: "JS", date: "a month ago", rating: 5, text: "Just got off the phone to switch our service to this company. No computer to deal with, spoke to the owner. She was very cordial, prices are great, simple no hassle. We start next end of next month! Oh to be free from the Trash Mafia! Go Rankin!" },
  { name: "Tim Owen Real Estate", initials: "TO", date: "a month ago", rating: 5, text: "So grateful for Rankin Waste Management Service! Great to have affordable local service who is consistent with their service, and allows very ample quantities for pick up. Highly recommended!" },
  { name: "Stacy Watson", initials: "SW", date: "a month ago", rating: 5, text: "I've supported Rankin Waste Management since they first started, and they've consistently been reliable and on time. Great service and great people - proud to support a dependable local business!" },
  { name: "Sherri Almond", initials: "SA", date: "a month ago", rating: 5, text: "Very reliable! The previous company that did it was not reliable at all and I would find my trash alongside the highway. So glad I ran across this company." },
  { name: "Richard Murray", initials: "RM", date: "a month ago", rating: 5, text: "It is great to find a local family-owned company that provides a necessary service at a great price. Fantastic people." },
  { name: "Tiffany Houston", initials: "TH", date: "a month ago", rating: 5, text: "Very reliable friendly and great price." },
];

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = review.text.length > 180;
  return (
    <div className="gbp-rw-card">
      <div className="gbp-rw-card-header">
        <div className="gbp-rw-avatar">{review.initials}</div>
        <div className="gbp-rw-card-meta">
          <span className="gbp-rw-author">{review.name}</span>
          <span className="gbp-rw-date">{review.date}</span>
        </div>
      </div>
      <div className="gbp-rw-card-stars">
        {Array.from({length: review.rating}).map((_,i) => <span key={i}>{STAR}</span>)}
      </div>
      <p className={`gbp-rw-card-text${needsTruncate && !expanded ? ' truncated' : ''}`}>{review.text}</p>
      {needsTruncate && (
        <button className="gbp-rw-read-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      <div className="gbp-rw-card-footer">
        {GOOGLE_ICON_SM}
        <span>Posted on Google</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const autoRef = useRef(null);

  const getPerView = () => {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  };

  const totalPages = Math.max(1, REVIEWS.length - perView + 1);

  useEffect(() => {
    const handleResize = () => {
      const pv = getPerView();
      setPerView(pv);
      setCurrent(0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const startAuto = () => {
      clearInterval(autoRef.current);
      autoRef.current = setInterval(() => {
        setCurrent(c => (c + 1) % totalPages);
      }, 6000);
    };
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [totalPages]);

  const goTo = (i) => {
    const next = Math.max(0, Math.min(i, totalPages - 1));
    setCurrent(next);
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % totalPages);
    }, 6000);
  };

  // Touch swipe
  const touchStart = useRef(0);
  const touchMove = useRef(0);

  const getTranslate = () => {
    if (!trackRef.current) return 0;
    const card = trackRef.current.querySelector('.gbp-rw-card');
    if (!card) return 0;
    const cardW = card.offsetWidth + 20; // 20px gap
    return -(current * cardW);
  };

  return (
    <>
      <PageHead
        title="Reviews - Rankin Waste Management"
        description="Read reviews from Rankin Waste Management customers. See why families in Hubbard, TX and surrounding communities trust us for reliable trash pickup."
      />
      <InnerHero title="Reviews" />

      <style>{`
        .gbp-reviews-widget {
          --rw-bg: #0d0d0d;
          --rw-card-bg: #1a1a1a;
          --rw-card-border: #2a2a2a;
          --rw-accent: #e8913a;
          --rw-accent-hover: #f0a050;
          --rw-text: #ffffff;
          --rw-text-muted: #a0a0a0;
          --rw-star: #FBBC04;
          --rw-radius: 12px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
          background: var(--rw-bg);
          color: var(--rw-text);
          padding: 60px 24px;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .gbp-reviews-widget *, .gbp-reviews-widget *::before, .gbp-reviews-widget *::after { box-sizing: border-box; }
        .gbp-rw-header { text-align: center; margin-bottom: 48px; }
        .gbp-rw-header h2 { font-size: 2rem; font-weight: 700; color: var(--rw-text); margin-bottom: 20px; }
        .gbp-rw-aggregate { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .gbp-rw-score { font-size: 3.2rem; font-weight: 700; color: var(--rw-text); line-height: 1; }
        .gbp-rw-stars-block { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
        .gbp-rw-stars { display: flex; gap: 3px; }
        .gbp-rw-stars svg { width: 22px; height: 22px; fill: var(--rw-star); }
        .gbp-rw-count { font-size: 0.9rem; color: var(--rw-text-muted); }
        .gbp-rw-google-badge { display: inline-flex; align-items: center; gap: 8px; margin-top: 12px; padding: 8px 16px; background: #1a1a1a; border: 1px solid var(--rw-card-border); border-radius: 100px; font-size: 0.85rem; color: var(--rw-text-muted); text-decoration: none; transition: border-color 0.2s; }
        .gbp-rw-google-badge:hover { border-color: var(--rw-accent); }
        .gbp-rw-carousel-wrap { position: relative; overflow: hidden; }
        .gbp-rw-carousel { display: flex; gap: 20px; transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94); will-change: transform; }
        .gbp-rw-card { flex: 0 0 calc(33.333% - 14px); background: var(--rw-card-bg); border: 1px solid var(--rw-card-border); border-radius: var(--rw-radius); padding: 28px 24px; display: flex; flex-direction: column; gap: 14px; transition: border-color 0.25s; }
        .gbp-rw-card:hover { border-color: var(--rw-accent); }
        .gbp-rw-card-header { display: flex; align-items: center; gap: 12px; }
        .gbp-rw-avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--rw-accent); color: #000; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0; text-transform: uppercase; }
        .gbp-rw-card-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .gbp-rw-author { font-weight: 600; font-size: 0.95rem; color: var(--rw-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gbp-rw-date { font-size: 0.8rem; color: var(--rw-text-muted); }
        .gbp-rw-card-stars { display: flex; gap: 2px; }
        .gbp-rw-card-stars svg { width: 18px; height: 18px; fill: var(--rw-star); }
        .gbp-rw-card-text { font-size: 0.92rem; line-height: 1.6; color: #d0d0d0; flex: 1; }
        .gbp-rw-card-text.truncated { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
        .gbp-rw-read-more { background: none; border: none; color: var(--rw-accent); font-size: 0.85rem; cursor: pointer; padding: 0; font-family: inherit; transition: color 0.2s; align-self: flex-start; }
        .gbp-rw-read-more:hover { color: var(--rw-accent-hover); }
        .gbp-rw-card-footer { display: flex; align-items: center; gap: 6px; margin-top: auto; padding-top: 8px; border-top: 1px solid var(--rw-card-border); }
        .gbp-rw-card-footer span { font-size: 0.75rem; color: var(--rw-text-muted); }
        .gbp-rw-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 36px; }
        .gbp-rw-nav-btn { width: 44px; height: 44px; border-radius: 50%; background: var(--rw-card-bg); border: 1px solid var(--rw-card-border); color: var(--rw-text); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
        .gbp-rw-nav-btn:hover { background: var(--rw-accent); border-color: var(--rw-accent); color: #000; }
        .gbp-rw-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; background: var(--rw-card-bg); border-color: var(--rw-card-border); color: var(--rw-text); }
        .gbp-rw-nav-btn svg { width: 20px; height: 20px; }
        .gbp-rw-dots { display: flex; gap: 8px; }
        .gbp-rw-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--rw-card-border); border: none; cursor: pointer; padding: 0; transition: background 0.25s, transform 0.25s; }
        .gbp-rw-dot.active { background: var(--rw-accent); transform: scale(1.25); }
        .gbp-rw-cta { text-align: center; margin-top: 40px; }
        .gbp-rw-cta a { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: var(--rw-accent); color: #000; font-weight: 600; font-size: 0.95rem; border-radius: 100px; text-decoration: none; transition: background 0.2s, transform 0.15s; }
        .gbp-rw-cta a:hover { background: var(--rw-accent-hover); transform: translateY(-1px); }
        @media (max-width: 1024px) { .gbp-rw-card { flex: 0 0 calc(50% - 10px); } }
        @media (max-width: 640px) { .gbp-reviews-widget { padding: 40px 16px; } .gbp-rw-header h2 { font-size: 1.5rem; } .gbp-rw-score { font-size: 2.5rem; } .gbp-rw-card { flex: 0 0 100%; padding: 22px 18px; } }
      `}</style>

      <div className="gbp-reviews-widget"
        onMouseEnter={() => clearInterval(autoRef.current)}
        onMouseLeave={() => {
          autoRef.current = setInterval(() => setCurrent(c => (c + 1) % totalPages), 6000);
        }}
      >
        {/* Header */}
        <div className="gbp-rw-header">
          <h2>What Our Customers Say</h2>
          <div className="gbp-rw-aggregate">
            <span className="gbp-rw-score">4.9</span>
            <div className="gbp-rw-stars-block">
              <div className="gbp-rw-stars">
                {STAR}{STAR}{STAR}{STAR}{HALF_STAR}
              </div>
              <span className="gbp-rw-count">Based on 9 Google reviews</span>
            </div>
          </div>
          <a className="gbp-rw-google-badge" href="https://g.page/r/CWKDYKs3ZdMyEBM" target="_blank" rel="noopener noreferrer">
            {GOOGLE_ICON}
            Google Reviews
          </a>
        </div>

        {/* Carousel */}
        <div className="gbp-rw-carousel-wrap">
          <div
            className="gbp-rw-carousel"
            ref={trackRef}
            style={{ transform: `translateX(${getTranslate()}px)` }}
            onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
            onTouchMove={e => { touchMove.current = e.touches[0].clientX; }}
            onTouchEnd={() => {
              const diff = touchStart.current - touchMove.current;
              if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(current + 1);
                else goTo(current - 1);
              }
            }}
          >
            {REVIEWS.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        {/* Navigation */}
        <div className="gbp-rw-nav">
          <button className="gbp-rw-nav-btn" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous reviews">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="gbp-rw-dots">
            {Array.from({length: totalPages}).map((_, i) => (
              <button key={i} className={`gbp-rw-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to review page ${i+1}`} />
            ))}
          </div>
          <button className="gbp-rw-nav-btn" onClick={() => goTo(current + 1)} disabled={current >= totalPages - 1} aria-label="Next reviews">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* CTA */}
        <div className="gbp-rw-cta">
          <a href="https://g.page/r/CWKDYKs3ZdMyEBM/review" target="_blank" rel="noopener noreferrer">
            Leave Us a Review on Google
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M7 7h10v10"/></svg>
          </a>
        </div>
      </div>

      {/* Review Schema Markup (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Rankin Waste Management",
        "telephone": "(254) 205-6125",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "9",
          "bestRating": "5"
        },
        "review": REVIEWS.map(r => ({
          "@type": "Review",
          "author": {"@type": "Person", "name": r.name},
          "reviewRating": {"@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5"},
          "reviewBody": r.text
        }))
      })}} />
    </>
  );
}
