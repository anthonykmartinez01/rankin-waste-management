import { useReveal, PageHead, InnerHero, CallCTA } from '../shared';

export default function Residential() {
  const content = useReveal();
  return (
    <>
      <PageHead
        title="Residential - Rankin Waste Management"
        description="Dependable weekly residential trash pickup in Hubbard, Axtell, Dawson, Malone, and surrounding rural TX communities. Affordable rates, reliable service."
      />
      <InnerHero title="Residential" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div ref={content.ref} style={content.style} className="max-w-[800px] mx-auto">
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            At Rankin Waste Management, we make it easy to keep your home and property clean with our dependable residential trash pickup service. We offer weekly curbside collection for households in Hubbard, Axtell, Dawson, Malone, Mertens, Purdon, and surrounding rural communities — all at affordable rates.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            Our team is committed to timely, reliable service you can count on week after week. We provide clear pickup schedules, friendly drivers, and a straightforward process so there are no surprises. Whether you're in a neighborhood or on a country road, we bring the same level of care and consistency to every stop.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-10">
            With Rankin Waste Management, you get more than just trash pickup — you get peace of mind knowing your waste is handled responsibly by a company that's part of your community.
          </p>
          <CallCTA />
        </div>
      </section>
    </>
  );
}
