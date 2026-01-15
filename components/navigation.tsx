'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Palmtree, ChevronDown, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Check if logo exists and set the correct src
    const checkLogo = async () => {
      const formats = ['png', 'jpg', 'jpeg', 'svg', 'webp'];

      for (const format of formats) {
        try {
          const response = await fetch(`/assets/logo.${format}`);
          if (response.ok) {
            setLogoSrc(`/assets/logo.${format}`);
            return;
          }
        } catch {}
      }

      // No logo found
      setLogoSrc(null);
    };

    checkLogo();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours' },
    { href: '/hotels', label: 'Hotels' },
    { href: '/airbnbs', label: 'Airbnbs' },
  ];

  const destinationLinks = [
    { href: '/destinations?region=kenya', label: 'Kenya' },
    { href: '/destinations?region=tanzania', label: 'Tanzania' },
    { href: '/destinations?region=uganda', label: 'Uganda' },
    { href: '/destinations?region=rwanda', label: 'Rwanda' },
    { href: '/destinations?region=ethiopia', label: 'Ethiopia' },
    { href: '/destinations?region=south-africa', label: 'South Africa' },
    { href: '/destinations?region=botswana', label: 'Botswana' },
    { href: '/destinations?region=zimbabwe', label: 'Zimbabwe' },
    { href: '/destinations?region=namibia', label: 'Namibia' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Basuba Adventures Logo"
                width={200}
                height={200}
                className="h-[120px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[180px] lg:w-[180px] object-contain group-hover:scale-110 transition-transform"
              />
            ) : (
              <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-4 rounded-lg group-hover:scale-110 transition-transform">
                <Palmtree className="h-12 w-12 text-white" />
              </div>
            )}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Destinations <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {destinationLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="w-full">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-amber-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-amber-100 pt-3">
              <div className="px-4 py-2 text-gray-900 font-medium">Destinations</div>
              {destinationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-8 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
