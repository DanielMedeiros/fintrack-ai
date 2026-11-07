import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'FinTrack AI', description: 'Gestão financeira pessoal inteligente.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
