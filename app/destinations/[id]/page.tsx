'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase, Destination, Tour, Hotel, Airbnb } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, DollarSign, Loader2, ArrowLeft, Calendar, Users, Home } from 'lucide-react';
import Link from 'next/link';

export default function DestinationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [destination, setDestination] = useState<Destination | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [airbnbs, setAirbnbs] = useState<Airbnb[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinationData() {
      // Fetch destination
      const { data: destData, error: destError } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();

      if (destData && !destError) {
        setDestination(destData);

        // Fetch related tours
        const { data: toursData } = await supabase
          .from('tours')
          .select('*')
          .eq('destination_id', id);

        if (toursData) setTours(toursData);

        // Fetch related hotels
        const { data: hotelsData } = await supabase
          .from('hotels')
          .select('*')
          .eq('destination_id', id);

        if (hotelsData) setHotels(hotelsData);

        // Fetch related airbnbs
        const { data: airbnbsData } = await supabase
          .from('airbnbs')
          .select('*')
          .eq('destination_id', id);

        if (airbnbsData) setAirbnbs(airbnbsData);
      }
      setLoading(false);
    }

    if (id) {
      fetchDestinationData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/destinations">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/destinations" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Link>

        {/* Hero Section */}
        <div
          className="relative h-[50vh] bg-cover bg-center rounded-2xl mb-12 overflow-hidden"
          style={{ backgroundImage: `url(${destination.image_url})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {destination.description}
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {destination.highlights && destination.highlights.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destination.highlights.map((highlight, index) => (
                <Card key={index} className="border-amber-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="font-medium text-gray-900">{highlight}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tours Section */}
        {tours.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Available Tours</h2>
              <Link href={`/tours?destination=${id}`}>
                <Button variant="outline">View All Tours</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.slice(0, 3).map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tour.image_url})` }}
                  />
                  <CardHeader>
                    <CardTitle className="text-xl">{tour.name}</CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{tour.duration_days} days</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Max {tour.max_group_size}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-amber-600">
                        KES {tour.price_per_person.toLocaleString()}
                      </div>
                      <Link href={`/tours/${tour.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Hotels Section */}
        {hotels.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Luxury Lodges</h2>
              <Link href={`/hotels?destination=${id}`}>
                <Button variant="outline">View All Hotels</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.slice(0, 3).map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${hotel.image_url})` }}
                  >
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-gray-900">{hotel.rating}</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{hotel.name}</CardTitle>
                    <CardDescription>{hotel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-amber-600">
                        KES {hotel.price_per_night.toLocaleString()}/night
                      </div>
                      <Link href={`/hotels/${hotel.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Airbnbs Section */}
        {airbnbs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Airbnb Accommodations</h2>
              <Link href={`/airbnbs?destination=${id}`}>
                <Button variant="outline">View All Airbnbs</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airbnbs.slice(0, 3).map((airbnb) => (
                <Card key={airbnb.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${airbnb.image_url})` }}
                  >
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-gray-900">{airbnb.rating}</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{airbnb.name}</CardTitle>
                    <CardDescription>{airbnb.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Up to {airbnb.max_guests}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Home className="w-4 h-4" />
                        <span>{airbnb.bedrooms} bed{airbnb.bedrooms > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-amber-600">
                        KES {airbnb.price_per_night.toLocaleString()}/night
                      </div>
                      <Link href={`/airbnbs/${airbnb.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}