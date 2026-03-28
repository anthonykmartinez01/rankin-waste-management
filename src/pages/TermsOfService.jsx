import { useReveal, PageHead, InnerHero } from '../shared';

export default function TermsOfService() {
  const content = useReveal();
  return (
    <>
      <PageHead
        title="Terms of Service - Rankin Waste Management"
        description="Terms of Service for Rankin Waste Management, including SMS messaging consent and communication policies."
      />
      <InnerHero title="Terms of Service" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div ref={content.ref} style={content.style} className="max-w-[800px] mx-auto">
          <p className="text-text-muted text-sm mb-10">Last updated: March 28, 2026</p>

          <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            By accessing or using the services provided by Rankin Waste Management ("Company," "we," "us," or "our"), including our website at rankinwaste.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Rankin Waste Management provides residential trash pickup and trash trailer rental services in Hubbard, TX and surrounding rural communities. Service details, availability, and pricing may vary and are subject to change.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">3. SMS/Text Messaging Terms</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            By providing your phone number and opting in to receive text messages from Rankin Waste Management, you consent to receive recurring automated SMS/text messages related to your service, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-text-muted text-lg leading-relaxed mb-4 space-y-2 ml-4">
            <li>Service confirmations and scheduling updates</li>
            <li>Pickup reminders and schedule changes</li>
            <li>Account notifications</li>
            <li>Promotional offers and company updates</li>
          </ul>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            Message frequency may vary. Message and data rates may apply depending on your mobile carrier and plan. Rankin Waste Management is not responsible for any charges from your wireless provider.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            You may opt out of receiving text messages at any time by replying STOP to any message you receive from us. After opting out, you will receive a one-time confirmation message. You may also contact us at (254) 205-6125 or rankinwaste@gmail.com to opt out.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            For help or questions about our text messaging program, reply HELP to any message or contact us at (254) 205-6125.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Consent to receive text messages is not a condition of purchasing any goods or services from Rankin Waste Management.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">4. Privacy</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            We respect your privacy. Your personal information, including your phone number, will not be sold, rented, or shared with third parties for marketing purposes. We may share your information with service providers who assist us in operating our business, but only as necessary to provide our services to you.
          </p>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            By submitting your information through our website or forms, you consent to our collection and use of that information to provide the services you have requested and to communicate with you as described in these terms.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">5. Supported Carriers</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Our SMS messaging service is supported by major U.S. carriers including AT&T, Verizon, T-Mobile, Sprint, and others. Carriers are not liable for delayed or undelivered messages.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            We reserve the right to update or modify these Terms of Service at any time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of our services after any changes constitutes your acceptance of the revised terms.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-2">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="text-text-muted text-lg leading-relaxed space-y-1 ml-4">
            <li>Rankin Waste Management</li>
            <li>175 PR335, Hubbard, TX 76648</li>
            <li>Phone: <a href="tel:+12542056125" className="text-orange-500 hover:text-orange-300 transition-colors duration-300">(254) 205-6125</a></li>
            <li>Email: rankinwaste@gmail.com</li>
          </ul>
        </div>
      </section>
    </>
  );
}
