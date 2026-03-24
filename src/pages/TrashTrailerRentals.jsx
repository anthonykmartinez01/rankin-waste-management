import { useReveal, PageHead, InnerHero, CallCTA } from '../shared';

export default function TrashTrailerRentals() {
  const content = useReveal();
  return (
    <>
      <PageHead
        title="Trash Trailer Rentals - Rankin Waste Management"
        description="Affordable trash trailer rentals in Hubbard, TX and surrounding areas. 16-foot trailers with high sides, flexible scheduling. We drop it off, you load it, we haul it away."
      />
      <InnerHero title="Trash Trailer Rentals" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div ref={content.ref} style={content.style} className="max-w-[800px] mx-auto">
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            Need a quick and easy cleanup solution? Rankin Waste Management offers convenient trash trailer rentals for residential use. Whether you're tackling yard cleanup, moving out, or clearing debris, our trailers make waste removal simple and stress-free.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            We provide 16-foot trailers with high sides equivalent to a 20 yard dumpster, giving you plenty of space. Rentals are available for full-week durations, with flexible drop-off and pickup options to fit your schedule.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-6">
            We drop it off, you load it up, and we haul it away - on your schedule.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-10">
            With affordable rates and flexible rental options, we're the go-to choice for hassle-free cleanups in Hubbard and surrounding rural areas.
          </p>
          <CallCTA />
        </div>
      </section>
    </>
  );
}
