import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard Login',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLoginLayout({ children }: { children: ReactNode }) {
  return children;
}
