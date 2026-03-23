import { useEffect } from 'react';
import { useReveal, PageHead, InnerHero } from '../shared';

export default function Reviews() {
  const content = useReveal();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  return (
    <>
      <PageHead
        title="Reviews - Rankin Waste Management"
        description="Read reviews from Rankin Waste Management customers. See why families in Hubbard, TX and surrounding communities trust us for reliable trash pickup."
      />
      <InnerHero title="Reviews" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div ref={content.ref} style={content.style} className="max-w-[1200px] mx-auto">
          <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-[800px]">
            We value your feedback! If you've used our services, please take a moment to leave a review on Google and let others know what makes Rankin Waste Management your go-to choice for dependable waste solutions.
          </p>
          <iframe
            className="lc_reviews_widget"
            src="https://reputationhub.site/reputation/widgets/review_widget/rFlq3Y1VRHN6jfB22fkr?widgetId=69bdce0ddeb65e7ddada83c5"
            frameBorder="0"
            scrolling="no"
            style={{ minWidth: '100%', width: '100%' }}
            title="Customer Reviews"
          />
        </div>
      </section>
    </>
  );
}
