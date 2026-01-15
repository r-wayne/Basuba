'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2 } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');

      if (data && !error) {
        setDestinations(data);
      }
      setLoading(false);
    }

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Basuba Adventures Destinations</h1>
            <p className="text-xl text-gray-200">Explore spectacular safari locations across Africa</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.image_url})` }}
              />
              <CardHeader>
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Kenya</span>
                </div>
                <CardTitle className="text-3xl">{destination.name}</CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                  {destination.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights?.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="border-amber-300 text-amber-700">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Link href={`/destinations/${destination.id}`}>
                    <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                      View Details
                    </button>
                  </Link>
                  <div className="grid grid-cols-3 gap-2">
                    <Link href={`/tours?destination=${destination.id}`}>
                      <button className="w-full px-3 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm">
                        Tours
                      </button>
                    </Link>
                    <Link href={`/hotels?destination=${destination.id}`}>
                      <button className="w-full px-3 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm">
                        Hotels
                      </button>
                    </Link>
                    <Link href={`/airbnbs?destination=${destination.id}`}>
                      <button className="w-full px-3 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm">
                        Airbnbs
                      </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
