import React, { useState, useRef } from "react";

const REVIEWS = [
  { name: "Kayla Jones", initials: "KJ", date: "3 hours ago", text: "If you're looking for a waste service that truly goes above and beyond, Rankin Waste Management is it. Tommy and Sydney are reliable, affordable, and somehow still the kind of people who show up for everything like ballgames, school events, and anything that supports our kids and community. They run their business the way small-town businesses should be run, treating people like family, not just customers. What really sets them apart is that they're not just serving the community, they're part of it. 10/10 recommend.", tag: "Community" },
  { name: "Mary McCaghren", initials: "MM", date: "Yesterday", text: "If you live out in the country, you know trash pickup can be a little adventurous. Dogs, rogue livestock, protective roosters! But Rankin Waste Management shows up like clockwork. Rain, shine, or that classic Texas \"is it a tornado or just Thursday in spring?\" weather\u2014they're out there getting it done. Out here, reliable trash pickup is a luxury and these folks deliver. If they can handle rural routes without blinking, they deserve every one of these five stars.", tag: "Rural Service" },
  { name: "Kelly Meier", initials: "KM", date: "3 days ago", text: "We had problems with our previous trash collecting company and when I needed to change, Rankin was so professional. It was nice to talk to an actual person on the phone rather than a computer and their customer service is off the charts. Whatever we need, they respond right away. I cannot recommend them enough.", tag: "Customer Service" },
  { name: "Megan Lee", initials: "ML", date: "5 weeks ago", text: "We switched to Rankin after spending hundreds on mediocre service. Rankin has exceeded our expectations! They are communicative, passionate about their business and keeping it, and local! I love that they now provide trash cans! Give them a text or call, I promise you'll get an answer for every question!", tag: "Great Price" },
  { name: "Reagan McCurlie", initials: "RM", date: "Yesterday", text: "This company is awesome, ran by even better people. They value their customers and always answer any question you may have. I switched from a big trash company to Rankin Waste and I will never go back.", tag: "Switched & Stayed" },
  { name: "Jenny Kelley", initials: "JK", date: "1 hour ago", text: "Rankin Waste Management does amazing job. They are always consistent and communicate with the customers if there will be a delayed pick up for any reason. Delays are few and far between. We live in a rural area and trash pick up was rare or inconsistent before Rankin. We highly recommend them.", tag: "Reliable" },
  { name: "Buffy Nehring", initials: "BN", date: "4 days ago", text: "They are a family owned business. They are always on time for pickup. They provide amazing customer service. They have quick response should you have questions. They treat you like family not just another account. They have great pricing. I highly recommend them, reach today and signup for their service you will not regret it.", tag: "Family Owned" },
  { name: "Lynn Moore", initials: "LM", date: "3 days ago", text: "We could not ask for better people and a great company...you are always on time and notifying us when we have time/day changes due to holiday or other circumstances. We would highly recommend this company for all your waste management. Not only do they work hard on making their customers happy they are kind and friendly to us all!!!", tag: "On Time" },
  { name: "Cody Lane", initials: "CL", date: "Yesterday", text: "Switched to Rankin after being with Frontier for over ten years and have not regretted it one bit. We have had the best customer service and experience overall.", tag: "Switched & Stayed" },
  { name: "Jason Seay", initials: "JS", date: "5 weeks ago", text: "Just got off the phone to switch our service to this company. No computer to deal with, spoke to the owner. She was very cordial, prices are great, simple, no hassle. We start next month! Oh to be free from the Trash Mafia! Go Rankin!", tag: "Personal Touch" },
  { name: "Linda Mcnutt", initials: "LM", date: "3 days ago", text: "Rankin Waste Management has been our weekly waste pick up for several years and have been reliable and often pick up extra bags for us at no extra cost. I would certainly recommend them.", tag: "Extra Mile" },
  { name: "Deborah Headley", initials: "DH", date: "6 weeks ago", text: "Rankin Waste is a great family owned business. They provide an awesome service and are always on time. They will let you know if they cannot make it for service like they had to recently during the ice storm. I encourage anyone looking for a reliable trash company to give them a call.", tag: "Dependable" },
  { name: "John Null", initials: "JN", date: "4 days ago", text: "I cannot say enough good things about the AMAZING service Rankin Waste provides. If you're looking for a trash service your search is over!", tag: "Amazing Service" },
  { name: "Randy McDonald", initials: "RM", date: "3 days ago", text: "I have lived at this address for over 20 years and this has been by far the best garbage pick up that we have ever had.", tag: "20+ Years" },
];

const GoogleG = ({ className, width = 20, height = 20 }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const StarSVG = ({ className, width = 22, height = 22 }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CSS = `.rw-reviews-widget { font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: transparent; padding: 60px 20px; max-width: 100%; overflow: hidden; position: relative; color: #fff; }
.rw-reviews-widget * { box-sizing: border-box; margin: 0; padding: 0; }
.rw-header { text-align: center; max-width: 700px; margin: 0 auto 40px; }
.rw-header-badge { display: inline-flex; align-items: center; gap: 8px; background: #181818; border: 1px solid #2a2a2a; border-radius: 50px; padding: 8px 18px; margin-bottom: 20px; }
.rw-google-icon { width: 20px; height: 20px; }
.rw-header-badge span { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); letter-spacing: 0.5px; text-transform: uppercase; }
.rw-header h2 { font-size: 36px; font-weight: 700; color: #fff; margin-bottom: 12px; line-height: 1.2; }
.rw-header h2 em { font-style: normal; color: #E8751A; }
.rw-aggregate { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 16px; }
.rw-stars { display: flex; gap: 3px; }
.rw-star { width: 22px; height: 22px; fill: #F59E0B; }
.rw-rating-text { font-size: 16px; color: rgba(255,255,255,0.7); font-weight: 400; }
.rw-rating-text strong { color: #fff; font-weight: 700; }
.rw-carousel-wrapper { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 50px; }
.rw-carousel { display: flex; gap: 20px; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding: 10px 0 20px; }
.rw-carousel::-webkit-scrollbar { display: none; }
.rw-card { flex: 0 0 360px; scroll-snap-align: start; background: #181818; border: 1px solid #2a2a2a; border-radius: 16px; padding: 28px; transition: border-color 0.3s ease, transform 0.3s ease; position: relative; }
.rw-card:hover { border-color: #E8751A; transform: translateY(-3px); }
.rw-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.rw-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #E8751A, #F59E0B); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #fff; flex-shrink: 0; }
.rw-reviewer-info { flex: 1; }
.rw-reviewer-name { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.3; }
.rw-review-date { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
.rw-card-stars { display: flex; gap: 2px; margin-bottom: 14px; }
.rw-card-star { width: 16px; height: 16px; fill: #F59E0B; }
.rw-review-text { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.75); display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
.rw-card.rw-expanded .rw-review-text { -webkit-line-clamp: unset; display: block; }
.rw-read-more { background: none; border: none; color: #E8751A; font-size: 13px; font-weight: 600; cursor: pointer; padding: 8px 0 0; font-family: inherit; transition: color 0.2s; }
.rw-read-more:hover { color: #F59E0B; }
.rw-google-badge { position: absolute; top: 20px; right: 20px; width: 18px; height: 18px; opacity: 0.3; transition: opacity 0.3s; }
.rw-card:hover .rw-google-badge { opacity: 0.6; }
.rw-tag { display: inline-block; background: rgba(232, 117, 26, 0.12); color: #E8751A; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; margin-top: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
.rw-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: #181818; border: 1px solid #2a2a2a; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; z-index: 10; }
.rw-nav-btn:hover { background: #E8751A; border-color: #E8751A; }
.rw-nav-prev { left: 0; }
.rw-nav-next { right: 0; }
.rw-nav-btn svg { width: 20px; height: 20px; fill: currentColor; }
.rw-cta-wrap { text-align: center; margin-top: 40px; }
.rw-cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #E8751A; color: #fff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 50px; transition: all 0.3s; border: 2px solid #E8751A; }
.rw-cta-btn:hover { background: transparent; color: #E8751A; }
.rw-cta-btn svg { width: 18px; height: 18px; fill: currentColor; }
@media (max-width: 1024px) { .rw-card { flex: 0 0 320px; } }
@media (max-width: 768px) { .rw-reviews-widget { padding: 40px 16px; } .rw-header h2 { font-size: 28px; } .rw-carousel-wrapper { padding: 0 44px; } .rw-card { flex: 0 0 260px; padding: 22px; } .rw-nav-btn { width: 36px; height: 36px; } .rw-nav-btn svg { width: 18px; height: 18px; } .rw-nav-prev { left: 2px; } .rw-nav-next { right: 2px; } }
@media (max-width: 480px) { .rw-card { flex: 0 0 calc(85vw - 16px); } .rw-header h2 { font-size: 24px; } }
.rw-slide-hint { display: none; }
@media (max-width: 768px) { .rw-slide-hint { display: flex; align-items: center; justify-content: center; gap: 6px; color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 500; margin-top: -4px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; } }`;

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rankin Waste Management",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Rankin",
    "addressRegion": "TX",
    "postalCode": "79778",
    "addressCountry": "US"
  },
  "telephone": "+1-432-693-2521",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": REVIEWS.slice(0, 6).map((r) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": r.name,
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
    },
    "reviewBody": r.text,
  })),
};

export default function ReviewWidget({ hideHeader = false }) {
  const [expandedCards, setExpandedCards] = useState({});
  const carouselRef = useRef(null);

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "next" ? 380 : -380,
      behavior: "smooth",
    });
  };

  return (
    <div className="rw-reviews-widget">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {!hideHeader && (
        <div className="rw-header">
          <div className="rw-header-badge">
            <GoogleG className="rw-google-icon" width={20} height={20} />
            <span>Google Reviews</span>
          </div>
          <h2>
            What Our <em>Customers</em> Say
          </h2>
          <div className="rw-aggregate">
            <div className="rw-stars">
              {[...Array(5)].map((_, i) => (
                <StarSVG key={i} className="rw-star" width={22} height={22} />
              ))}
            </div>
            <span className="rw-rating-text">
              <strong>5.0</strong> from 250+ reviews
            </span>
          </div>
        </div>
      )}

      <div className="rw-carousel-wrapper">
        <button
          className="rw-nav-btn rw-nav-prev"
          onClick={() => scroll("prev")}
          aria-label="Previous reviews"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div className="rw-carousel" ref={carouselRef}>
          {REVIEWS.map((review, index) => (
            <div
              className={`rw-card${expandedCards[index] ? " rw-expanded" : ""}`}
              key={index}
            >
              <GoogleG className="rw-google-badge" width={18} height={18} />
              <div className="rw-card-header">
                <div className="rw-avatar">{review.initials}</div>
                <div className="rw-reviewer-info">
                  <div className="rw-reviewer-name">{review.name}</div>
                  <div className="rw-review-date">{review.date}</div>
                </div>
              </div>
              <div className="rw-card-stars">
                {[...Array(5)].map((_, i) => (
                  <StarSVG key={i} className="rw-card-star" width={16} height={16} />
                ))}
              </div>
              <p className="rw-review-text">{review.text}</p>
              <button
                className="rw-read-more"
                onClick={() => toggleExpand(index)}
              >
                {expandedCards[index] ? "Show less" : "Read more"}
              </button>
              <div>
                <span className="rw-tag">{review.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="rw-nav-btn rw-nav-next"
          onClick={() => scroll("next")}
          aria-label="Next reviews"
        >
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>

      <div className="rw-slide-hint" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
        Swipe to see more reviews
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></svg>
      </div>

      <div className="rw-cta-wrap">
        <a
          href="https://g.page/r/CWKDYKs3ZdMyEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="rw-cta-btn"
        >
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" opacity=".7" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="currentColor" opacity=".7" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" opacity=".7" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" opacity=".7" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Leave Us a Review
        </a>
      </div>
    </div>
  );
}
