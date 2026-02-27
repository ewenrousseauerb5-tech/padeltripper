import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/4477939870682"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold shadow-lg shadow-[#25D366]/20 flex items-center gap-2 hover:scale-105 hover:shadow-xl transition-all z-50 text-sm"
    >
      <Phone size={18} />
      <span>Get in touch!</span>
    </a>
  );
}
