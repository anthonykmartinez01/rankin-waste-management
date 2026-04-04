import { PageHead, InnerHero } from '../shared';
import ReviewWidget from '../components/ReviewWidget';

export default function Reviews() {
  return (
    <>
      <PageHead
        title="Reviews - Waste Management Service in Hubbard, TX | Rankin Waste Management"
        description="Read reviews from Rankin Waste Management customers. See why families in Hubbard, TX and surrounding communities trust us for reliable waste management service."
      />
      <InnerHero title="Waste Management Service Reviews in Hubbard, TX" />

      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-12 md:py-16">
        <div className="max-w-[800px] mx-auto text-center mb-8">
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            We value your feedback! If you've used our services, please take a moment to leave a review on Google and let others know what makes Rankin Waste Management your go-to choice for dependable waste solutions.
          </p>
        </div>
      </section>

      <ReviewWidget />
    </>
  );
}
