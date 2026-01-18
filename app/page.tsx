'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Hotel, Mountain, Award, Users, Shield } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    category: '',
    maxPrice: '',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.destination) params.set('region', searchFilters.destination);
    if (searchFilters.maxPrice) params.set('maxPrice', searchFilters.maxPrice);

    let path = '/';
    if (searchFilters.category === 'tours') {
      path = '/tours';
    } else if (searchFilters.category === 'hotels') {
      path = '/hotels';
    } else if (searchFilters.category === 'airbnbs') {
      path = '/airbnbs';
    } else {
      // If no category or all, redirect to tours as default
      path = '/tours';
    }

    router.push(`${path}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover the
              <span className="block text-amber-400">Soul of Africa</span>
              <span className="block text-white">with Basuba Adventures</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 leading-relaxed">
              Embark on unforgettable safari adventures with Basuba Adventures through Africa&apos;s most spectacular landscapes and encounter wildlife in their natural habitat.
            </p>

            {/* Search and Filter Component */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-white">Find Your Perfect Safari</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Destination</label>
                  <select
                    value={searchFilters.destination}
                    onChange={(e) => setSearchFilters({ ...searchFilters, destination: e.target.value })}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="" className="bg-gray-800 text-white">All Destinations</option>
                    <option value="kenya" className="bg-gray-800 text-white">Kenya</option>
                    <option value="tanzania" className="bg-gray-800 text-white">Tanzania</option>
                    <option value="uganda" className="bg-gray-800 text-white">Uganda</option>
                    <option value="rwanda" className="bg-gray-800 text-white">Rwanda</option>
                    <option value="ethiopia" className="bg-gray-800 text-white">Ethiopia</option>
                    <option value="south-africa" className="bg-gray-800 text-white">South Africa</option>
                    <option value="botswana" className="bg-gray-800 text-white">Botswana</option>
                    <option value="zimbabwe" className="bg-gray-800 text-white">Zimbabwe</option>
                    <option value="namibia" className="bg-gray-800 text-white">Namibia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
                  <select
                    value={searchFilters.category}
                    onChange={(e) => setSearchFilters({ ...searchFilters, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="" className="bg-gray-800 text-white">All Categories</option>
                    <option value="tours" className="bg-gray-800 text-white">Safari Tours</option>
                    <option value="hotels" className="bg-gray-800 text-white">Luxury Lodges</option>
                    <option value="airbnbs" className="bg-gray-800 text-white">Airbnb Stays</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Max Price (USD)</label>
                  <input
                    type="number"
                    placeholder="Any price"
                    value={searchFilters.maxPrice}
                    onChange={(e) => setSearchFilters({ ...searchFilters, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tours">
                <Button size="lg" className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6">
                  Explore Tours
                </Button>
              </Link>
              <Link href="/destinations">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/20 text-lg px-8 py-6">
                  View Destinations
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Basuba Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience Africa with a trusted local operator committed to excellence and conservation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Expert Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Our certified guides have decades of experience and intimate knowledge of Kenya&apos;s wildlife and ecosystems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Your safety is our priority with well-maintained vehicles, comprehensive insurance, and emergency protocols.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Small Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Intimate group sizes ensure personalized attention and better wildlife viewing opportunities for everyone.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Your Basuba Adventures
            </h2>
            <p className="text-xl text-gray-600">
              Browse our carefully curated safari experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/destinations" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: 'url(https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Mountain className="w-10 h-10 mb-3 text-amber-400" />
                  <h3 className="text-2xl font-bold mb-2">Destinations</h3>
                  <p className="text-gray-200">Explore Kenya&apos;s iconic parks and reserves</p>
                </div>
              </div>
            </Link>

            <Link href="/tours" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: 'url(https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Compass className="w-10 h-10 mb-3 text-amber-400" />
                  <h3 className="text-2xl font-bold mb-2">Safari Tours</h3>
                  <p className="text-gray-200">Curated wildlife experiences for all interests</p>
                </div>
              </div>
            </Link>

            <Link href="/hotels" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Hotel className="w-10 h-10 mb-3 text-amber-400" />
                  <h3 className="text-2xl font-bold mb-2">Luxury Lodges</h3>
                  <p className="text-gray-200">Premium accommodations in pristine wilderness</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Secure & Easy Payments
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We accept M-Pesa payments for convenient and secure transactions across Kenya and East Africa.
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">M-Pesa Payment Details</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Paybill Number:</span>
                  <span className="font-bold text-green-600">222111</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-bold text-green-600">2321644</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-32 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
             Ready for the Adventure of a Lifetime?
           </h2>
           <p className="text-xl mb-8 text-gray-200 leading-relaxed">
             Book your safari with Basuba Adventures today and create memories that will last forever. Our team is ready to help you plan your perfect African adventure.
           </p>
          <Link href="/tours">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-10 py-6">
              Start Planning Your Safari
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
