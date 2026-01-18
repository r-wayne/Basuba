'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase, Hotel, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/booking-dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Star, DollarSign, Loader2, ArrowLeft, Wifi, Car, ChefHat, Waves } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function HotelDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [hotel, setHotel] = useState<(Hotel & { destination?: Destination }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    async function fetchHotel() {
      const { data, error } = await supabase
        .from('hotels')
        .select('*, destinations(*)')
        .eq('id', id)
        .single();

      if (data && !error) {
        setHotel({
          ...data,
          destination: data.destinations,
        });
      }
      setLoading(false);
    }

    if (id) {
      fetchHotel();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Link href="/hotels">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'Parking': Car,
    'Restaurant': ChefHat,
    'Pool': Waves,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/hotels" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hotels
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{hotel.destination?.name}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-semibold">{hotel.rating}</span>
                </div>
              </div>
            </div>

            {hotel.images && hotel.images.length > 0 ? (
              <Carousel className="mb-8">
                <CarouselContent>
                  {[hotel.image_url, ...hotel.images].map((image, index) => (
                    <CarouselItem key={index}>
                      <div
                        className="h-96 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div
                className="h-96 bg-cover bg-center rounded-lg mb-8"
                style={{ backgroundImage: `url(${hotel.image_url})` }}
              />
            )}

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Lodge</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities & Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hotel.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Star;
                    return (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <Icon className="w-5 h-5 text-amber-600" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl">Book This Lodge</CardTitle>
                <CardDescription>
                  Reserve your luxury safari accommodation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm text-gray-500">Price per night</div>
                      <div className="text-2xl font-bold text-gray-900">
                        $ {hotel.price_per_night.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Deposit Information</h4>
                  <p className="text-sm text-amber-700">
                    A 50% deposit is required to confirm your booking. The remaining balance is due upon arrival.
                  </p>
                </div>

                <Button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
                >
                  Book Now
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You won&apos;t be charged yet. Booking details will be sent to WhatsApp for confirmation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        bookingType="hotel"
        itemId={hotel.id}
        itemName={hotel.name}
        pricePerUnit={hotel.price_per_night}
      />
    </div>
  );
}