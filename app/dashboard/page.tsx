import type { Metadata } from 'next';
import DashboardPage from '@/src/views/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <DashboardPage />;
}
