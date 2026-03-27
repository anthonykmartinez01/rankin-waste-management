import { useEffect } from 'react';
import { PageHead, InnerHero, PHONE, PHONE_LINK, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '../shared';

const GHL_FORM_URL = 'https://go.kailenflow.com/widget/form/IonAPiOYK1uWC7rxn7Iw';

export default function ContactUs() {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://go.kailenflow.com/js/form_embed.js"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://go.kailenflow.com/js/form_embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <>
      <PageHead
        title="Contact us - Rankin Waste Management"
        description="Request trash pickup service from Rankin Waste Management. Serving Hubbard, TX and surrounding communities. Call (254) 205-6125 or submit a service request."
      />
      <InnerHero title="New Service Request" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div className="max-w-[700px] mx-auto">
          <div className="ghl-form-container rounded-lg overflow-hidden">
            <iframe
              src={GHL_FORM_URL}
              className="w-full border-none"
              style={{ minHeight: '600px' }}
              scrolling="no"
              id="page-ghl-form"
              title="Service Request Form"
            />
          </div>

          <div className="mt-16 pt-12 border-t border-border-subtle">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-text-muted text-sm">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>175 PR335, Hubbard, TX 76648</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-orange-500 shrink-0" />
                <a href={PHONE_LINK} className="hover:text-white transition-colors duration-300">{PHONE}</a>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:rankinwaste@gmail.com" className="hover:text-white transition-colors duration-300">rankinwaste@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Mon-Fri 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
