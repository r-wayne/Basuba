'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase, Tour, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/booking-dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, MapPin, Clock, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function TourDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [tour, setTour] = useState<(Tour & { destination?: Destination }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    async function fetchTour() {
      const { data, error } = await supabase
        .from('tours')
        .select('*, destinations(*)')
        .eq('id', id)
        .single();

      if (data && !error) {
        setTour({
          ...data,
          destination: data.destinations,
        });
      }
      setLoading(false);
    }

    if (id) {
      fetchTour();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour not found</h1>
          <Link href="/tours">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tours
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/tours" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tours
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{tour.destination?.name}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{tour.name}</h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{tour.duration_days} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>Max {tour.max_group_size} people</span>
                </div>
              </div>
            </div>

            {tour.images && tour.images.length > 0 ? (
              <Carousel className="mb-8">
                <CarouselContent>
                  {[tour.image_url, ...tour.images].map((image, index) => (
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
                style={{ backgroundImage: `url(${tour.image_url})` }}
              />
            )}

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                What&#39;s Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.included?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {(() => {
              const itinerary = typeof tour.itinerary === 'string' ? (() => { try { return JSON.parse(tour.itinerary); } catch { return []; } })() : tour.itinerary;
              return itinerary && itinerary.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-600" />
                    Detailed Itinerary
                  </h2>
                  <div className="space-y-6">
                    {itinerary.map((day: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center font-bold text-amber-700 text-lg">
                          Day {day.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Day {day.day} Activities</h3>
                          <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                            {day.activities.map((activity: string, actIdx: number) => (
                              <li key={actIdx}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl">Book This Tour</CardTitle>
                <CardDescription>
                  Secure your spot on this incredible safari adventure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm text-gray-500">Price per person</div>
                      <div className="text-2xl font-bold text-gray-900">
                        KES {tour.price_per_person.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Deposit Information</h4>
                  <p className="text-sm text-amber-700">
                    A 50% deposit is required to confirm your booking. The remaining balance is due before tour departure.
                  </p>
                </div>

                <Button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
                >
                  Book Now
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You won&#39;t be charged yet. Booking details will be sent to WhatsApp for confirmation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        bookingType="tour"
        itemId={tour.id}
        itemName={tour.name}
        pricePerUnit={tour.price_per_person}
        durationDays={tour.duration_days}
      />
    </div>
  );
}