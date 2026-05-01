import { Link } from 'react-router-dom';
import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function Hubbard() {
  const intro = useReveal();
  const weekly = useReveal(0.1);
  const garbage = useReveal(0.1);
  const curbside = useReveal(0.1);
  const rural = useReveal(0.1);
  const cta = useReveal(0.1);

  return (
    <>
      <PageHead
        title="Waste Management Service Hubbard TX | Rankin Waste Management"
        description="Professional waste management service in Hubbard, TX. Weekly residential pickup, curbside collection, and rural trash service. Reliable garbage removal for homes and businesses."
      />
      <InnerHero title="Waste Management Service in Hubbard" />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Rankin Waste Management",
          "url": "https://rankinwaste.com",
          "telephone": "(254) 205-6125",
          "email": "rankinwaste@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "175 PR335",
            "addressLocality": "Hubbard",
            "addressRegion": "TX",
            "postalCode": "76648",
            "addressCountry": "US"
          },
          "areaServed": {
            "@type": "City",
            "name": "Hubbard, TX"
          }
        }) }}
      />

      <section className="px-5 sm:px-6 lg:px-[clamp(2rem,5vw,4rem)] py-12 md:py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto">

          {/* Intro */}
          <div ref={intro.ref} style={intro.style} className="mb-12 md:mb-16">
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              In Hubbard, residents and businesses need reliable waste removal solutions. We provide complete trash collection services across the area. Find the right pickup schedule and service type for your property. Professional waste management keeps your property clean and compliant with local regulations.
            </p>
            <div className="flex justify-center">
              <img
                src="/truck-trailer.webp"
                alt="Rankin Waste Management truck towing a dumpster trailer in Hubbard, TX"
                width="600"
                height="303"
                loading="lazy"
                className="w-full max-w-[600px] h-auto rounded-sm border border-border-subtle"
              />
            </div>
          </div>

          {/* Weekly Residential */}
          <div ref={weekly.ref} style={weekly.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Weekly residential trash pickup in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Homeowners need consistent weekly waste removal to maintain their properties. Regular pickup prevents overflow and maintains neighborhood cleanliness without the hassle of storing trash for extended periods.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Our <Link to="/residential" className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">waste management service</Link> in Hubbard covers all residential streets with early morning collection. We arrive before most residents start their day, keeping your neighborhood quiet and your bins emptied on schedule.
            </p>
          </div>

          {/* Garbage Removal */}
          <div ref={garbage.ref} style={garbage.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Garbage removal in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Property owners facing large cleanouts, renovations, or excess waste accumulation require thorough removal services. Complete debris removal eliminates the need for multiple trips to dump sites while handling items too large for regular pickup.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              We serve Hubbard businesses and residential properties with flexible scheduling. Our team handles everything from construction debris to household cleanouts, making your project cleanup simple and efficient. For larger projects, ask about our trash trailer rentals.
            </p>
          </div>

          {/* Curbside Collection */}
          <div ref={curbside.ref} style={curbside.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Curbside trash collection in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Residents who prefer convenient pickup without walking to collection points benefit from curbside service. Simple bin placement eliminates heavy lifting and transport, making waste disposal effortless for families and elderly residents.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Our curbside service operates throughout Hubbard neighborhoods with accessible street access. Place your bins at the curb by collection time, and we take care of the rest while you focus on your daily routine.
            </p>
          </div>

          {/* Rural Service */}
          <div ref={rural.ref} style={rural.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Rural trash service in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Properties outside main town limits often have limited waste disposal options and need specialized service. Rural properties often fall outside city pickup routes — we fill that gap with consistent, dependable service.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              We cover outlying Hubbard areas and farm properties within our service radius. Our routes extend beyond city limits to serve rural homes and agricultural operations that require dependable waste management solutions.
            </p>
          </div>

          {/* CTA */}
          <div ref={cta.ref} style={cta.style} className="bg-dark-elevated border border-border-subtle rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Get Reliable Waste Management in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              Call Rankin Waste Management at <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-400 font-semibold">{PHONE}</a> to set up your service. Family-owned, no contracts, flat-rate pricing — and trusted by 700+ neighbors with 250+ five-star reviews.
            </p>
            <CallCTA />
          </div>

        </div>
      </section>
    </>
  );
}
