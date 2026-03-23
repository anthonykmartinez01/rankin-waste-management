import { useReveal, PageHead, InnerHero, CallCTA, PHONE, PHONE_LINK } from '../shared';

export default function AboutUs() {
  const section1 = useReveal();
  const section2 = useReveal(0.1);
  const photo = useReveal(0.15);
  return (
    <>
      <PageHead
        title="About Us - Rankin Waste Management"
        description="Rankin Waste Management is a family-owned trash service in Hubbard, TX. Owned and operated by Tommy Rankin, serving rural communities with reliable, affordable service."
      />
      <InnerHero title="About Us" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div ref={section1.ref} style={section1.style} className="mb-12">
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  Rankin Waste Management is a locally family-owned and operated small business proudly serving Hubbard, TX, and surrounding rural communities. We specialize in reliable, affordable trash service with a personal touch.
                </p>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  As a part of the community, we understand the unique needs of rural areas and are committed to providing dependable weekly pickup and trash trailer rentals at competitive prices.
                </p>
                <p className="text-text-muted text-lg leading-relaxed">
                  When you choose Rankin Waste Management, you're not just getting great service — you're supporting your neighbors. Let us take care of your waste so you can focus on what matters most.
                </p>
              </div>

              <div ref={section2.ref} style={section2.style}>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">About the Owner</h2>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  Rankin Waste Management is owned and operated by Tommy Rankin, a lifelong resident of the Hubbard area. Growing up here, Tommy learned the value of hard work, community, and taking care of your neighbors. That hometown pride is what drives the company's mission today — to provide reliable, affordable trash service while always giving back and supporting local.
                </p>
                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  When you choose Rankin Waste Management, you're not just hiring a waste service — you're partnering with someone who truly cares about keeping our community clean and thriving.
                </p>
                <CallCTA />
              </div>
            </div>

            <div ref={photo.ref} style={photo.style} className="rounded-sm overflow-hidden aspect-[3/4] max-h-[550px]">
              <img src="/tommy-sydney.jpg" alt="Tommy and Sydney Rankin, owners of Rankin Waste Management" className="w-full h-full object-cover object-[50%_25%]" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
