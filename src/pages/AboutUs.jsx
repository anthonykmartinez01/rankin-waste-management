import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function AboutUs() {
  const text = useReveal();
  const photo = useReveal(0.15);
  return (
    <>
      <PageHead
        title="About Us — Tommy & Sydney Rankin | Rankin Waste Management"
        description="Meet Tommy and Sydney Rankin, the family behind Rankin Waste Management. Family-owned trash pickup serving Hubbard, TX and surrounding rural communities."
      />
      <InnerHero title="About Us" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
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
              <div className="pt-4">
                <CallCTA />
              </div>
            </div>
            <div ref={photo.ref} style={photo.style} className="rounded-sm overflow-hidden aspect-[3/4] max-h-[500px]">
              <img src="/tommy-sydney.jpg" alt="Tommy and Sydney Rankin, owners of Rankin Waste Management" className="w-full h-full object-cover object-[50%_25%]" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
