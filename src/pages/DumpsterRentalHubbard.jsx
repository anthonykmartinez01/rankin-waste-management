import { Link } from 'react-router-dom';
import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function DumpsterRentalHubbard() {
  const intro = useReveal();
  const residential = useReveal(0.1);
  const commercial = useReveal(0.1);
  const rolloff = useReveal(0.1);
  const cta = useReveal(0.1);

  return (
    <>
      <PageHead
        title="Dumpster Rental Service Hubbard TX | Rankin Waste Management"
        description="Professional dumpster rental service in Hubbard, TX. Residential cleanouts, commercial waste, and construction roll-off containers. Local delivery and pickup by Rankin Waste Management."
      />
      <InnerHero title="Dumpster Rental Service in Hubbard" />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Dumpster Rental",
          "name": "Dumpster Rental Service in Hubbard, TX",
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
            { "@type": "ListItem", "position": 2, "name": "Dumpster Rental Service in Hubbard", "item": "https://rankinwaste.com/dumpster-rental-service-hubbard" }
          ]
        }) }}
      />

      <section className="px-5 sm:px-6 lg:px-[clamp(2rem,5vw,4rem)] py-12 md:py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto">

          {/* Intro */}
          <div ref={intro.ref} style={intro.style} className="mb-12 md:mb-16">
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              In Hubbard, homeowners and businesses need reliable waste removal solutions for projects big and small. Our dumpster rental service in Hubbard handles residential cleanouts, commercial projects, and construction debris removal. Choose the right container size and schedule delivery to your Hubbard location. We provide local pickup and drop-off with flexible rental periods to match your project timeline.
            </p>
          </div>

          {/* Residential */}
          <div ref={residential.ref} style={residential.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Residential Dumpster Rental in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Homeowners tackling garage cleanouts, basement clearing, home renovations, and yard cleanup projects need the right waste solution. We deliver right-sized containers for household waste with convenient driveway placement and scheduled pickup. Our service covers all Hubbard residential areas with same-day delivery available for most neighborhoods.
            </p>
          </div>

          {/* Commercial */}
          <div ref={commercial.ref} style={commercial.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Commercial Dumpster Rental in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Local businesses, retail stores, restaurants, and office buildings need regular waste management they can count on. We provide ongoing service contracts with flexible pickup schedules. Our commercial service covers Hubbard's downtown business district and surrounding commercial zones.
            </p>
          </div>

          {/* Roll-off */}
          <div ref={rolloff.ref} style={rolloff.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Roll-off Dumpster Service in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Construction crews, contractors, and property developers managing building debris and large-scale cleanouts require heavy-duty solutions. We supply sturdy containers for construction waste, roofing materials, and demolition debris with easy loading access. Our roll-off service covers construction sites throughout the Hubbard area with permits handled when required. For other large-haul needs, see our <Link to="/trash-trailer-rentals" className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">trash trailer rentals</Link>.
            </p>
          </div>

          {/* CTA */}
          <div ref={cta.ref} style={cta.style} className="bg-dark-elevated border border-border-subtle rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Reserve Your Hubbard Dumpster Today</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              Call Rankin Waste Management at <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-400 font-semibold">{PHONE}</a> for an upfront quote. Family-owned, no contracts, flat-rate pricing — and trusted by 700+ neighbors with 250+ five-star reviews.
            </p>
            <CallCTA />
          </div>

        </div>
      </section>
    </>
  );
}
