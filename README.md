# Kenya Safari Adventures

A modern, production-ready safari booking website built with Next.js, Supabase, and shadcn/ui. Features a beautiful African-inspired design with complete guest booking functionality.

## Features

### Core Functionality
- Browse safari destinations across Kenya
- Explore curated safari tours with detailed itineraries
- View luxury safari lodges and accommodations
- Complete guest bookings without requiring user accounts
- Dynamic pricing calculator
- Interactive date selection
- Responsive design for all devices

### Design Highlights
- Cinematic hero sections with stunning wildlife imagery
- African-inspired color palette (amber, terracotta, earth tones)
- Modern, clean interface with smooth animations
- Professional photography from Pexels
- Mobile-first responsive design

### Technical Stack
- **Framework**: Next.js 13 (App Router)
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

The database schema is already created with the following tables:
- `destinations` - Safari destinations (Masai Mara, Amboseli, etc.)
- `tours` - Safari tour packages with pricing and itineraries
- `hotels` - Luxury lodges and accommodations
- `bookings` - Guest booking records

Sample data is pre-populated with 4 destinations, 5 tours, and 9 hotels.

### 3. Configure Environment Variables

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key
4. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── destinations/     # Destinations listing page
│   ├── tours/           # Tours listing with booking
│   ├── hotels/          # Hotels listing with booking
│   ├── layout.tsx       # Root layout with navigation
│   └── page.tsx         # Home page with hero
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── navigation.tsx   # Main navigation bar
│   ├── footer.tsx       # Site footer
│   └── booking-dialog.tsx # Booking form modal
└── lib/
    └── supabase.ts      # Supabase client & types
```

## Database Schema

### Destinations
- Iconic Kenyan safari locations
- Highlights and descriptions
- High-quality imagery

### Tours
- Multi-day safari packages
- Detailed itineraries
- Inclusions and pricing
- Group size limits

### Hotels
- Luxury safari lodges
- Amenities and ratings
- Nightly rates
- Location links to destinations

### Bookings
- Guest information (no login required)
- Date selection
- Number of guests
- Dynamic pricing calculation
- Special requests field

## Key Features

### Guest-Only Bookings
No user authentication required. Guests simply provide:
- Name, email, phone, country
- Travel dates
- Number of guests
- Special requests

### Dynamic Pricing
- Tours: Fixed price per person × number of guests
- Hotels: Nightly rate × number of nights × number of guests
- Real-time calculation in booking form

### Responsive Design
- Mobile-optimized navigation
- Touch-friendly interfaces
- Adaptive layouts for all screen sizes
- Optimized images

### Row Level Security
All database tables have RLS enabled:
- Public read access for destinations, tours, and hotels
- Public insert access for bookings
- Secure by default

## Customization

### Adding New Destinations

```sql
INSERT INTO destinations (name, description, image_url, highlights)
VALUES (
  'Destination Name',
  'Description...',
  'https://image-url.jpg',
  ARRAY['Highlight 1', 'Highlight 2']
);
```

### Adding New Tours

```sql
INSERT INTO tours (
  destination_id, name, description, duration_days,
  price_per_person, max_group_size, image_url,
  included, itinerary
)
VALUES (...);
```

### Styling

Colors are defined in `app/globals.css` using CSS variables. The current theme uses:
- Primary: Amber (amber-600, amber-700)
- Accent: Orange
- Neutral: Gray scale

Modify these in `tailwind.config.ts` to customize the color scheme.

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Netlify
- Already configured with `netlify.toml`
- Add environment variables in Netlify dashboard
- Deploy from Git

### Other Platforms
Compatible with any Node.js hosting platform that supports Next.js 13+.

## License

MIT License - feel free to use for your projects!

## Support

For issues or questions, please contact support or check the documentation.
# Basuba
