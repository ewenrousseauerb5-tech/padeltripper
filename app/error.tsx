'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App render error:', error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-brand-light">
      <div className="max-w-xl w-full rounded-3xl border border-stone-200 bg-white p-8 md:p-10 text-center shadow-sm">
        <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Temporary Error</p>
        <h1 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark mb-4">
          Something Went <span className="text-brand-red">Wrong</span>
        </h1>
        <p className="text-stone-600 leading-relaxed mb-7">
          We hit a temporary issue loading this page. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
        >
          Reload Page
        </button>
      </div>
    </main>
  );
}
