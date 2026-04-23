import { useState, useEffect, useRef, lazy, Suspense, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ReviewWidget from './components/ReviewWidget';

/* ═══════════════════════ MODAL CONTEXT ═══════════════════════ */

const ModalContext = createContext({ openModal: () => {} });
const useModal = () => useContext(ModalContext);

const Residential = lazy(() => import('./pages/Residential'));
const TrashTrailerRentals = lazy(() => import('./pages/TrashTrailerRentals'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ReviewsPage = lazy(() => import('./pages/Reviews'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Axtell = lazy(() => import('./pages/Axtell'));

/* ═══════════════════════ SCROLL REVEAL HOOK ═══════════════════════ */

const useReveal = (delay = 0) => {
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

/* ═══════════════════════ DESIGN ELEMENTS ═══════════════════════ */

const LogoMark = ({ size = 'sm' }) => {
  const sizes = { sm: 'h-6 w-auto', md: 'h-8 w-auto', lg: 'h-10 w-auto' };
  return (
    <img src="/rw-logo.webp" alt="RW" className={`${sizes[size] || sizes.sm} object-contain brightness-0 invert`} />
  );
};

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
  { label: 'Residential', href: '/residential' },
  { label: 'Trash Trailer Rentals', href: '/trash-trailer-rentals' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Reviews', href: '/reviews' },
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
  { q: 'What areas do you serve around Hubbard?', a: 'We serve Hubbard and surrounding communities across Hill, Navarro, Limestone, and McLennan Counties, including Axtell, Dawson, Malone, Mertens, Whitney, and other rural areas. If you\'re not sure we serve your area, call us directly at (254) 205-6125.' },
  { q: 'Do you require long-term contracts or have cancellation fees?', a: 'No contracts required and no cancellation fees ever. You\'re never locked in and can adjust or cancel service anytime without penalties.' },
  { q: 'What can I put out for pickup — do I need to sort anything?', a: 'No sorting required. Put out bags or cans with your household waste and we handle everything. Much simpler than most municipal programs.' },
  { q: 'How much does weekly trash pickup cost?', a: 'We offer flat-rate pricing with no fuel surcharges, environmental fees, or surprise charges. Call (254) 205-6125 for current rates in your area.' },
  { q: 'What happens if you miss my pickup day?', a: 'We personally guarantee pickup reliability, but if any issue occurs, you reach the owners directly who resolve problems immediately — no ticket queues or call center delays.' },
  { q: 'Do you offer bulk pickup for furniture and appliances?', a: 'Yes, we provide bulk pickup services for large items like furniture and appliances in addition to regular weekly waste pickup.' },
  { q: 'How do I schedule or cancel service?', a: 'Call us directly at (254) 205-6125 to speak with Tommy or Sydney Rankin, or book online at rankinwaste.com.' },
  { q: 'Are there extra fees for fuel or environmental charges?', a: 'No hidden fees ever. Our flat-rate pricing means you know exactly what you pay each month without surprise charges or annual increases.' },
];

/* ═══════════════════════ NAV ═══════════════════════ */

const NavLink = ({ href, children, className, onClick }) => (
  <Link to={href} className={className} onClick={onClick}>{children}</Link>
);

const Nav = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { openModal } = useModal();
  return (
    <div className="fixed top-0 w-full z-50">
      {/* Top utility bar */}
      <div className="w-full bg-dark/95 backdrop-blur-lg border-b border-border-subtle">
        <div className="h-10 flex justify-between items-center px-6 lg:px-[clamp(2rem,5vw,4rem)] text-[0.85rem] text-white/90">
          <a href={PHONE_LINK} className="flex items-center gap-2 font-semibold hover:text-orange-500 transition-colors duration-300">
            <PhoneIcon className="w-4 h-4 text-orange-500" />
            {PHONE}
          </a>
          <div className="flex items-center gap-5 font-semibold">
            <a href={PHONE_LINK} className="hover:text-orange-500 transition-colors duration-300">Call Us</a>
            <a href="sms:+12542056125" className="hover:text-orange-500 transition-colors duration-300">Text Us</a>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <nav className="w-full h-20 flex justify-between items-center px-6 lg:px-[clamp(2rem,5vw,4rem)]" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0) 100%)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <Link to="/" className="flex items-center gap-3 font-bold text-sm tracking-[0.15em] uppercase">
          <LogoMark />
          Rankin Waste
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-[0.9rem] font-medium">
          {NAV_LINKS.map(link => (
            <NavLink key={link.label} href={link.href} className="opacity-70 hover:opacity-100 transition-opacity duration-300">
              {link.label}
            </NavLink>
          ))}
          <button onClick={openModal} className="bg-orange-500 text-white px-5 py-2.5 rounded-full font-semibold text-[0.9rem] hover:bg-orange-600 transition-colors duration-300 min-h-[44px] flex items-center">
            New Service Request
          </button>
        </div>

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

        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-dark/95 backdrop-blur-lg border-t border-border-subtle lg:hidden flex flex-col px-6 py-6 gap-4">
            {NAV_LINKS.map(link => (
              <NavLink key={link.label} href={link.href} className="text-white/70 hover:text-white font-medium text-[0.9rem] py-2 transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <button onClick={() => { openModal(); setMobileMenuOpen(false); }} className="bg-orange-500 text-white px-5 py-3 rounded-full font-semibold text-[0.9rem] hover:bg-orange-600 transition-colors duration-300 min-h-[44px] mt-2">
              New Service Request
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

/* ═══════════════════════ HERO ═══════════════════════ */

const TrustBadge = ({ children }) => (
  <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm sm:text-base text-white/90 font-medium">
    <svg className="w-5 h-5 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
    {children}
  </span>
);

const Hero = () => {
  const { openModal } = useModal();
  return (
  <header id="top" className="min-h-[70vh] sm:min-h-[65vh] md:min-h-[62vh] w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pb-8">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src="/truck-side.webp" alt="" width="1600" height="1067" className="w-full h-full object-cover object-center hero-image-animate" loading="eager" fetchPriority="high" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.45) 40%, rgba(8,8,8,0.6) 70%, rgba(8,8,8,0.85) 100%)' }} />
    </div>

    <div className="relative z-10 max-w-[900px] mx-auto pt-20">
      <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.1] tracking-tight drop-shadow-lg mb-4 hero-title-animate">
        Reliable Trash Pickup & Waste Management Service
      </h1>
      <p className="text-orange-500 text-lg sm:text-xl font-semibold mb-4 hero-badge-animate">
        Locally Family-Owned &amp; Operated
      </p>

      {/* Social proof */}
      <div className="flex items-center justify-center gap-1.5 mb-5 hero-content-animate">
        <span className="flex gap-0.5 text-star">
          <span className="text-lg">★</span><span className="text-lg">★</span><span className="text-lg">★</span><span className="text-lg">★</span><span className="text-lg">★</span>
        </span>
        <span className="text-white/90 text-sm sm:text-base font-medium ml-1">250+ Five-Star Google Reviews</span>
      </div>

      <p className="text-white/80 text-base sm:text-lg max-w-[600px] mx-auto mb-7 hero-content-animate">
        Proudly serving Hubbard, Axtell, Dawson, Malone, Mertens, Purdon, TX, and surrounding rural communities with reliable, affordable trash service.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8 hero-buttons-animate">
        <a href={PHONE_LINK} className="bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-orange-600 transition-colors duration-300 min-h-[44px] flex items-center gap-2">
          <PhoneIcon className="w-5 h-5" />
          Call Now {PHONE}
        </a>
        <button onClick={openModal} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/20 transition-all duration-300 min-h-[44px]">
          New Service Request
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-3 hero-buttons-animate">
        <TrustBadge>No Contracts</TrustBadge>
        <TrustBadge>Flat-Rate Pricing</TrustBadge>
        <TrustBadge>Family Owned</TrustBadge>
        <TrustBadge>Weekly Pickup</TrustBadge>
        <TrustBadge>700+ Customers Served</TrustBadge>
        <TrustBadge>Licensed &amp; Insured</TrustBadge>
      </div>
    </div>
  </header>
  );
};

/* ═══════════════════════ BUSINESS DESCRIPTION ═══════════════════════ */

const BusinessDescription = () => {
  const text = useReveal();
  const img = useReveal(0.15);
  return (
    <section className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={text.ref} style={text.style}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-6">Built for Rural Texas Communities That Deserve Better</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4">
              Rankin Waste Management is a locally family-owned and operated small business proudly serving Hubbard, Axtell, Dawson, Malone, Mertens, Purdon, TX, and surrounding rural communities. We specialize in reliable, affordable trash service with a personal touch.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4">
              As a part of the community, we understand the unique needs of rural areas and are committed to providing dependable weekly pickup and trash trailer rentals at competitive prices.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8">
              When you choose Rankin Waste Management, you're not just getting great service - you're supporting your neighbors. Let us take care of your waste so you can focus on what matters most.
            </p>
            <a href={PHONE_LINK} className="inline-flex items-center gap-2 bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-orange-600 transition-colors duration-300 min-h-[44px]">
              <PhoneIcon className="w-4 h-4" />
              Call {PHONE}
            </a>
          </div>
          <div ref={img.ref} style={img.style} className="relative">
            <img src="/tommy-sydney.webp" alt="Tommy and Sydney Rankin, owners of Rankin Waste Management" className="w-full aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] object-cover object-[50%_30%] rounded-sm" loading="lazy" />
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
  const header = useReveal();
  const cards = [
    { title: 'Rural Specialized Service', desc: 'Built for communities like Hubbard, Axtell, Dawson, Malone, and Mertens where big haulers provide inconsistent service and missed pickups.' },
    { title: 'Direct Owner Contact', desc: 'Call Tommy and Sydney Rankin directly, not a dispatcher in another state or call center queue.' },
    { title: 'No Contracts, Flat Pricing', desc: 'No cancellation fees, fuel surcharges, environmental fees, or automatic annual price hikes.' },
    { title: 'Guaranteed Reliability', desc: 'Consistent pickup schedules with owners personally running routes and solving problems immediately.' },
  ];

  return (
    <section id="why-choose-us" className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div ref={header.ref} style={header.style} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">Why Choose Rankin Waste Management?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <WhyCard key={card.title} card={card} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyCard = ({ card, delay }) => {
  const anim = useReveal(delay);
  return (
    <div ref={anim.ref} style={anim.style} className="bg-dark-card border border-border-subtle rounded-sm p-6 sm:p-8">
      <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-2">{card.title}</h3>
      <p className="text-text-muted text-sm sm:text-base leading-relaxed">{card.desc}</p>
    </div>
  );
};

/* ═══════════════════════ REVIEWS ═══════════════════════ */

const Reviews = () => {
  return (
    <section id="reviews" className="bg-dark-elevated">
      <ReviewWidget />
    </section>
  );
};

/* ═══════════════════════ SERVICES ═══════════════════════ */

const Services = () => {
  const header = useReveal();
  const intro = useReveal(0.1);
  const services = [
    {
      title: 'Weekly Pickup',
      desc: "Curbside collection on your scheduled day. Set your bags or cans out and we take care of the rest. No sorting, no complicated rules. Serving homes throughout Hubbard and across Hill, Navarro, Limestone, and McLennan County.",
      link: '/residential',
    },
    {
      title: 'Bulk Pickup',
      desc: "Old furniture, appliances, mattresses, or a pile of junk from cleaning out the garage - we can handle it. We'll schedule a pickup that fits your timeline.",
      link: null,
    },
    {
      title: 'Dump Trailer Rentals',
      desc: "For bigger jobs - renovations, land clearing, property cleanouts. We deliver the trailer, you load it on your schedule, and we haul it away when you're done.",
      link: '/trash-trailer-rentals',
    },
  ];

  return (
    <section id="services" className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div ref={header.ref} style={header.style} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">Our Services</h2>
        </div>

        <div ref={intro.ref} style={intro.style} className="max-w-[800px] mx-auto mb-16 md:mb-20">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-5">Waste Management Service</h3>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4">
            Our weekly curbside pickup service handles all your household waste without complicated sorting requirements or mysterious fees. Simply set out your bags or cans on pickup day and we handle everything else, providing the reliable service that 700+ rural Texas families depend on every week.
          </p>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            As a family-owned business built specifically for rural communities, we deliver the consistent service and personal accountability that big national haulers can't match in areas like Hubbard and surrounding Hill County towns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 0.1} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={PHONE_LINK} className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-colors duration-300 min-h-[44px]">
            <PhoneIcon className="w-5 h-5" />
            Call {PHONE} to Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ CUSTOMER SAY ═══════════════════════ */

const CustomerSay = () => {
  const header = useReveal();
  return (
    <section id="customer-say" className="bg-dark-elevated pt-20 md:pt-28">
      <div className="max-w-[800px] mx-auto px-6 lg:px-[clamp(2rem,5vw,4rem)]">
        <h2 ref={header.ref} style={header.style} className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-center">
          What Our Customers Say
        </h2>
      </div>
      <ReviewWidget hideHeader />
    </section>
  );
};

const ServiceCard = ({ service: s, delay }) => {
  const anim = useReveal(delay);
  return (
    <div ref={anim.ref} style={anim.style} className="bg-dark-card border border-border-subtle rounded-sm p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3">{s.title}</h3>
      <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-4">{s.desc}</p>
      {s.link && <Link to={s.link} className="text-orange-500 hover:text-orange-300 font-semibold text-sm transition-colors duration-300">Learn more &rarr;</Link>}
    </div>
  );
};

/* ═══════════════════════ SERVICE AREA MAP ═══════════════════════ */

const ServiceAreaMap = () => {
  const anim = useReveal();
  const [mapLoaded, setMapLoaded] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mapRef = useRef(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapLoaded(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={(node) => { mapRef.current = node; if (anim.ref) anim.ref.current = node; }} style={{ ...anim.style, height: 'clamp(350px, 55vw, 500px)' }} className="mt-10 md:mt-12 rounded-sm overflow-hidden border border-border-subtle">
      {mapLoaded && <LazyMap isMobile={isMobile} />}
    </div>
  );
};

const LazyMap = ({ isMobile }) => {
  const [components, setComponents] = useState(null);
  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([leaflet]) => {
      setComponents(leaflet);
    });
  }, []);
  if (!components) return <div className="w-full h-full bg-dark-card animate-pulse" />;
  const { MapContainer, TileLayer, Circle, Tooltip } = components;
  return (
    <MapContainer
      center={isMobile ? [31.82, -96.85] : [31.84, -96.85]}
      zoom={isMobile ? 8.5 : 10}
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
  const header = useReveal();
  const cities = useReveal(0.1);
  return (
    <section id="areas" className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div ref={header.ref} style={header.style} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">Areas We Serve</h2>
          <p className="text-text-muted mt-2 text-base">Serving Hill, Navarro, Limestone & McLennan County. Click a city to learn more.</p>
        </div>
        <div ref={cities.ref} style={cities.style} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-5 sm:gap-y-6">
          {SERVICE_AREAS.map(area => (
            <ServiceAreaDetail key={area.city} area={area} />
          ))}
          <div className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-medium tracking-tight text-text-faint">
            + Surrounding
          </div>
        </div>

        <ServiceAreaMap />

        <p className="text-text-muted mt-10 md:mt-12">
          Don't see your town? Call us at{' '}
          <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">{PHONE}</a>.
          If you're in the area, we can probably work something out.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════ FAQ ═══════════════════════ */

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-6 min-h-[44px] group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-[1.05rem] group-hover:text-orange-500 transition-colors duration-300">{faq.q}</span>
        <ChevronIcon open={open} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-out ${open ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-text-muted leading-relaxed max-w-[700px]">{faq.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const header = useReveal();
  return (
    <section id="faq" className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div ref={header.ref} style={header.style} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-[800px]">
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ ABOUT ═══════════════════════ */

const About = () => {
  const text = useReveal();
  const photo = useReveal(0.15);
  return (
    <section id="about" className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div ref={text.ref} style={text.style} className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Meet Tommy & Sydney Rankin</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Rankin Waste Management isn't a corporation. It's Tommy and Sydney Rankin and their family, serving the same communities they live in.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              When you call <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">{PHONE}</a>, you're talking to the people who own the truck and run the routes. If there's ever a problem, you're talking to someone who actually cares about getting it fixed.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              We believe trash pickup should be simple. Show up on time, do the job right, charge a fair price, and treat people the way you'd want to be treated.
            </p>
          </div>
          <div ref={photo.ref} style={photo.style} className="rounded-sm overflow-hidden aspect-[3/4] max-h-[500px]">
            <img src="/tommy-sydney.webp" alt="Tommy and Sydney Rankin, owners of Rankin Waste Management" className="w-full h-full object-cover object-[50%_25%]" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ FIND US ═══════════════════════ */

const FindUs = () => {
  const heading = useReveal();
  const map = useReveal(0.1);
  const caption = useReveal(0.2);
  return (
    <section id="find-us" className="bg-dark-elevated px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto">
        <h2 ref={heading.ref} style={heading.style} className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-center mb-10 md:mb-12">
          Find Us in Hubbard, TX
        </h2>
        <div ref={map.ref} style={map.style} className="rounded-sm overflow-hidden border border-border-subtle aspect-[16/9] md:aspect-[2/1]">
          <iframe
            title="Rankin Waste Management on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.136596108881!2d-96.79978992297144!3d31.848498030854834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864f158c8dee18d9%3A0x32d36537ab608362!2sRankin%20Waste%20Management!5e0!3m2!1sen!2sus!4v1776957097390!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p ref={caption.ref} style={caption.style} className="text-text-muted text-center text-base md:text-lg leading-relaxed mt-8 md:mt-10 max-w-[800px] mx-auto">
          We're based in Hubbard, TX — family-owned and operated, proudly serving Axtell, Dawson, Malone, Mertens, Purdon, and the surrounding rural communities.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════ FINAL CTA ═══════════════════════ */

const FinalCTA = () => {
  const { openModal } = useModal();
  const anim = useReveal();
  return (
    <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28 text-center">
      <div ref={anim.ref} style={anim.style} className="max-w-[700px] mx-auto">
        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-semibold tracking-tight leading-tight mb-6">
          Ready for reliable trash pickup?
        </h2>
        <p className="text-text-muted leading-relaxed text-base mb-8">
          Stop dealing with missed pickups and poor service from big haulers, get the reliability and personal service that 700+ neighbors trust for their waste management needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={PHONE_LINK} className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors duration-300 min-h-[44px]">
            <PhoneIcon className="w-5 h-5" />
            Call {PHONE}
          </a>
          <button onClick={openModal} className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-300 min-h-[44px]">
            New Service Request
          </button>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════ FOOTER ═══════════════════════ */

const Footer = () => (
  <footer className="bg-dark-card px-6 lg:px-[clamp(2rem,5vw,4rem)] py-14 md:py-16 border-t border-border-subtle">
    <div className="max-w-[1200px] mx-auto">
      {/* Brand — centered on top */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-bold text-sm tracking-[0.15em] uppercase">Rankin Waste</span>
        </div>
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
        {/* Contact */}
        <div>
          <h4 className="text-sm uppercase tracking-wider font-bold text-orange-500 mb-5">Contact</h4>
          <div className="space-y-5 text-sm">
            <p className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-orange-500 shrink-0" />
              <a href={PHONE_LINK} className="font-semibold hover:text-orange-500 transition-colors duration-300">{PHONE}</a>
            </p>
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <address className="not-italic">
                <div className="font-semibold mb-1">Address</div>
                <div className="text-text-muted leading-relaxed">
                  175 PR335<br />
                  Hubbard, TX 76648
                </div>
              </address>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Hours</div>
                <div className="text-text-muted leading-relaxed">
                  Monday – Friday<br />
                  8AM – 6PM
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-sm overflow-hidden border border-border-subtle w-full max-w-[260px] aspect-square">
            <iframe
              title="Rankin Waste Management location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.136596108881!2d-96.79978992297144!3d31.848498030854834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864f158c8dee18d9%3A0x32d36537ab608362!2sRankin%20Waste%20Management!5e0!3m2!1sen!2sus!4v1776957097390!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm uppercase tracking-wider font-bold text-orange-500 mb-5">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/terms-of-service" className="font-semibold hover:text-orange-500 transition-colors duration-300">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="font-semibold hover:text-orange-500 transition-colors duration-300">Privacy Policy</Link></li>
            <li><a href="/sitemap.xml" className="font-semibold hover:text-orange-500 transition-colors duration-300">Sitemap</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm uppercase tracking-wider font-bold text-orange-500 mb-5">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/residential" className="font-semibold hover:text-orange-500 transition-colors duration-300">Residential</Link></li>
            <li><Link to="/trash-trailer-rentals" className="font-semibold hover:text-orange-500 transition-colors duration-300">Trash Trailer Rentals</Link></li>
            <li><Link to="/about-us" className="font-semibold hover:text-orange-500 transition-colors duration-300">About Us</Link></li>
            <li><Link to="/contact-us" className="font-semibold hover:text-orange-500 transition-colors duration-300">Contact Us</Link></li>
            <li><Link to="/reviews" className="font-semibold hover:text-orange-500 transition-colors duration-300">Reviews</Link></li>
            <li>
              <a href="https://www.facebook.com/p/Rankin-waste-management-100057417520840/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center gap-2 font-semibold hover:text-orange-500 transition-colors duration-300">
                <FacebookIcon />
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center text-text-muted text-sm pt-8 border-t border-border-subtle">
        &copy; 2026 Rankin Waste Management | Locally Owned &amp; Operated by Tommy &amp; Sydney Rankin | Hubbard, TX
      </div>
    </div>
  </footer>
);

/* ═══════════════════════ SERVICE REQUEST MODAL ═══════════════════════ */

const GHL_FORM_URL = 'https://go.kailenflow.com/widget/form/IonAPiOYK1uWC7rxn7Iw';

const ServiceRequestModal = ({ isOpen, onClose }) => {
  const formContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Inject dark theme CSS for GHL form
    if (!document.getElementById('ghl-dark-css')) {
      const style = document.createElement('style');
      style.id = 'ghl-dark-css';
      style.textContent = `
        .ghl-modal-form-wrap, .ghl-modal-form-wrap .hl-app { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .ghl-form-wrap { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-builder, .ghl-modal-form-wrap .hl_wrapper--inner, .ghl-modal-form-wrap .hl_wrapper--inner-full { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-builder--wrap, .ghl-modal-form-wrap .form-builder--wrap-full { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-field-container, .ghl-modal-form-wrap .field-container, .ghl-modal-form-wrap .form-field-wrapper { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .f-even, .ghl-modal-form-wrap .f-odd { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-side { background-color: #1a1a1a !important; border-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .field-label, .ghl-modal-form-wrap .label-alignment, .ghl-modal-form-wrap label { color: #ffffff !important; font-size: 14px !important; }
        .ghl-modal-form-wrap .form-control { background-color: #2a2a2a !important; border: 1px solid #444444 !important; color: #ffffff !important; border-radius: 4px !important; }
        .ghl-modal-form-wrap input::placeholder { color: #999999 !important; opacity: 1 !important; }
        .ghl-modal-form-wrap .multiselect, .ghl-modal-form-wrap .multiselect__tags { background-color: #2a2a2a !important; border-color: #444444 !important; }
        .ghl-modal-form-wrap .multiselect__placeholder { color: #999999 !important; }
        .ghl-modal-form-wrap .multiselect__input, .ghl-modal-form-wrap .multiselect__single { background: #2a2a2a !important; color: #ffffff !important; }
        .ghl-modal-form-wrap .button-element { background-color: #e8913a !important; color: #ffffff !important; border: none !important; border-radius: 4px !important; font-weight: 600 !important; }
        .ghl-modal-form-wrap .button-element:hover { background-color: #d47f2e !important; }
        .ghl-modal-form-wrap .checkbox-container, .ghl-modal-form-wrap .checkbox-container *, .ghl-modal-form-wrap .terms-and-conditions, .ghl-modal-form-wrap .terms-and-conditions * { color: #ffffff !important; }
        .ghl-modal-form-wrap .checkbox-container + .checkbox-container { display: none !important; }
        .ghl-modal-form-wrap .terms-and-conditions + .terms-and-conditions { display: none !important; }
        .ghl-modal-form-wrap .heading-element .text-element { display: none !important; }
      `;
      document.head.appendChild(style);
    }

    // Load GHL form embed script (inline, not iframe)
    const existing = document.querySelector('script[src="https://go.kailenflow.com/js/form_embed.js"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://go.kailenflow.com/js/form_embed.js';
      s.async = true;
      document.body.appendChild(s);
    }

    // Apply dark JS overrides after form loads
    const applyDarkTheme = () => {
      const container = formContainerRef.current;
      if (!container) return;
      container.querySelectorAll('.form-control').forEach(el => {
        el.style.setProperty('background-color', '#2a2a2a', 'important');
        el.style.setProperty('border', '1px solid #444', 'important');
        el.style.setProperty('color', '#fff', 'important');
      });
      const btn = container.querySelector('.button-element');
      if (btn) btn.style.setProperty('background-color', '#e8913a', 'important');
      container.querySelectorAll('.multiselect, .multiselect__tags').forEach(el => {
        el.style.setProperty('background-color', '#2a2a2a', 'important');
      });
      const cbs = container.querySelectorAll('.checkbox-container');
      if (cbs.length > 1) cbs[1].style.setProperty('display', 'none', 'important');
      const tcs = container.querySelectorAll('.terms-and-conditions');
      if (tcs.length > 1) tcs[1].style.setProperty('display', 'none', 'important');
      container.querySelectorAll('.heading-element .text-element').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });
    };
    const timer = setTimeout(applyDarkTheme, 1500);
    const timer2 = setTimeout(applyDarkTheme, 3000);
    return () => { clearTimeout(timer); clearTimeout(timer2); };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ animation: 'heroFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both', backgroundColor: '#1a1a1a' }}>
        <div className="bg-orange-500 px-6 py-5 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Request Service</h2>
            <p className="text-white/80 text-sm mt-1">We'll get back to you within 24 hours</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-300" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div ref={formContainerRef} className="p-0 ghl-modal-form-wrap" style={{ backgroundColor: '#1a1a1a' }}>
          <iframe
            src={GHL_FORM_URL}
            className="w-full border-none"
            style={{ minHeight: '500px', background: '#1a1a1a' }}
            scrolling="no"
            id="modal-ghl-form"
            title="Service Request Form"
          />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════ HOMEPAGE ═══════════════════════ */

const HomePage = () => (
  <>
    <Hero />
    <BusinessDescription />
    <WhyChooseUs />
    <Services />
    <CustomerSay />
    <FAQ />
    <FindUs />
    <FinalCTA />
  </>
);

/* ═══════════════════════ SCROLL TO HASH ON NAVIGATE ═══════════════════════ */

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
};

/* ═══════════════════════ APP ═══════════════════════ */

const AppInner = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ openModal }}>
      <div className="min-h-screen bg-dark text-white">
        <ScrollToHash />
        <Nav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/residential" element={<Residential />} />
            <Route path="/trash-trailer-rentals" element={<TrashTrailerRentals />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/service-areas/axtell" element={<Axtell />} />
          </Routes>
        </Suspense>
        <Footer />
        <ServiceRequestModal isOpen={modalOpen} onClose={closeModal} />
      </div>
    </ModalContext.Provider>
  );
};

const App = () => (
  <BrowserRouter>
    <AppInner />
  </BrowserRouter>
);

export default App;
