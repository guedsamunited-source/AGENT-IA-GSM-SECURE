import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GSM Secure AI Agents',
  description: 'Secure multi-agent AI workspace with source-aware orchestration.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
