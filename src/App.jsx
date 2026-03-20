import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* ═══════════════════════ SCROLL REVEAL HOOK ═══════════════════════ */

const useReveal = (options = {}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ═══════════════════════ DESIGN ELEMENTS ═══════════════════════ */

const LogoMark = ({ opacity = 1, size = 'sm' }) => {
  const sizes = { sm: 'h-6 w-auto', md: 'h-8 w-auto', lg: 'h-10 w-auto' };
  return (
    <img
      src="/rw-logo.png"
      alt="RW"
      className={`${sizes[size] || sizes.sm} object-contain brightness-0 invert`}
      style={{ opacity }}
    />
  );
};

const Tag = ({ children, bright = false }) => (
  <span className={`text-xs uppercase tracking-wider px-3 py-1 border rounded-full ${bright ? 'text-white border-white' : 'text-text-muted border-border-subtle'}`}>
    {children}
  </span>
);

/* ═══════════════════════ ICONS ═══════════════════════ */

const PhoneIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-star">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const MailIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const MapPinIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ClockIcon = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* ═══════════════════════ DATA ═══════════════════════ */

const PHONE = '(254) 205-6125';
const PHONE_LINK = 'tel:+12542056125';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Coverage Areas', href: '#areas' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Our Family', href: '#about' },
];

const SERVICE_AREAS = [
  { city: 'Hubbard', state: 'TX', desc: 'Our home base in Hill County. This is where Tommy and Sydney live and where Rankin Waste Management started.', lat: 31.8468, lng: -96.7978, radius: 6000 },
  { city: 'Axtell', state: 'TX', desc: 'One of our core service areas in McLennan County. Whether you\'re right off Highway 31 or further out on the county roads, we run weekly routes through Axtell and the surrounding area.', lat: 31.6721, lng: -96.9712, radius: 5000 },
  { city: 'Dawson', state: 'TX', desc: 'We serve families and households throughout Dawson in Navarro County with the same reliable weekly pickup. Dawson\'s a small town that deserves dependable service, and that\'s exactly what we deliver.', lat: 31.8979, lng: -96.7120, radius: 5000 },
  { city: 'Malone', state: 'TX', desc: 'Malone sits right along Highway 31 between Hubbard and Waco, and we\'ve got it covered. Weekly curbside collection for Malone residents who want a local company they can actually reach on the phone.', lat: 31.9168, lng: -96.8900, radius: 4500 },
  { city: 'Purdon', state: 'TX', desc: 'Purdon is a tight-knit Navarro County community, and we\'re proud to serve the families out there with affordable weekly pickup.', lat: 31.9468, lng: -96.6181, radius: 4000 },
  { city: 'Mertens', state: 'TX', desc: 'Just south of Hubbard in Hill County, Mertens is part of our regular weekly route.', lat: 31.7896, lng: -96.7900, radius: 4000 },
  { city: 'Whitney', state: 'TX', desc: 'One of our service areas in Hill County, right near Lake Whitney. We provide weekly pickup to Whitney residents who prefer a local, family-owned company over the big national haulers.', lat: 31.9512, lng: -97.3212, radius: 5500 },
  { city: 'Mount Calm', state: 'TX', desc: 'We serve Mount Calm and the surrounding area with weekly trash collection. Located in Hill County between Hubbard and Waco.', lat: 31.7590, lng: -96.8821, radius: 4000 },
  { city: 'Peoria', state: 'TX', desc: 'Peoria sits in Hill County along FM 1304, and we run routes out that way for weekly residential pickup.', lat: 31.8321, lng: -96.9150, radius: 4000 },
  { city: 'Birome', state: 'TX', desc: 'We cover Birome and the surrounding area in Hill County for weekly curbside collection.', lat: 31.9900, lng: -96.8300, radius: 4000 },
  { city: 'Prairie Hill', state: 'TX', desc: 'Prairie Hill is on our route for weekly trash pickup in Limestone County. Rural service is what we do. No road is too far off the beaten path.', lat: 31.6607, lng: -96.7998, radius: 4500 },
  { city: 'Navarro Mills', state: 'TX', desc: 'Located near Navarro Mills Lake in Navarro County, we provide weekly pickup service to the Navarro Mills area.', lat: 31.9500, lng: -96.6900, radius: 4000 },
];

const FAQS = [
  { q: 'How Do I Start Trash Pickup Service With Rankin Waste?', a: 'Starting trash pickup service with Rankin Waste Management is easy. Just call us at (254) 205-6125 or fill out a service request on our contact page. We\'ll confirm your address, get you on the schedule, and in most cases you\'ll be set up for pickup within the same week. No long-term contracts required.' },
  { q: 'What Day Does Trash Get Picked Up?', a: 'Your pickup day depends on your location and which route you\'re on. When you sign up for service, we\'ll let you know your specific day. Just have your trash out by the road on the morning of your pickup day and we\'ll take care of it.' },
  { q: 'How Much Does Trash Pickup Cost in the Hubbard Area?', a: 'Trash pickup pricing in the Hubbard area varies depending on your location and service needs. We keep our rates affordable and competitive for rural families. Call us at (254) 205-6125 for a quick quote. No pressure, no commitment.' },
  { q: 'What Can I Put Out for Trash Pickup?', a: 'Standard weekly pickup covers your regular household trash in bags or cans at the curb. For larger items like furniture, appliances, or big piles of junk, ask us about our bulk pickup service. Hazardous materials like paint, chemicals, and oil are not accepted. Check with Hill County for proper disposal options for those items.' },
  { q: 'Do You Pick Up Trash Outside the Hubbard City Limits?', a: 'Yes. In fact, serving rural areas outside city limits is a big part of what we do. If you\'re on a county road, private road, or out in the country between any of our service area towns, give us a call. If we can reasonably get to you, we\'ll add you to a route.' },
  { q: 'How Does Dump Trailer Rental Work?', a: 'Dump trailer rental with Rankin Waste is simple. Call us to reserve a trailer, we deliver it to your property, and you load it on your own schedule. When you\'re done, call us and we\'ll haul it away. Great for home renovations, property cleanouts, land clearing, and estate cleanups.' },
  { q: 'What\'s the Difference Between Bulk Pickup and a Dump Trailer Rental?', a: 'Bulk pickup is for a few large items, like a couch, mattress, or a pile of stuff from a garage cleanout. We come out, load it up, and haul it off. A dump trailer rental is for bigger jobs where you need time and space to load up a large amount of debris or junk over several days. If you\'re not sure which one you need, just call us and we\'ll help you figure it out.' },
  { q: 'Do You Serve Whitney and Lake Whitney Area?', a: 'Yes, we serve Whitney, TX and the surrounding Lake Whitney area with weekly residential trash pickup, bulk pickups, and dump trailer rentals. Whitney is part of our Hill County service route.' },
];

/* ═══════════════════════ NAV ═══════════════════════ */

const Nav = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="fixed top-0 w-full h-20 flex justify-between items-center px-6 lg:px-[clamp(2rem,5vw,4rem)] z-50" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0) 100%)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
    <a href="#top" className="flex items-center gap-3 font-bold text-sm tracking-[0.15em] uppercase">
      <LogoMark />
      Rankin Waste
    </a>

    <div className="hidden lg:flex gap-8 text-[0.9rem] font-medium">
      {NAV_LINKS.map(link => (
        <a key={link.label} href={link.href} className="opacity-70 hover:opacity-100 transition-opacity duration-300">
          {link.label}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <a href={PHONE_LINK} className="bg-white text-dark px-5 py-2.5 rounded-full font-semibold text-[0.9rem] btn-smooth min-h-[44px] flex items-center">
        {PHONE}
      </a>
      <button
        className="lg:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>
    </div>

    {mobileMenuOpen && (
      <div className="absolute top-20 left-0 w-full bg-dark/95 backdrop-blur-lg border-t border-border-subtle lg:hidden flex flex-col px-6 py-6 gap-4">
        {NAV_LINKS.map(link => (
          <a key={link.label} href={link.href} className="text-white/70 hover:text-white font-medium text-[0.9rem] py-2 transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    )}
  </nav>
);

/* ═══════════════════════ HERO ═══════════════════════ */

const Hero = ({ onRequestService }) => (
  <header id="top" className="h-screen min-h-[700px] w-full flex flex-col justify-end px-6 lg:px-[clamp(2rem,5vw,4rem)] pb-[8vh] relative overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src="/truck-side.png" alt="" className="w-full h-full object-cover object-center hero-image-animate" loading="eager" fetchPriority="high" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.4) 30%, rgba(8,8,8,0.5) 60%, rgba(8,8,8,0.85) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,12,2,0.6) 0%, transparent 60%)' }} />
    </div>
    {/* Top meta */}
    <div className="absolute top-20 md:top-[calc(80px+2rem)] left-6 lg:left-[clamp(2rem,5vw,4rem)] flex items-center gap-3 text-xs md:text-sm font-semibold z-10 hero-badge-animate">
      <div className="w-8 h-8 rounded-full p-[2px]" style={{ background: 'linear-gradient(45deg, #E8751A, #C45A0E, #F6A84E)' }}>
        <div className="w-full h-full bg-dark rounded-full flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
      <span>Family-owned in Hubbard, TX</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8751A" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>

    <div className="max-w-[1200px] w-full mx-auto relative z-10">
      <h1 className="text-[clamp(3rem,7.5vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.04em] mb-[clamp(3rem,12vh,6rem)] max-w-[14ch] drop-shadow-lg hero-title-animate">
        Trash Pickup in Hubbard, TX - Reliable Weekly Service for Rural Communities
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 gap-8">
        <div className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed max-w-[380px] drop-shadow-md hero-content-animate">
          <strong className="block mb-2 font-semibold text-[1.1em]">Tired of missed pickups?</strong>
          Rankin Waste Management is a family-owned trash company based out of Hubbard. We show up every week, on schedule, because that's what we do.
        </div>

        <div className="flex items-center gap-4 hero-buttons-animate">
          <a href={PHONE_LINK} className="bg-white text-dark px-6 py-3 rounded-full font-bold text-[0.9rem] btn-smooth min-h-[44px] flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            Call Now
          </a>
          <button onClick={onRequestService} className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-[0.9rem] hover:bg-white/10 transition-all duration-300 min-h-[44px]">
            Request Service
          </button>
        </div>
      </div>
    </div>
  </header>
);

/* ═══════════════════════ BUSINESS DESCRIPTION ═══════════════════════ */

const BusinessDescription = () => {
  const textRef = useReveal();
  const imgRef = useReveal();
  return (
    <section className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,6rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div ref={textRef} className="reveal-left">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-4 block">About Rankin Waste</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-6">Your local team,<br />your trash company.</h2>
            <div className="border-l-2 border-orange-500 pl-6 md:pl-8">
              <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4">
                Rankin Waste Management is a locally family-owned and operated small business proudly serving Hubbard, Axtell, Dawson, Malone, Mertens, Purdon, TX, and surrounding rural communities.
              </p>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                We specialize in reliable, affordable trash service with a personal touch. When you choose Rankin Waste Management, you're not just getting great service - you're supporting a local family business.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <a href={PHONE_LINK} className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-[0.9rem] btn-smooth min-h-[44px] flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Get Started
              </a>
              <div className="text-text-muted text-sm">
                <span className="block font-semibold text-white">12+ communities</span>
                served across central TX
              </div>
            </div>
          </div>
          <div ref={imgRef} className="reveal-scale relative">
            <div className="rounded-sm overflow-hidden">
              <img src="/truck-cans.jpg" alt="Rankin Waste Management truck with trash cans on a rural Texas road" className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-orange-500 text-white px-5 py-3 sm:px-6 sm:py-4 rounded-sm">
              <span className="block text-2xl sm:text-3xl font-bold leading-none">100%</span>
              <span className="text-xs sm:text-sm font-medium opacity-90">Family Owned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ WHY CHOOSE US ═══════════════════════ */

const WhyChooseUs = () => {
  const headerRef = useReveal();
  const cards = [
    { num: '01', title: 'We Actually Show Up', desc: "Every week, same day, rain or shine. If something comes up, we'll call you instead of leaving you guessing why your trash is still sitting at the curb." },
    { num: '02', title: "We're Local and We're Not Going Anywhere", desc: "Rankin Waste Management is based right here in Hubbard, TX. When you call our number, you're talking to the people who own the business and run the routes, not a call center in another state." },
    { num: '03', title: 'We Keep It Affordable', desc: "Rural families shouldn't have to overpay for a basic service. We offer one flat rate with no environmental fees, no fuel surcharges, and no long-term contracts. The price we quote is the price you pay." },
    { num: '04', title: 'We Serve the Areas Big Companies Skip', desc: "If you live outside city limits on a county road between Hubbard and Dawson, or down a private road past Malone, we'll come to you. That's the whole point." },
  ];

  return (
    <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,6rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-baseline mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Why Hubbard and Hill County Families Choose Rankin Waste</h2>
          <p className="text-text-muted text-sm">The Rankin difference.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-subtle border border-border-subtle rounded-sm">
          {cards.map((card, i) => (
            <WhyCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyCard = ({ card, index }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal stagger-${index + 1} bg-dark-card p-6 sm:p-8 lg:p-12 min-h-[240px] sm:min-h-[280px] flex flex-col justify-between card-hover`}>
      <div className="flex justify-between items-start mb-8 sm:mb-12">
        <LogoMark opacity={0.5} />
        <span className="font-mono text-sm text-text-muted tracking-wider">{card.num}.</span>
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight mb-3">{card.title}</h3>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed">{card.desc}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════ REVIEWS ═══════════════════════ */

const Reviews = () => {
  const headerRef = useReveal();
  const widgetRef = useReveal();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  return (
    <section id="reviews" className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,6rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-baseline mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">What Our Customers Say</h2>
        </div>
        <div ref={widgetRef} className="reveal">
          <iframe
            className="lc_reviews_widget"
            src="https://reputationhub.site/reputation/widgets/review_widget/rFlq3Y1VRHN6jfB22fkr?widgetId=69bdce0ddeb65e7ddada83c5"
            frameBorder="0"
            scrolling="no"
            style={{ minWidth: '100%', width: '100%' }}
            title="Customer Reviews"
          />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ SERVICES ═══════════════════════ */

const Services = () => {
  const headerRef = useReveal();
  const services = [
    {
      num: '01',
      title: 'Weekly Pickup',
      desc: "Most of our customers are homeowners and families who just need their trash picked up once a week without any hassle. That's our bread and butter. We provide curbside collection on your scheduled pickup day. Set your bags or cans out by the road before we come through, and we take care of the rest. No sorting, no complicated rules. Just dependable weekly service. We serve homes throughout Hubbard and across Hill County, Navarro County, Limestone County, and McLennan County.",
      tags: ['Family Owned', 'Competitive Pricing', 'Reliable'],
      icon: 'bars',
    },
    {
      num: '02',
      title: 'Bulk Pickup',
      desc: "Got something too big for the weekly pickup? Old furniture, a busted appliance, mattresses, or a pile of junk from cleaning out the garage. We can handle it. Our bulk pickup service is for those times when your regular trash day isn't enough. Instead of letting that old couch sit in the yard for weeks or trying to haul it to the dump yourself, give us a call. We'll work with you to schedule a pickup that fits your timeline.",
      tags: ['Flexible Scheduling', 'Large Items'],
      icon: 'lines',
    },
    {
      num: '03',
      title: 'Dump Trailer Rentals',
      desc: "Sometimes a bulk pickup isn't enough. You need a trailer. Whether you're doing a major cleanout, a renovation project, clearing land, or just have years of accumulated stuff to get rid of, our dump trailer rentals give you the space and time to load at your own pace. We deliver the dump trailer to your property, you fill it up on your schedule, and we haul it away when you're done.",
      tags: ['Drop-off & Pick-up', 'Flexible Terms', 'Central Texas'],
      icon: 'lines',
    },
  ];

  return (
    <section id="services" className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,6rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-baseline mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Our Services</h2>
          <p className="text-text-muted text-sm">What we offer.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-subtle border border-border-subtle rounded-sm">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service: s, index: i }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal stagger-${i + 1} bg-dark-card p-6 sm:p-8 lg:p-12 flex flex-col justify-between min-h-[350px] sm:min-h-[400px] ${i === 2 ? 'md:col-span-2' : ''} card-hover`}>
      <div className="flex justify-between items-start mb-10 sm:mb-16">
        {s.icon === 'bars' ? (
          <LogoMark opacity={0.5} />
        ) : (
          <div className="flex flex-col gap-1 opacity-50 w-6">
            <span className="h-[2px] w-full bg-white block" />
            <span className="h-[2px] w-full bg-white block" />
          </div>
        )}
        <span className="font-mono text-sm text-text-muted tracking-wider">{s.num}.</span>
      </div>
      <div>
        <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-medium tracking-tight leading-[1.1] mb-3">{s.title}</h2>
        <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-full sm:max-w-[85%] md:max-w-[80%] mb-6">{s.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {s.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-300 font-semibold text-sm transition-colors duration-300 inline-flex items-center gap-2">
          Call {PHONE} to get started
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

/* ═══════════════════════ SERVICE AREA MAP ═══════════════════════ */

const ServiceAreaMap = () => {
  const ref = useReveal();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div ref={ref} className="reveal-scale mt-10 md:mt-12 rounded-sm overflow-hidden border border-border-subtle" style={{ height: 'clamp(350px, 55vw, 500px)' }}>
      <MapContainer
        center={isMobile ? [31.82, -96.95] : [31.84, -96.85]}
        zoom={isMobile ? 9 : 10}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        {SERVICE_AREAS.map(area => (
          <Circle
            key={area.city}
            center={[area.lat, area.lng]}
            radius={area.radius}
            pathOptions={{
              color: '#E8751A',
              fillColor: '#E8751A',
              fillOpacity: 0.2,
              weight: 2,
              opacity: 0.8,
            }}
          >
            <Tooltip
              permanent
              direction="center"
              className="service-area-label"
            >
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '11px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                {area.city}
              </span>
            </Tooltip>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

/* ═══════════════════════ SERVICE AREAS ═══════════════════════ */

const ServiceAreaDetail = ({ area }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className="text-[1.25rem] sm:text-[1.75rem] md:text-[2rem] font-medium tracking-tight text-text-muted hover:text-white transition-colors duration-300 cursor-pointer flex items-baseline gap-2"
        onClick={() => setOpen(!open)}
      >
        {area.city}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <p className="text-text-muted text-sm leading-relaxed max-w-[400px] pl-1">{area.desc}</p>
      </div>
    </div>
  );
};

const ServiceAreas = () => {
  const headerRef = useReveal();
  const citiesRef = useReveal();
  return (
    <section id="areas" className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,10vw,8rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-baseline mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Areas We Serve</h2>
          <p className="text-text-muted text-sm">Serving Hill, Navarro, Limestone & McLennan County.</p>
        </div>
        <p className="text-text-muted max-w-[700px] mb-10 md:mb-12 leading-relaxed text-base">
          Rankin Waste Management provides trash pickup, bulk pickups, and dump trailer rentals across a wide area of central Texas. If you're in or around any of these communities, we can serve you. Click a city to learn more.
        </p>
        <div ref={citiesRef} className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-5 sm:gap-y-6">
          {SERVICE_AREAS.map(area => (
            <ServiceAreaDetail key={area.city} area={area} />
          ))}
          <div className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-medium tracking-tight text-text-faint">
            + Surrounding
          </div>
        </div>

        <ServiceAreaMap />

        <p className="text-text-muted mt-10 md:mt-12">
          Don't see your town listed? Give us a call at{' '}
          <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">{PHONE}</a>.
          If you're in the general area, there's a good chance we can work something out.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════ FAQ ═══════════════════════ */

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal stagger-${Math.min(index + 1, 4)} border-b border-border-subtle`}>
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-6 min-h-[44px] group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-text-muted tracking-wider shrink-0">{String(index + 1).padStart(2, '0')}.</span>
          <span className="font-medium text-[1.05rem] group-hover:text-orange-500 transition-colors duration-300">{faq.q}</span>
        </div>
        <ChevronIcon open={open} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <div className="pl-12">
          <p className="text-text-muted leading-relaxed max-w-[700px]">{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const headerRef = useReveal();
  return (
    <section id="faq" className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,6rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-baseline mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Frequently Asked Questions</h2>
          <p className="text-text-muted text-sm">Trash service in Hubbard & Hill County</p>
        </div>
        <div className="max-w-[900px]">
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ ABOUT ═══════════════════════ */

const About = () => {
  const headerRef = useReveal();
  const textRef = useReveal();
  const photoRef = useReveal();
  return (
    <section id="about" className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(4rem,8vw,6rem)]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-baseline mb-10 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">About Tommy and Sydney Rankin</h2>
          <span className="font-mono text-xs text-text-muted tracking-wider">OUR FAMILY.</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div ref={textRef} className="reveal-left space-y-5 sm:space-y-6">
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Rankin Waste Management isn't a corporation. It's Tommy and Sydney Rankin and their family, serving the same communities they live in.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              When you call <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">{PHONE}</a>, you're talking to the people who own the truck and run the routes. That means if there's ever a problem, you're not waiting on hold with a national call center. You're talking to someone who actually cares about getting it fixed.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              We believe trash pickup should be simple. Show up on time, do the job right, charge a fair price, and treat people the way you'd want to be treated. That's it. No corporate jargon, no runaround.
            </p>
          </div>
          <div ref={photoRef} className="reveal-scale rounded-sm overflow-hidden aspect-[3/4] max-h-[500px]">
            <img src="/tommy-sydney.jpg" alt="Tommy and Sydney Rankin, owners of Rankin Waste Management" className="w-full h-full object-cover object-[50%_25%]" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ FINAL CTA ═══════════════════════ */

const FinalCTA = ({ onRequestService }) => {
  const ref = useReveal();
  return (
    <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-[clamp(5rem,12vw,10rem)] text-center flex flex-col items-center gap-6 sm:gap-8" style={{ background: 'linear-gradient(135deg, #0f0906 0%, #1a0c02 50%, #0f0906 100%)' }}>
      <div ref={ref} className="reveal">
        <div className="text-[clamp(1.75rem,5vw,4rem)] font-semibold tracking-tight leading-tight mb-6 sm:mb-8">
          Ready for reliable trash pickup?<br />
          <a href={PHONE_LINK} className="text-orange-500 hover:opacity-80 transition-opacity duration-300">Call {PHONE}</a>
        </div>
        <p className="text-text-muted max-w-[700px] mx-auto leading-relaxed text-sm sm:text-base mb-6">
          Stop dealing with missed pickups and companies that don't answer the phone. Rankin Waste Management serves Hubbard, Axtell, Dawson, Malone, Purdon, Mertens, Whitney, Mount Calm, Peoria, Birome, Prairie Hill, Navarro Mills, and surrounding rural communities across Hill County, Navarro County, Limestone County, and McLennan County.
        </p>
        <p className="font-semibold text-base sm:text-lg mb-6">Tommy and Sydney Rankin. Your local team, your trash company.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={PHONE_LINK} className="bg-white text-dark px-6 py-3 rounded-full font-bold text-[0.9rem] btn-smooth min-h-[44px] flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            Call Now
          </a>
          <button onClick={onRequestService} className="min-h-[44px]">
            <Tag bright>Request Service Online</Tag>
          </button>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ FOOTER ═══════════════════════ */

const Footer = () => (
  <footer className="bg-dark-card px-6 lg:px-[clamp(2rem,5vw,4rem)] py-12 border-t border-border-subtle">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LogoMark />
            <span className="font-bold text-sm tracking-[0.15em] uppercase">Rankin Waste</span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">
            Family-owned trash pickup serving rural communities across central Texas. Reliable, affordable, and local.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-4">Contact</h4>
          <address className="not-italic space-y-2 text-sm text-text-muted">
            <p className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              175 PR335, Hubbard, TX 76648
            </p>
            <p className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-orange-500 shrink-0" />
              <a href={PHONE_LINK} className="hover:text-white transition-colors duration-300">{PHONE}</a>
            </p>
            <p className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="mailto:rankinwaste@gmail.com" className="hover:text-white transition-colors duration-300">rankinwaste@gmail.com</a>
            </p>
            <p className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-orange-500 shrink-0" />
              Mon-Fri 8AM-6PM
            </p>
          </address>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><a href="#top" className="hover:text-white transition-colors duration-300">Home</a></li>
            <li><a href="#services" className="hover:text-white transition-colors duration-300">Residential</a></li>
            <li><a href="#services" className="hover:text-white transition-colors duration-300">Bulk Pickup</a></li>
            <li><a href="#services" className="hover:text-white transition-colors duration-300">Dump Trailer Rentals</a></li>
            <li><a href="#about" className="hover:text-white transition-colors duration-300">About Us</a></li>
            <li><a href="#reviews" className="hover:text-white transition-colors duration-300">Reviews</a></li>
          </ul>
        </div>

        {/* Service Areas + Social */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-4">Service Areas</h4>
          <p className="text-text-muted text-xs leading-relaxed mb-4">
            Hubbard, Axtell, Dawson, Malone, Purdon, Mertens, Whitney, Mount Calm, Peoria, Birome, Prairie Hill, Navarro Mills, TX
          </p>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-3">Follow Us</h4>
          <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
            <FacebookIcon />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-text-muted text-sm pt-8 border-t border-border-subtle">
        <span>&copy; 2026 Rankin Waste Management</span>
        <span className="hidden md:inline text-text-faint">|</span>
        <span>Locally Owned & Operated by Tommy and Sydney Rankin</span>
        <span className="hidden md:inline text-text-faint">|</span>
        <span>Hubbard, TX</span>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════ SERVICE REQUEST MODAL ═══════════════════════ */

const ServiceRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', serviceType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.phone.trim()) e.phone = 'Phone is required';
    if (!formData.address.trim()) e.address = 'Address is required';
    if (!formData.serviceType) e.serviceType = 'Please select a service type';
    return e;
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    if (errors[ev.target.name]) setErrors({ ...errors, [ev.target.name]: '' });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', address: '', serviceType: '', message: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? 'border-red-500' : 'border-border-subtle'} rounded px-4 py-3 text-white placeholder-text-faint focus:outline-none focus:border-orange-500 transition-colors duration-300`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-dark-card border border-border-subtle rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ animation: 'heroFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
        <div className="bg-orange-500 px-6 py-5 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Request Service</h2>
            <p className="text-white/80 text-sm mt-1">We'll get back to you within 24 hours</p>
          </div>
          <button onClick={handleClose} className="text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-300" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
              <p className="text-text-muted mb-6">Thank you, {formData.name}! We'll contact you shortly.</p>
              <button onClick={handleClose} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-bold transition-colors duration-300">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={inputClass('name')} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClass('email')} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(254) 555-0000" className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Service Type *</label>
                  <select name="serviceType" value={formData.serviceType} onChange={handleChange} className={inputClass('serviceType')}>
                    <option value="">Select a service...</option>
                    <option value="residential">Weekly Residential Pickup</option>
                    <option value="bulk">Bulk Trash Pickup</option>
                    <option value="trailer">Dump Trailer Rental</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Service Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Hubbard, TX 76648" className={inputClass('address')} />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Additional Notes</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any additional details..." className={`${inputClass('message')} resize-none`} />
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold text-lg transition-colors duration-300 min-h-[44px]">
                Submit Service Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════ APP ═══════════════════════ */

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Nav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero onRequestService={() => setServiceModalOpen(true)} />
      <BusinessDescription />
      <WhyChooseUs />
      <Reviews />
      <Services />
      <ServiceAreas />
      <FAQ />
      <About />
      <FinalCTA onRequestService={() => setServiceModalOpen(true)} />
      <Footer />
      <ServiceRequestModal isOpen={serviceModalOpen} onClose={() => setServiceModalOpen(false)} />
    </div>
  );
};

export default App;
