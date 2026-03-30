'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [next, setNext] = useState('/dashboard');

  useEffect(() => {
    const url = new URL(window.location.href);
    const nextParam = url.searchParams.get('next');
    if (nextParam && nextParam.startsWith('/dashboard')) {
      setNext(nextParam);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/dashboard/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'Login failed.');
      }
      router.push(next);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0d10] text-white px-6 pt-28 pb-16">
      <section className="max-w-md mx-auto rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-7">
        <p className="text-brand-red text-xs font-semibold uppercase tracking-[0.22em] mb-3">Dashboard Access</p>
        <h1 className="font-serif text-3xl font-black uppercase mb-5">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-2">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/50 mb-2">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="rounded-xl border border-red-300/40 bg-red-400/10 px-3 py-2 text-sm text-red-100">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-red py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}
