'use client';

import { useEffect, useState } from 'react';

const consentKey = 'padeltripper_cookie_consent_v1';
const consentClientIdKey = 'padeltripper_cookie_consent_client_id';
const policyVersion = '2026-03-01';

type ConsentValue = 'accepted' | 'necessary-only';

export default function CookieSettingsControls() {
  const [current, setCurrent] = useState<ConsentValue | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const value = window.localStorage.getItem(consentKey);
    if (value === 'accepted' || value === 'necessary-only') {
      setCurrent(value);
    }
  }, []);

  const saveConsent = async (value: ConsentValue) => {
    window.localStorage.setItem(consentKey, value);
    const existingClientId = window.localStorage.getItem(consentClientIdKey);
    const clientId = existingClientId || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
    window.localStorage.setItem(consentClientIdKey, clientId);

    setCurrent(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    try {
      await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: value,
          policy_version: policyVersion,
          client_id: clientId,
        }),
      });
    } catch (error) {
      console.error('Failed to store cookie settings:', error);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
      <p className="text-sm text-stone-600 mb-4">
        Current choice:{' '}
        <strong className="text-brand-dark">{current === 'accepted' ? 'Accept optional cookies' : current === 'necessary-only' ? 'Necessary only' : 'Not set yet'}</strong>
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => saveConsent('necessary-only')}
          className="h-9 rounded-full border border-brand-red px-4 text-xs font-semibold uppercase tracking-wide text-brand-red hover:bg-red-50"
        >
          Necessary only
        </button>
        <button
          type="button"
          onClick={() => saveConsent('accepted')}
          className="h-9 rounded-full border border-brand-red bg-brand-red px-4 text-xs font-semibold uppercase tracking-wide text-white hover:opacity-90"
        >
          Accept optional
        </button>
      </div>
      {saved && <p className="mt-3 text-xs text-emerald-600">Cookie preference updated.</p>}
    </div>
  );
}
