import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Padel Tripper — Padel holidays Spain">
              <img
                src="/images/logos/logo-white-landscape.png"
                alt="Padel Tripper logo"
                className="h-9 w-auto mb-4"
              />
            </Link>
            <p className="text-white/40 text-sm">UK Company Reg: 15698275</p>
          </div>

          {/* Shortcuts */}
          <div>
            <h3 className="font-serif font-bold text-brand-red uppercase tracking-wider text-sm mb-6">Shortcuts</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events#booking" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  Book Your Trip
                </Link>
              </li>
              <li>
                <Link href="/events#tailor" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  Tailor Your Own Event
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-serif font-bold text-brand-red uppercase tracking-wider text-sm mb-6">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="text-white/60 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <a href="mailto:hello@padeltripper.com" className="hover:text-white transition-colors">hello@padeltripper.com</a>
              </li>
              <li className="text-white/60 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <a href="https://wa.me/447939870682" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">+44 7939870682 (WhatsApp only)</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif font-bold text-brand-red uppercase tracking-wider text-sm mb-6">Legal</h3>
            <ul className="space-y-3">
              <li className="text-white/60 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</Link>
              </li>
              <li className="text-white/60 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li className="text-white/60 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            2026 &copy; Padel Tripper - all rights reserved
          </p>
          <a
            href="https://www.instagram.com/padeltripper/"
            target="_blank"
            rel="noreferrer"
            className="text-white/30 hover:text-brand-red transition-colors"
            aria-label="Follow Padel Tripper on Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
