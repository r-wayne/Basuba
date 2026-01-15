import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Basuba Adventures - Authentic African Safari Experiences',
  description: 'Experience the magic of Africa with Basuba Adventures. Expertly crafted safari tours across Kenya, Tanzania, Uganda, and more. Luxury accommodations and unforgettable wildlife encounters.',
  openGraph: {
    images: [
      {
        url: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg',
      },
    ],
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
