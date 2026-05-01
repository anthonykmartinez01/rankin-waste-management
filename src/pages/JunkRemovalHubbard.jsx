import { Link } from 'react-router-dom';
import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function JunkRemovalHubbard() {
  const intro = useReveal();
  const junk = useReveal(0.1);
  const furniture = useReveal(0.1);
  const appliance = useReveal(0.1);
  const cleanout = useReveal(0.1);
  const construction = useReveal(0.1);
  const cta = useReveal(0.1);

  return (
    <>
      <PageHead
        title="Junk Removal Service Hubbard TX | Rankin Waste Management"
        description="Professional junk removal service in Hubbard, TX. We handle furniture, appliances, cleanouts and construction debris. Same-day pickup with upfront quotes from Rankin Waste Management."
        image="/junk-removal-trailer.webp"
        imageAlt="Rankin Waste Management trailer hauling junk and debris in Hubbard, TX"
      />
      <InnerHero title="Junk Removal Service in Hubbard" />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Junk Removal",
          "name": "Junk Removal Service in Hubbard, TX",
          "image": "https://rankinwaste.com/junk-removal-trailer.webp",
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
            { "@type": "ListItem", "position": 2, "name": "Junk Removal Service in Hubbard", "item": "https://rankinwaste.com/junk-removal-service-hubbard" }
          ]
        }) }}
      />

      <section className="px-5 sm:px-6 lg:px-[clamp(2rem,5vw,4rem)] py-12 md:py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto">

          {/* Intro */}
          <div ref={intro.ref} style={intro.style} className="mb-12 md:mb-16">
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              In Hubbard, residents and businesses need reliable waste removal when clutter builds up or projects create debris. Our junk removal service in Hubbard handles everything from old furniture to construction waste. Same-day pickup available with upfront quotes. We take care of the removal and make sure your waste is disposed of properly.
            </p>
            <div className="flex justify-center">
              <img
                src="/junk-removal-trailer.webp"
                alt="Rankin Waste Management trailer hauling junk and debris in Hubbard, TX"
                width="381"
                height="509"
                loading="lazy"
                className="w-full max-w-[381px] h-auto rounded-sm border border-border-subtle"
              />
            </div>
          </div>

          {/* Junk Removal */}
          <div ref={junk.ref} style={junk.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Junk removal in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              We help homeowners decluttering, moving, or dealing with inherited items get their space back. We provide quick removal of mixed household items in a single trip, so you don't have to make multiple runs to disposal sites. We serve all Hubbard residential areas including downtown neighborhoods. You simply let us know what needs to go, and we handle the heavy lifting and hauling.
            </p>
          </div>

          {/* Furniture Removal */}
          <div ref={furniture.ref} style={furniture.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Furniture removal in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              When you're replacing old couches, beds, tables, or downsizing your home, we take care of the furniture you no longer need. We bring proper equipment to handle heavy lifting without damaging your property. We know how to navigate the narrow stairs and doorways common in Hubbard homes.
            </p>
          </div>

          {/* Appliance Removal */}
          <div ref={appliance.ref} style={appliance.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Appliance removal in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Whether you're upgrading refrigerators, washers, dryers, or dealing with broken units, we remove appliances of all sizes. We handle safe disconnection when needed and provide eco-friendly disposal or recycling for metal components. Our service covers all residential areas throughout the Hubbard area. You don't need to worry about getting large appliances down stairs or through tight spaces.
            </p>
          </div>

          {/* House Cleanouts */}
          <div ref={cleanout.ref} style={cleanout.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">House cleanouts in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              We assist with estate clearing, moving preparation, and major decluttering projects that require clearing entire rooms or properties. We provide complete property clearing with sorting assistance and can coordinate donations of usable items. We have experience working in Hubbard-area home layouts and understand common access challenges. This service works well for families dealing with inherited homes or preparing for major life changes.
            </p>
          </div>

          {/* Construction Debris */}
          <div ref={construction.ref} style={construction.style} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Construction debris removal in Hubbard</h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Contractors and homeowners with renovation or demolition waste can use our services as a dumpster alternative with labor included. We handle loading and hauling of construction materials, drywall, flooring, and demolition debris. We are familiar with Hubbard building sites and local disposal requirements. For larger projects you'd rather load yourself, ask about our trash trailer rentals. You focus on your project while we manage the cleanup and debris removal.
            </p>
          </div>

          {/* CTA */}
          <div ref={cta.ref} style={cta.style} className="bg-dark-elevated border border-border-subtle rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Get a Same-Day Junk Removal Quote</h2>
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
