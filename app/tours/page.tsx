'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase, Tour, Destination } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/booking-dialog';
import { Calendar, Users, DollarSign, MapPin, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ToursPage() {
  const searchParams = useSearchParams();
  const destinationFilter = searchParams.get('destination');

  const [tours, setTours] = useState<(Tour & { destination?: Destination })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTours() {
      let query = supabase.from('tours').select('*, destinations(*)');

      if (destinationFilter) {
        query = query.eq('destination_id', destinationFilter);
      }

      const { data, error } = await query.order('price_per_person');

      if (data && !error) {
        setTours(
          data.map((tour: any) => ({
            ...tour,
            destination: tour.destinations,
          }))
        );
      }
      setLoading(false);
    }

    fetchTours();
  }, [destinationFilter]);

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
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
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Basuba Adventures Tours</h1>
            <p className="text-xl text-gray-200">Expertly crafted wildlife adventures</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Filter Tours</h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (KES)</label>
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

        {tours.filter(tour => !priceFilter || tour.price_per_person <= priceFilter).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No tours found for this destination.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {tours.filter(tour => !priceFilter || tour.price_per_person <= priceFilter).map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  <div
                    className="h-64 lg:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${tour.image_url})` }}
                  />

                  <div className="lg:col-span-2">
                    <CardHeader>
                      {tour.destination && (
                        <div className="flex items-center gap-2 text-amber-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{tour.destination.name}</span>
                        </div>
                      )}
                      <CardTitle className="text-3xl">{tour.name}</CardTitle>
                      <CardDescription className="text-base leading-relaxed mt-2">
                        {tour.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-5 h-5 text-amber-600" />
                          <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-semibold">{tour.duration_days} Days</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-5 h-5 text-amber-600" />
                          <div>
                            <div className="text-sm text-gray-500">Max Group</div>
                            <div className="font-semibold">{tour.max_group_size} People</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                           <DollarSign className="w-5 h-5 text-amber-600" />
                           <div>
                             <div className="text-sm text-gray-500">Price per person</div>
                             <div className="font-semibold">KES {tour.price_per_person.toLocaleString()}</div>
                           </div>
                         </div>

                        <div className="flex gap-2">
                           <Link href={`/tours/${tour.id}`}>
                             <Button variant="outline">
                               View Details
                             </Button>
                           </Link>
                           <Button
                             onClick={() => handleBookNow(tour)}
                             className="bg-amber-600 hover:bg-amber-700"
                           >
                             Book Now
                           </Button>
                         </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          What's Included
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {tour.included?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {tour.itinerary && tour.itinerary.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            Itinerary Highlights
                          </h4>
                          <div className="space-y-2">
                            {tour.itinerary.slice(0, 3).map((day: any, idx: number) => (
                              <div key={idx} className="flex gap-3">
                                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center font-bold text-amber-700">
                                  Day {day.day}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{day.title}</div>
                                  <div className="text-sm text-gray-600">{day.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedTour && (
        <BookingDialog
          open={bookingOpen}
          onOpenChange={setBookingOpen}
          bookingType="tour"
          itemId={selectedTour.id}
          itemName={selectedTour.name}
          pricePerUnit={selectedTour.price_per_person}
          durationDays={selectedTour.duration_days}
        />
      )}
    </div>
  );
}
