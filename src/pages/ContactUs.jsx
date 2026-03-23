import { useState } from 'react';
import { PageHead, InnerHero, PHONE, PHONE_LINK, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '../shared';

export default function ContactUs() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', consent: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    if (!formData.lastName.trim()) e.lastName = 'Last name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.phone.trim()) e.phone = 'Phone is required';
    if (!formData.address.trim()) e.address = 'Address is required';
    if (!formData.consent) e.consent = 'You must grant permission to continue';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? 'border-red-500' : 'border-border-subtle'} rounded px-4 py-3 text-white placeholder-text-faint focus:outline-none focus:border-orange-500 transition-colors duration-300`;

  return (
    <>
      <PageHead
        title="Contact Us — Request Trash Pickup Service | Rankin Waste Management"
        description="Request trash pickup service from Rankin Waste Management. Serving Hubbard, TX and surrounding communities. Call (254) 205-6125 or fill out our service request form."
      />
      <InnerHero title="New Service Request" />
      <section className="px-6 lg:px-[clamp(2rem,5vw,4rem)] py-20 md:py-28">
        <div className="max-w-[700px] mx-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Request Submitted!</h2>
              <p className="text-text-muted mb-6">Thank you, {formData.firstName}! We'll contact you shortly.</p>
              <a href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-bold transition-colors duration-300">Back to Home</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Tommy" className={inputClass('firstName')} />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Rankin" className={inputClass('lastName')} />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass('email')} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(254) 555-0000" className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Hubbard, TX 76648" className={inputClass('address')} />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 accent-orange-500 w-4 h-4" id="consent" />
                <label htmlFor="consent" className="text-text-muted text-sm leading-relaxed">
                  I grant Rankin Waste Management permission to contact me via email regarding my service request. *
                </label>
              </div>
              {errors.consent && <p className="text-red-400 text-xs">{errors.consent}</p>}
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded font-bold text-lg transition-colors duration-300 min-h-[44px]">
                Submit Service Request
              </button>
            </form>
          )}

          {/* Business info */}
          <div className="mt-16 pt-12 border-t border-border-subtle">
            <h3 className="text-lg font-semibold mb-6 text-center">Contact Information</h3>
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
