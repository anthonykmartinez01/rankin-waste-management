import { Link } from 'react-router-dom';
import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function Axtell() {
  const intro = useReveal();
  const services = useReveal(0.1);
  const why = useReveal(0.1);
  const costs = useReveal(0.1);
  const nearby = useReveal(0.1);
  const cta = useReveal(0.1);

  return (
    <>
      <PageHead
        title="Waste Management Service in Axtell, TX | Rankin Waste Management"
        description="Reliable waste management in Axtell. Family-owned with 250+ five-star reviews. Free estimates, 24-hour response. Call (254) 205-6125."
      />
      <InnerHero title="Waste Management Service in Axtell, TX" />

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
            "name": "Axtell, TX"
          }
        }) }}
      />

      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div className="max-w-[800px] mx-auto">

          {/* Intro */}
          <div ref={intro.ref} style={intro.style} className="mb-16">
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Running a household or business in Axtell means dealing with waste disposal week after week. Whether you live near the old Axtell school grounds or run a business along FM 939, Rankin Waste Management brings dependable service right to your property. Our trucks regularly travel from our Hubbard base through the rural roads connecting our communities, so we know the quickest routes to reach Axtell residents.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              As a family-owned company serving McLennan County, we handle everything from weekly residential pickup to large commercial accounts. With 250+ five-star reviews and a perfect 5.0 rating, Axtell residents trust us because we show up when promised and keep rates fair. Our 24-hour response time means you get answers fast when you need new service or have questions about your account.
            </p>
          </div>

          {/* Services Available */}
          <div ref={services.ref} style={services.style} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Services Available in Axtell</h2>

            <h3 className="text-xl font-bold mb-3">Residential Waste Collection</h3>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Weekly curbside pickup keeps your property clean without the hassle of hauling trash yourself. We provide the bins and handle all the heavy lifting. Most Axtell homes pay between $25-35 monthly for standard residential service.
            </p>

            <h3 className="text-xl font-bold mb-3">Commercial Dumpster Service</h3>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              From the convenience stores at the FM 939 intersection to farms needing cleanup containers, we match dumpster sizes to your actual needs. Our 2-yard, 4-yard, and 6-yard options fit most Axtell businesses without taking up unnecessary space.
            </p>

            <h3 className="text-xl font-bold mb-3">Roll-Off Container Rentals</h3>
            <p className="text-text-muted text-lg leading-relaxed">
              Home renovation or clearing out a property? Our roll-off containers handle construction debris, old furniture, and major cleanout projects. We drop off and pick up on your schedule.
            </p>
          </div>

          {/* Why Axtell Residents Call Us */}
          <div ref={why.ref} style={why.style} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Axtell Residents Call Us</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Living in a smaller community like Axtell often means limited options for essential services. Some national chains skip rural routes or charge extra fees for "out of area" service. We built our business serving communities exactly like Axtell — places where neighbors know each other and a handshake still means something.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              The unpaved sections and narrow county roads don't slow us down. Our drivers know which routes flood during heavy rains and how to navigate around farm equipment during harvest season. This local knowledge keeps your service consistent year-round.
            </p>
          </div>

          {/* Costs */}
          <div ref={costs.ref} style={costs.style} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Waste Management Costs in Axtell</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Residential waste service in Axtell typically runs $25-35 per month, depending on your location and pickup frequency. Commercial rates vary based on container size and collection schedule. Construction roll-offs start at $300 for a week-long rental.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              We provide free estimates over the phone in just minutes. Tell us your address and service needs, and we'll quote an exact monthly rate with no hidden fees.
            </p>
          </div>

          {/* Nearby Areas */}
          <div ref={nearby.ref} style={nearby.style} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Nearby Areas We Serve</h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Beyond Axtell, our trucks serve neighboring communities throughout the region. We maintain regular routes to Prairie Hill, Mt. Calm, and Malone. If you have properties in multiple locations or need service outside Axtell, we can coordinate pickup schedules across all your sites.
            </p>
          </div>

          {/* CTA */}
          <div ref={cta.ref} style={cta.style} className="bg-dark-elevated border border-border-subtle rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Service in Axtell?</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Call Rankin Waste Management at <a href={PHONE_LINK} className="text-orange-500 hover:text-orange-400 font-semibold">{PHONE}</a> to set up your waste service. We answer Monday through Friday from 8 AM to 5 PM, and most new accounts start within 48 hours. Have your Axtell address ready, and we'll provide your free quote right over the phone.
            </p>
            <CallCTA />
          </div>

        </div>
      </section>
    </>
  );
}
