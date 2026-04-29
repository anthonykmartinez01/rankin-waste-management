import { Link } from 'react-router-dom';
import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function GarbageCollectionHubbard() {
  const intro = useReveal();
  const pickup = useReveal(0.1);
  const rural = useReveal(0.1);
  const bulk = useReveal(0.1);
  const cta = useReveal(0.1);

  return (
    <>
      <PageHead
        title="Garbage Collection Service Hubbard TX | Rankin Waste Management"
        description="Professional garbage collection service in Hubbard, TX. Weekly pickup, rural service, and bulk trash removal. Reliable waste management for homes and businesses."
      />
      <InnerHero title="Garbage Collection Service in Hubbard" />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Garbage Collection",
          "name": "Garbage Collection Service in Hubbard, TX",
          "provider": {
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
            }
          },
          "areaServed": {
            "@type": "City",
            "name": "Hubbard, TX"
          }
        }) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rankinwaste.com/" },
            { "@type": "ListItem", "position": 2, "name": "Garbage Collection Service in Hubbard", "item": "https://rankinwaste.com/garbage-collection-service-hubbard" }
          ]
        }) }}
      />

      <section className="px-5 sm:px-6 lg:px-[clamp(2rem,5vw,4rem)] py-12 md:py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto">

          {/* Intro */}
          <div ref={intro.ref} style={intro.style} className="mb-12 md:mb-16">
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              In Hubbard, reliable waste removal keeps homes and businesses clean. You can expect professional pickup on schedule with proper disposal methods. Our local service handles all waste types efficiently.
            </p>
          </div>

          {/* Garbage Pickup */}
          <div ref={pickup.ref} style={pickup.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Garbage Pickup in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Residential homeowners need weekly trash removal they can count on. We provide scheduled curbside pickup with containers included and consistent service you can rely on. Our garbage collection service covers all Hubbard neighborhoods.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Weekly pickup keeps your home clean and your family healthy. We arrive on the same day each week so you never miss collection. Our trucks handle standard household waste and recyclables with professional care.
            </p>
          </div>

          {/* Rural */}
          <div ref={rural.ref} style={rural.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Rural Garbage Collection in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Properties outside city limits, farms, and remote homes face unique challenges with waste removal. We offer flexible pickup locations and accommodate longer routes with same-day service available. Our rural collection serves properties throughout Hubbard regardless of location.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Country roads and distant driveways don't stop our service. We work with your property layout to find the best pickup spot. Farm waste, household trash, and rural debris all receive proper handling and disposal.
            </p>
          </div>

          {/* Bulk */}
          <div ref={bulk.ref} style={bulk.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Bulk Trash Pickup in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-4 md:mb-6">
              Homeowners disposing of large items like furniture and appliances need specialized removal service. We handle heavy item removal through scheduled appointments with proper disposal methods for all materials. Our bulk pickup serves spring cleaning and moving situations across Hubbard.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Large appliances require special handling that regular pickup cannot provide. We remove couches, washing machines, mattresses, and other oversized items safely. Schedule your bulk pickup when you need extra space or during seasonal cleanouts. For larger projects you'd rather load yourself, ask about our <Link to="/trash-trailer-rentals" className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">trash trailer rentals</Link>.
            </p>
          </div>

          {/* CTA */}
          <div ref={cta.ref} style={cta.style} className="bg-dark-elevated border border-border-subtle rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Start Reliable Garbage Collection in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              Call Rankin Waste Management at <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-400 font-semibold">{PHONE}</a> to set up service. Family-owned, no contracts, flat-rate pricing — and trusted by 700+ neighbors with 250+ five-star reviews.
            </p>
            <CallCTA />
          </div>

        </div>
      </section>
    </>
  );
}
