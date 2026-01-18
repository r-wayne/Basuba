import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Basuba Adventures | Authentic Kenya Safari Tours & Gorilla Trekking',
  description: 'Book authentic African safaris with Basuba Adventures. Maasai Mara, Serengeti, Uganda gorilla trekking. Expert guides, luxury camps. Start your adventure today.',
  openGraph: {
    images: [
      {
        url: 'https://basubaadventures.com/logo.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://basubaadventures.com/logo.png',
      },
    ],
  },
  other: {
    'google-site-verification': 'dvXcFPGAkNytRPPA2KksRXQhuOss4lxcJ0L0famAITk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
