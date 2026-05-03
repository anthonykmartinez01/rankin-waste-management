import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';
import ReviewWidget from '../components/ReviewWidget';

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
      <InnerHero
        title="Waste Management Service in Hubbard"
        bgImage="/images/services/waste-management.webp"
        bgImageAlt="Rankin Waste branded curbside trash bin next to service truck"
      />

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
        <div className="max-w-[1300px] mx-auto">

          {/* Intro */}
          <div ref={intro.ref} style={intro.style} className="mb-12 md:mb-16 text-center">
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              In Hubbard, residents and businesses need reliable waste removal solutions. We provide complete trash collection services across the area. Find the right pickup schedule and service type for your property. Professional waste management keeps your property clean and compliant with local regulations.
            </p>
          </div>

          {/* Weekly Residential */}
          <div ref={weekly.ref} style={weekly.style} className="mb-16 md:mb-24 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/hubbard/weekly-residential.webp"
                srcSet="/images/hubbard/weekly-residential-mobile.webp 800w, /images/hubbard/weekly-residential.webp 1400w"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Black household trash bag set out for weekly residential pickup"
                width="1400"
                height="1050"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Weekly residential trash pickup in Hubbard</h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
                Homeowners need consistent weekly waste removal to maintain their properties. Regular pickup prevents overflow and maintains neighborhood cleanliness without the hassle of storing trash for extended periods.
              </p>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                Our waste management service in Hubbard covers all residential streets with early morning collection. We arrive before most residents start their day, keeping your neighborhood quiet and your bins emptied on schedule.
              </p>
            </div>
          </div>

          {/* Garbage Removal */}
          <div ref={garbage.ref} style={garbage.style} className="mb-16 md:mb-24 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
            <div className="md:order-2 rounded-2xl overflow-hidden">
              <img
                src="/images/hubbard/garbage-removal.webp"
                srcSet="/images/hubbard/garbage-removal-mobile.webp 800w, /images/hubbard/garbage-removal.webp 1400w"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Gloved hands tying off white trash bags during garbage removal"
                width="1400"
                height="888"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Garbage removal in Hubbard</h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
                Property owners facing large cleanouts, renovations, or excess waste accumulation require thorough removal services. Complete debris removal eliminates the need for multiple trips to dump sites while handling items too large for regular pickup.
              </p>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                We serve Hubbard businesses and residential properties with flexible scheduling. Our team handles everything from construction debris to household cleanouts, making your project cleanup simple and efficient. For larger projects, ask about our trash trailer rentals.
              </p>
            </div>
          </div>

          {/* Curbside Collection */}
          <div ref={curbside.ref} style={curbside.style} className="mb-16 md:mb-24 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/hubbard/curbside-collection.webp"
                srcSet="/images/hubbard/curbside-collection-mobile.webp 800w, /images/hubbard/curbside-collection.webp 1400w"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Multiple white trash bags tied with orange ribbons ready for curbside collection"
                width="1400"
                height="933"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Curbside trash collection in Hubbard</h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
                Residents who prefer convenient pickup without walking to collection points benefit from curbside service. Simple bin placement eliminates heavy lifting and transport, making waste disposal effortless for families and elderly residents.
              </p>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                Our curbside service operates throughout Hubbard neighborhoods with accessible street access. Place your bins at the curb by collection time, and we take care of the rest while you focus on your daily routine.
              </p>
            </div>
          </div>

          {/* Rural Service */}
          <div ref={rural.ref} style={rural.style} className="mb-16 md:mb-24 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
            <div className="md:order-2 rounded-2xl overflow-hidden">
              <img
                src="/images/hubbard/rural-service.webp"
                srcSet="/images/hubbard/rural-service-mobile.webp 800w, /images/hubbard/rural-service.webp 1400w"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Person in denim jacket and yellow gloves picking up litter in a rural field"
                width="1400"
                height="933"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Rural trash service in Hubbard</h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
                Properties outside main town limits often have limited waste disposal options and need specialized service. Rural properties often fall outside city pickup routes — we fill that gap with consistent, dependable service.
              </p>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                We cover outlying Hubbard areas and farm properties within our service radius. Our routes extend beyond city limits to serve rural homes and agricultural operations that require dependable waste management solutions.
              </p>
            </div>
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

      <section id="reviews" className="bg-dark-elevated">
        <ReviewWidget />
      </section>
    </>
  );
}
