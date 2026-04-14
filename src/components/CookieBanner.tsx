'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const consentKey = 'padeltripper_cookie_consent_v1';
const consentClientIdKey = 'padeltripper_cookie_consent_client_id';
const policyVersion = '2026-03-01';

type ConsentValue = 'accepted' | 'necessary-only';

function getStoredValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredValue(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures (private mode / restricted browsers).
  }
}

function buildClientId(): string {
  const existingClientId = getStoredValue(consentClientIdKey);
  if (existingClientId) return existingClientId;

  const randomId =
    globalThis.crypto && 'randomUUID' in globalThis.crypto
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  setStoredValue(consentClientIdKey, randomId);
  return randomId;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = getStoredValue(consentKey);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: ConsentValue) => {
    setStoredValue(consentKey, value);
    const clientId = buildClientId();

    // Do not block UI if backend logging fails.
    void fetch('/api/cookie-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        decision: value,
        policy_version: policyVersion,
        client_id: clientId,
      }),
    });

    window.dispatchEvent(new Event('cookie-consent-updated'));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-stone-200 bg-white/98 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2">
        <Image
          src="/images/logos/logo-landscape.png"
          alt="Padel Tripper"
          width={140}
          height={22}
          className="hidden h-3.5 w-auto sm:block"
        />
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
