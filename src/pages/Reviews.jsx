import { useEffect } from 'react';
import { useReveal, PageHead, InnerHero, PHONE, PHONE_LINK } from '../shared';

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
        title="Reviews — Rankin Waste Management"
        description="Read reviews from Rankin Waste Management customers in Hubbard, TX and surrounding communities. See why families trust us for reliable weekly trash pickup."
      />
      <InnerHero title="Reviews" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div ref={content.ref} style={content.style} className="max-w-[1200px] mx-auto">
          <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-[700px] mx-auto text-center">
            We appreciate every customer who takes the time to share their experience. If you're a current customer, we'd love to hear from you —{' '}
            <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-300 font-semibold transition-colors duration-300">
              leave us a review on Google
            </a>.
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
