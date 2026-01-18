'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase, Airbnb, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/booking-dialog';
import { Users, DollarSign, MapPin, Home, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AirbnbsPage() {
  const searchParams = useSearchParams();
  const regionFilter = searchParams.get('region');
  const maxPriceFilter = searchParams.get('maxPrice');

  const [airbnbs, setAirbnbs] = useState<(Airbnb & { destination?: Destination })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAirbnb, setSelectedAirbnb] = useState<Airbnb | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<number | null>(maxPriceFilter ? parseInt(maxPriceFilter) : null);

  useEffect(() => {
    async function fetchAirbnbs() {
      const { data, error } = await supabase.from('airbnbs').select('*, destinations(*)').order('price_per_night');

      if (data && !error) {
        let filteredAirbnbs = data.map((airbnb: any) => ({
          ...airbnb,
          destination: airbnb.destinations,
        }));

        if (regionFilter) {
          filteredAirbnbs = filteredAirbnbs.filter(airbnb =>
            airbnb.destination?.name?.toLowerCase().includes(regionFilter.toLowerCase())
          );
        }

        setAirbnbs(filteredAirbnbs);
      }
      setLoading(false);
    }

    fetchAirbnbs();
  }, [regionFilter]);

  const handleBookNow = (airbnb: Airbnb) => {
    setSelectedAirbnb(airbnb);
    setBookingOpen(true);
  };

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
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Basuba Adventures Airbnbs</h1>
            <p className="text-xl text-gray-200">Unique stays in prime safari locations</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Filter Airbnbs</h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (USD)</label>
              <input
                type="number"
                placeholder="Any price"
                value={priceFilter || ''}
                onChange={(e) => setPriceFilter(e.target.value ? parseInt(e.target.value) : null)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => setPriceFilter(null)}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {airbnbs.filter(airbnb => !priceFilter || airbnb.price_per_night <= priceFilter).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No Airbnbs found for this destination.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airbnbs.filter(airbnb => !priceFilter || airbnb.price_per_night <= priceFilter).map((airbnb) => (
              <Card key={airbnb.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${airbnb.image_url})` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-sm font-semibold">{airbnb.rating}</span>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  {airbnb.destination && (
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{airbnb.destination.name}</span>
                    </div>
                  )}
                  <CardTitle className="text-xl">{airbnb.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {airbnb.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Up to {airbnb.max_guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>{airbnb.bedrooms} bed{airbnb.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="text-sm text-gray-500">Price per night</div>
                        <div className="font-semibold text-lg">$ {airbnb.price_per_night.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/airbnbs/${airbnb.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleBookNow(airbnb)}
                        className="bg-amber-600 hover:bg-amber-700"
                        size="sm"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-800">
                      <strong>Deposit Required:</strong> 50% of total booking cost to confirm reservation
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedAirbnb && (
        <BookingDialog
          open={bookingOpen}
          onOpenChange={setBookingOpen}
          bookingType="airbnb"
          itemId={selectedAirbnb.id}
          itemName={selectedAirbnb.name}
          pricePerUnit={selectedAirbnb.price_per_night}
        />
      )}
    </div>
  );
}