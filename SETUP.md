# Setup Guide - Kenya Safari Adventures

This guide will help you set up your Kenya Safari booking website from scratch.

## Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Sample data loaded
- [ ] Dependencies installed
- [ ] Development server running

## Detailed Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including Next.js, Supabase client, shadcn/ui components, and more.

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: "kenya-safari" (or your choice)
   - Database Password: (save this securely)
   - Region: Choose closest to your target audience
6. Wait for project to be created (1-2 minutes)

### 3. Set Up Database

The database schema has already been created with these migrations:
- ✅ Destinations table with sample data (4 destinations)
- ✅ Tours table with sample data (5 tours)
- ✅ Hotels table with sample data (9 hotels)
- ✅ Bookings table (empty, ready for guest bookings)
- ✅ Row Level Security (RLS) policies configured

All tables are secured with RLS:
- **Public Read**: Destinations, Tours, Hotels
- **Public Insert**: Bookings
- **Authenticated Read**: All Bookings

### 4. Get Your API Credentials

1. In your Supabase project dashboard
2. Go to **Settings** (gear icon in sidebar)
3. Click **API** in the settings menu
4. You'll see two important values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 5. Configure Environment Variables

Create or update `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-full-key
```

**Important**:
- Never commit `.env.local` to git (already in .gitignore)
- Use your actual values, not the placeholders
- Both variables must start with `NEXT_PUBLIC_` for client-side access

### 6. Verify Database Content

You can verify your data in Supabase:

1. Go to **Table Editor** in Supabase dashboard
2. Check these tables have data:
   - `destinations` → 4 rows
   - `tours` → 5 rows
   - `hotels` → 9 rows
   - `bookings` → 0 rows (will fill as guests book)

### 7. Run Development Server

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### 8. Test Booking Flow

1. Go to **Tours** page
2. Click "Book Now" on any tour
3. Fill in the booking form:
   - Guest details
   - Travel dates
   - Number of guests
   - Special requests (optional)
4. Click "Confirm Booking"
5. Check the `bookings` table in Supabase to see the new record

## Project Structure

```
kenya-safari/
├── app/
│   ├── destinations/     # Browse all destinations
│   ├── tours/           # Browse and book tours
│   ├── hotels/          # Browse and book hotels
│   ├── layout.tsx       # Main layout with nav & footer
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles & CSS variables
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── navigation.tsx   # Top navigation bar
│   ├── footer.tsx       # Site footer
│   └── booking-dialog.tsx # Booking modal & form
├── lib/
│   └── supabase.ts      # Supabase client & TypeScript types
├── .env.local           # Environment variables (create this)
└── README.md            # Documentation
```

## Understanding the Data Model

### Destinations
Each destination represents a national park or reserve:
- **Masai Mara** - Famous for Great Migration
- **Amboseli** - Mount Kilimanjaro views
- **Tsavo** - Largest park system
- **Samburu** - Rare wildlife species

### Tours
Safari packages linked to destinations:
- Duration in days
- Price per person
- Maximum group size
- Detailed itinerary
- Inclusions list

### Hotels
Accommodation options in each destination:
- Nightly rate
- Star rating
- Amenities list
- Location within destination

### Bookings
Guest reservations (no login required):
- Guest contact information
- Travel dates
- Number of guests
- Total calculated price
- Status (pending/confirmed/cancelled)

## Customization Tips

### Change Colors

Edit `app/globals.css` and `tailwind.config.ts`:

```css
/* Current: Amber/Orange theme */
--primary: 45 93% 47%;  /* Amber-600 */

/* Example: Change to Blue */
--primary: 217 91% 60%;  /* Blue-500 */
```

### Add New Destinations

```sql
INSERT INTO destinations (name, description, image_url, highlights)
VALUES (
  'Lake Nakuru',
  'Famous for flamingos and rhino sanctuary...',
  'https://images.pexels.com/photos/xxx.jpeg',
  ARRAY['Flamingo flocks', 'Rhino tracking', 'Bird watching']
);
```

### Modify Pricing

Update tour or hotel pricing in Supabase Table Editor or via SQL:

```sql
UPDATE tours
SET price_per_person = 2500.00
WHERE name = 'Great Migration Safari';
```

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

Your site will be live in minutes!

### Deploy to Netlify

Already configured with `netlify.toml`:

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import existing project"
4. Select your repository
5. Add environment variables in Site settings
6. Deploy

## Troubleshooting

### "Failed to fetch" errors
- Check environment variables are correct
- Verify Supabase project is active
- Check browser console for specific error

### No data showing on pages
- Verify database tables have data
- Check RLS policies are enabled
- Test with Supabase Table Editor first

### Booking form not working
- Check browser console for errors
- Verify all required fields are filled
- Ensure dates are in the future

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Security Notes

### What's Protected
- Database credentials (never exposed to client)
- Row Level Security on all tables
- Guest data encrypted in transit
- API keys in environment variables

### What's Public
- Destinations, tours, and hotels (read-only)
- Guest booking submissions (write-only)
- Static assets and images

### Production Checklist
- [ ] RLS enabled on all tables
- [ ] Environment variables set in hosting platform
- [ ] `.env.local` in .gitignore
- [ ] Database backups enabled in Supabase
- [ ] Custom domain with HTTPS

## Next Steps

After setup, consider:
1. Customize content and imagery
2. Add your own destinations and tours
3. Configure email notifications for new bookings
4. Add payment integration (Stripe recommended)
5. Implement admin dashboard for managing bookings
6. Add Google Analytics or analytics service
7. Optimize images for faster loading
8. Add more safari destinations

Happy building! Your Kenya Safari website is ready to take bookings.
