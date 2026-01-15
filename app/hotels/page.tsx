'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase, Hotel, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/booking-dialog';
import { MapPin, Star, DollarSign, Loader2, Wifi, Utensils, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const destinationFilter = searchParams.get('destination');

  const [hotels, setHotels] = useState<(Hotel & { destination?: Destination })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    async function fetchHotels() {
      let query = supabase.from('hotels').select('*, destinations(*)');

      if (destinationFilter) {
        query = query.eq('destination_id', destinationFilter);
      }

      const { data, error } = await query.order('rating', { ascending: false });

      if (data && !error) {
        setHotels(
          data.map((hotel: any) => ({
            ...hotel,
            destination: hotel.destinations,
          }))
        );
      }
      setLoading(false);
    }

    fetchHotels();
  }, [destinationFilter]);

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
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
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Basuba Adventures Lodges</h1>
            <p className="text-xl text-gray-200">Premium accommodations in the heart of the wilderness</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {hotels.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No hotels found for this destination.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${hotel.image_url})` }}
                >
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-gray-900">{hotel.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  {hotel.destination && (
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{hotel.destination.name}</span>
                    </div>
                  )}
                  <CardTitle className="text-2xl">{hotel.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed mt-2">
                    {hotel.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities?.slice(0, 6).map((amenity, idx) => (
                        <Badge key={idx} variant="outline" className="border-amber-300 text-amber-700">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities && hotel.amenities.length > 6 && (
                        <Badge variant="outline" className="border-gray-300 text-gray-600">
                          +{hotel.amenities.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="text-2xl font-bold text-amber-600">
                        KES {hotel.price_per_night.toLocaleString()}
                        <span className="text-sm font-normal text-gray-600">/night</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/hotels/${hotel.id}`}>
                        <Button variant="outline" size="lg">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleBookNow(hotel)}
                        className="bg-amber-600 hover:bg-amber-700"
                        size="lg"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedHotel && (
        <BookingDialog
          open={bookingOpen}
          onOpenChange={setBookingOpen}
          bookingType="hotel"
          itemId={selectedHotel.id}
          itemName={selectedHotel.name}
          pricePerUnit={selectedHotel.price_per_night}
        />
      )}
    </div>
  );
}
