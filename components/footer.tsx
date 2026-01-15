import { Palmtree, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-amber-900 to-orange-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <Palmtree className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold">Basuba Adventures</div>
                <div className="text-xs text-amber-200">Authentic African Safari Experiences</div>
              </div>
            </div>
            <p className="text-sm text-amber-100 leading-relaxed">
              Experience the magic of Africa with Basuba Adventures. Expertly crafted safari tours across Kenya, Tanzania, Uganda, and more. Luxury accommodations and unforgettable wildlife encounters.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="text-amber-100 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-amber-100 hover:text-white transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-amber-100 hover:text-white transition-colors">
                  Hotels
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-amber-100">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-amber-100">+254 712 345 678</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-amber-100">info@basubaadventures.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-sm text-amber-100 leading-relaxed">
              We are a locally-owned safari operator committed to providing authentic African experiences while supporting conservation and local communities.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-800 text-center">
          <p className="text-sm text-amber-200">
            © 2026 Basuba Adventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
