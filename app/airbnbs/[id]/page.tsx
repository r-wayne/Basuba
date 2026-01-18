'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase, Airbnb, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/booking-dialog';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, MapPin, Home, Star, Wifi, Car, ChefHat, Waves, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function AirbnbDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [airbnb, setAirbnb] = useState<(Airbnb & { destination?: Destination }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    async function fetchAirbnb() {
      const { data, error } = await supabase
        .from('airbnbs')
        .select('*, destinations(*)')
        .eq('id', id)
        .single();

      if (data && !error) {
        setAirbnb({
          ...data,
          destination: data.destinations,
        });
      }
      setLoading(false);
    }

    if (id) {
      fetchAirbnb();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!airbnb) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Airbnb not found</h1>
          <Link href="/airbnbs">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Airbnbs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'Parking': Car,
    'Kitchen': ChefHat,
    'Pool': Waves,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/airbnbs" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Airbnbs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{airbnb.destination?.name}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{airbnb.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-semibold">{airbnb.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>Up to {airbnb.max_guests} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="w-5 h-5" />
                  <span>{airbnb.bedrooms} bedroom{airbnb.bedrooms > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {airbnb.images && airbnb.images.length > 0 ? (
              <Carousel className="mb-8">
                <CarouselContent>
                  {[airbnb.image_url, ...airbnb.images].map((image, index) => (
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
                style={{ backgroundImage: `url(${airbnb.image_url})` }}
              />
            )}

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{airbnb.description}</p>
            </div>

            {airbnb.amenities && airbnb.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {airbnb.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Home;
                    return (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
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
                <CardTitle className="text-2xl">Book this Airbnb</CardTitle>
                <CardDescription>
                  Secure your perfect safari accommodation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm text-gray-500">Price per night</div>
                      <div className="text-2xl font-bold text-gray-900">
                        $ {airbnb.price_per_night.toLocaleString()}
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
        bookingType="airbnb"
        itemId={airbnb.id}
        itemName={airbnb.name}
        pricePerUnit={airbnb.price_per_night}
      />
    </div>
  );
}