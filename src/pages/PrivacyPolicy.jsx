import { useReveal, PageHead, InnerHero } from '../shared';

export default function PrivacyPolicy() {
  const content = useReveal();
  return (
    <>
      <PageHead
        title="Privacy Policy - Rankin Waste Management"
        description="Privacy Policy for Rankin Waste Management. Learn how we collect, use, and protect your personal information."
      />
      <InnerHero title="Privacy Policy" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div ref={content.ref} style={content.style} className="max-w-[800px] mx-auto">
          <p className="text-text-muted text-sm mb-10">Last updated: March 28, 2026</p>

          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Rankin Waste Management ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at rankinwaste.com or use our services.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-text-muted text-lg leading-relaxed mb-8 space-y-2 ml-4">
            <li><span className="text-white font-semibold">Personal Information:</span> Name, phone number, email address, and physical address that you provide when requesting service or contacting us</li>
            <li><span className="text-white font-semibold">Communication Data:</span> Records of your communications with us, including text messages, emails, and phone calls</li>
            <li><span className="text-white font-semibold">Website Usage Data:</span> Information automatically collected when you visit our website, such as IP address, browser type, and pages visited</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-text-muted text-lg leading-relaxed mb-8 space-y-2 ml-4">
            <li>To provide and manage your trash pickup or trailer rental service</li>
            <li>To communicate with you about your account, scheduling, and service updates</li>
            <li>To send you text messages if you have opted in to receive them (see our <a href="/terms-of-service" className="text-orange-500 hover:text-orange-300 transition-colors duration-300">Terms of Service</a> for SMS terms)</li>
            <li>To respond to your inquiries and service requests</li>
            <li>To improve our website and services</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">4. How We Protect Your Information</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">5. Sharing Your Information</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-text-muted text-lg leading-relaxed mb-8 space-y-2 ml-4">
            <li>With service providers who help us operate our business (such as our CRM or messaging platform), solely for the purpose of providing services to you</li>
            <li>If required by law, court order, or government regulation</li>
            <li>To protect the rights, safety, or property of Rankin Waste Management or others</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Our website may use cookies and similar technologies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights and Choices</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-text-muted text-lg leading-relaxed mb-8 space-y-2 ml-4">
            <li><span className="text-white font-semibold">Opt out of text messages:</span> Reply STOP to any text message or contact us directly</li>
            <li><span className="text-white font-semibold">Opt out of emails:</span> Use the unsubscribe link in any email or contact us directly</li>
            <li><span className="text-white font-semibold">Request your data:</span> Contact us to request access to or deletion of your personal information</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Links</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-8">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of our services after changes are posted constitutes your acceptance of the revised policy.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
          <p className="text-text-muted text-lg leading-relaxed mb-2">
            If you have any questions about this Privacy Policy, please contact us:
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
