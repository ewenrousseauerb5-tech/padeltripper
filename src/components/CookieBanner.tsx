'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const consentKey = 'padeltripper_cookie_consent_v1';

type ConsentValue = 'accepted' | 'necessary-only';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(consentKey);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: ConsentValue) => {
    window.localStorage.setItem(consentKey, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-stone-200 bg-white/98 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2">
        <img src="/images/logos/logo-landscape.png" alt="Padel Tripper" className="hidden h-3.5 w-auto sm:block" />
        <p className="min-w-0 flex-1 truncate text-[11px] leading-none text-stone-600">
          We use essential cookies. Optional analytics only with consent.{' '}
          <Link href="/cookie-policy" className="text-brand-red hover:underline">Cookie Policy</Link>
        </p>
        <button
          type="button"
          onClick={() => saveConsent('necessary-only')}
          className="h-7 rounded-full border border-brand-red px-3 text-[10px] font-semibold uppercase tracking-wide text-brand-red hover:bg-red-50"
        >
          Necessary
        </button>
        <button
          type="button"
          onClick={() => saveConsent('accepted')}
          className="h-7 rounded-full border border-brand-red bg-brand-red px-3 text-[10px] font-semibold uppercase tracking-wide text-white hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
