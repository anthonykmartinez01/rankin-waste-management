// src/components/ServiceRequestModal.tsx
//
// Service request modal embedding the GHL form. Byte-identical content,
// markup, dark-theme injection, and DOM-mutation timer logic to pre-
// migration ServiceRequestModal in src/App.jsx (lines 924-1023).
//
// API SHAPE CHANGE (delivery-layer only):
//   Pre-migration: parent owned isOpen via ModalContext, passed down as
//   `isOpen` + `onClose` props. CTAs invoked `openModal()` from context.
//   Post-migration: self-managed isOpen. Component subscribes to
//   CustomEvent 'open-service-modal' on document (the bridge documented
//   in Layout.astro and dispatched by Nav.astro CTAs). User-visible
//   behavior is identical.
//
// MOUNTING:
//   <ServiceRequestModal client:idle /> rendered once at Layout level.
//   client:idle hydrates after main thread is idle — modal won't block
//   initial paint and is interactive within ~1-2s on a typical page.
//
// PRESERVED A11Y GAPS (post-migration-improvements.md #A2):
//   - No focus trap inside modal
//   - No focus return to triggering CTA on close
//   - No Escape-to-close handler
//   - No role='dialog' / aria-modal='true' on container
//   - No aria-labelledby linking modal to its <h2>
//   - No explicit type='button' on close button
//   Pre-migration had none of these; preserved verbatim per delivery-
//   layer scope.

import { useEffect, useRef, useState } from 'react';

const GHL_FORM_URL = 'https://go.kailenflow.com/widget/form/IonAPiOYK1uWC7rxn7Iw';

const GHL_DARK_CSS = `
        .ghl-modal-form-wrap, .ghl-modal-form-wrap .hl-app { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .ghl-form-wrap { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-builder, .ghl-modal-form-wrap .hl_wrapper--inner, .ghl-modal-form-wrap .hl_wrapper--inner-full { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-builder--wrap, .ghl-modal-form-wrap .form-builder--wrap-full { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-field-container, .ghl-modal-form-wrap .field-container, .ghl-modal-form-wrap .form-field-wrapper { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .f-even, .ghl-modal-form-wrap .f-odd { background-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .form-side { background-color: #1a1a1a !important; border-color: #1a1a1a !important; }
        .ghl-modal-form-wrap .field-label, .ghl-modal-form-wrap .label-alignment, .ghl-modal-form-wrap label { color: #ffffff !important; font-size: 14px !important; }
        .ghl-modal-form-wrap .form-control { background-color: #2a2a2a !important; border: 1px solid #444444 !important; color: #ffffff !important; border-radius: 4px !important; }
        .ghl-modal-form-wrap input::placeholder { color: #999999 !important; opacity: 1 !important; }
        .ghl-modal-form-wrap .multiselect, .ghl-modal-form-wrap .multiselect__tags { background-color: #2a2a2a !important; border-color: #444444 !important; }
        .ghl-modal-form-wrap .multiselect__placeholder { color: #999999 !important; }
        .ghl-modal-form-wrap .multiselect__input, .ghl-modal-form-wrap .multiselect__single { background: #2a2a2a !important; color: #ffffff !important; }
        .ghl-modal-form-wrap .button-element { background-color: #e8913a !important; color: #ffffff !important; border: none !important; border-radius: 4px !important; font-weight: 600 !important; }
        .ghl-modal-form-wrap .button-element:hover { background-color: #d47f2e !important; }
        .ghl-modal-form-wrap .checkbox-container, .ghl-modal-form-wrap .checkbox-container *, .ghl-modal-form-wrap .terms-and-conditions, .ghl-modal-form-wrap .terms-and-conditions * { color: #ffffff !important; }
        .ghl-modal-form-wrap .checkbox-container + .checkbox-container { display: none !important; }
        .ghl-modal-form-wrap .terms-and-conditions + .terms-and-conditions { display: none !important; }
        .ghl-modal-form-wrap .heading-element .text-element { display: none !important; }
      `;

export default function ServiceRequestModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  // Subscribe to the open-service-modal CustomEvent. Mounted once at
  // Layout level, so this runs once per page hydration. Cleanup on
  // unmount to prevent listener leaks across hot-reload cycles in dev
  // or repeated hydrations in unusual lifecycle scenarios.
  useEffect(() => {
    const handler = () => setIsOpen(true);
    document.addEventListener('open-service-modal', handler);
    return () => {
      document.removeEventListener('open-service-modal', handler);
    };
  }, []);

  // GHL dark-theme + embed-script + DOM-mutation effect. Runs when modal
  // opens. Byte-identical logic to pre-migration App.jsx:929-997.
  useEffect(() => {
    if (!isOpen) return;

    // Inject dark-theme CSS once (idempotent via id check).
    if (!document.getElementById('ghl-dark-css')) {
      const style = document.createElement('style');
      style.id = 'ghl-dark-css';
      style.textContent = GHL_DARK_CSS;
      document.head.appendChild(style);
    }

    // Load GHL form embed script (inline, not iframe — pre-migration loaded
    // this even though the form is rendered as an iframe; preserved verbatim).
    const existing = document.querySelector(
      'script[src="https://go.kailenflow.com/js/form_embed.js"]'
    );
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://go.kailenflow.com/js/form_embed.js';
      s.async = true;
      document.body.appendChild(s);
    }

    // Apply dark JS overrides after form loads. Two timers (1500ms + 3000ms)
    // catch slow form load. Byte-identical to pre-migration logic.
    const applyDarkTheme = () => {
      const container = formContainerRef.current;
      if (!container) return;
      container.querySelectorAll<HTMLElement>('.form-control').forEach((el) => {
        el.style.setProperty('background-color', '#2a2a2a', 'important');
        el.style.setProperty('border', '1px solid #444', 'important');
        el.style.setProperty('color', '#fff', 'important');
      });
      const btn = container.querySelector<HTMLElement>('.button-element');
      if (btn) btn.style.setProperty('background-color', '#e8913a', 'important');
      container.querySelectorAll<HTMLElement>('.multiselect, .multiselect__tags').forEach((el) => {
        el.style.setProperty('background-color', '#2a2a2a', 'important');
      });
      const cbs = container.querySelectorAll<HTMLElement>('.checkbox-container');
      if (cbs.length > 1) cbs[1].style.setProperty('display', 'none', 'important');
      const tcs = container.querySelectorAll<HTMLElement>('.terms-and-conditions');
      if (tcs.length > 1) tcs[1].style.setProperty('display', 'none', 'important');
      container.querySelectorAll<HTMLElement>('.heading-element .text-element').forEach((el) => {
        el.style.setProperty('display', 'none', 'important');
      });
    };
    const timer = setTimeout(applyDarkTheme, 1500);
    const timer2 = setTimeout(applyDarkTheme, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  const onClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          animation: 'heroFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
          backgroundColor: '#1a1a1a',
        }}
      >
        <div className="bg-orange-500 px-6 py-5 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Request Service</h2>
            <p className="text-white/80 text-sm mt-1">
              We'll get back to you within 24 hours
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-300"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          ref={formContainerRef}
          className="p-0 ghl-modal-form-wrap"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <iframe
            src={GHL_FORM_URL}
            className="w-full border-none"
            style={{ minHeight: '500px', background: '#1a1a1a' }}
            scrolling="no"
            id="modal-ghl-form"
            title="Service Request Form"
          />
        </div>
      </div>
    </div>
  );
}
