import React, { useState, useRef, useEffect } from "react";

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

const PLACE_ID = "ChIJ2RjursUVj2ARXWN2q_c1MzI";
const REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

const GoogleIcon = () => (
  <svg className="rw-google-badge" width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F4B400">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CSS = `
.rw-reviews-widget {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #1a1a1a;
  color: #ffffff;
}

.rw-header {
  text-align: center;
  margin-bottom: 32px;
}

.rw-header h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #ffffff;
}

.rw-header h2 .rw-highlight {
  color: #E8751A;
}

.rw-aggregate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rw-aggregate-score {
  font-size: 24px;
  font-weight: 700;
  color: #F4B400;
}

.rw-aggregate-stars {
  display: flex;
  gap: 2px;
}

.rw-aggregate-text {
  color: #9ca3af;
  font-size: 14px;
}

.rw-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #E8751A;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  transition: opacity 0.2s;
}

.rw-cta-link:hover {
  opacity: 0.8;
}

.rw-carousel-wrapper {
  position: relative;
  overflow: hidden;
}

.rw-carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 10px 0;
}

.rw-carousel::-webkit-scrollbar {
  display: none;
}

.rw-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(232, 117, 26, 0.9);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 18px;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.rw-nav-btn:hover {
  background: #E8751A;
}

.rw-nav-prev {
  left: 8px;
}

.rw-nav-next {
  right: 8px;
}

.rw-card {
  flex: 0 0 360px;
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  border: 1px solid #3a3a3a;
  transition: border-color 0.2s;
}

.rw-card:hover {
  border-color: #E8751A;
}

.rw-google-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0.6;
}

.rw-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.rw-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E8751A, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  flex-shrink: 0;
}

.rw-reviewer-info {
  display: flex;
  flex-direction: column;
}

.rw-reviewer-name {
  font-weight: 600;
  font-size: 15px;
  color: #ffffff;
}

.rw-review-date {
  font-size: 12px;
  color: #9ca3af;
}

.rw-stars {
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
}

.rw-review-text {
  font-size: 14px;
  line-height: 1.6;
  color: #d1d5db;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rw-review-text.rw-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}

.rw-read-more {
  background: none;
  border: none;
  color: #E8751A;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 0;
  margin-top: 4px;
  font-weight: 500;
}

.rw-read-more:hover {
  text-decoration: underline;
}

.rw-tag {
  display: inline-block;
  margin-top: 12px;
  padding: 4px 12px;
  background: rgba(232, 117, 26, 0.15);
  color: #E8751A;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .rw-card {
    flex: 0 0 320px;
  }
  .rw-header h2 {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .rw-card {
    flex: 0 0 290px;
  }
  .rw-reviews-widget {
    padding: 24px 12px;
  }
  .rw-header h2 {
    font-size: 22px;
  }
}

@media (max-width: 320px) {
  .rw-card {
    flex: 0 0 calc(100vw - 44px);
  }
}
`;

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rankin Waste Management",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "60",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": REVIEWS.map((r) => ({
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

export default function ReviewWidget() {
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
    const scrollAmount = 380;
    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
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

      <div className="rw-header">
        <h2>
          What Our <span className="rw-highlight">Customers</span> Say
        </h2>
        <div className="rw-aggregate">
          <span className="rw-aggregate-score">5.0</span>
          <div className="rw-aggregate-stars">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
        <div className="rw-aggregate-text">from 60+ reviews</div>
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rw-cta-link"
        >
          Leave Us a Review
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>

      <div className="rw-carousel-wrapper">
        <button
          className="rw-nav-btn rw-nav-prev"
          onClick={() => scroll("prev")}
          aria-label="Previous reviews"
        >
          &#8249;
        </button>

        <div className="rw-carousel" ref={carouselRef}>
          {REVIEWS.map((review, index) => (
            <div className="rw-card" key={index}>
              <GoogleIcon />
              <div className="rw-card-header">
                <div className="rw-avatar">{review.initials}</div>
                <div className="rw-reviewer-info">
                  <span className="rw-reviewer-name">{review.name}</span>
                  <span className="rw-review-date">{review.date}</span>
                </div>
              </div>
              <div className="rw-stars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p
                className={`rw-review-text${expandedCards[index] ? " rw-expanded" : ""}`}
              >
                {review.text}
              </p>
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
          &#8250;
        </button>
      </div>
    </div>
  );
}
