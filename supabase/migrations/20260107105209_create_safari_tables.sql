-- Safari Booking System Database Schema
--
-- 1. New Tables
--    - destinations: Safari destinations in Kenya
--    - tours: Available safari tours with pricing
--    - hotels: Accommodation options
--    - bookings: Guest booking records
--
-- 2. Security
--    - Enable RLS on all tables
--    - Public read access for destinations, tours, hotels
--    - Public insert access for bookings

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  highlights text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  duration_days integer NOT NULL DEFAULT 1,
  price_per_person decimal(10,2) NOT NULL,
  max_group_size integer NOT NULL DEFAULT 10,
  image_url text NOT NULL,
  images text[] DEFAULT '{}',
  included text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
   name text NOT NULL,
   description text NOT NULL,
   price_per_night decimal(10,2) NOT NULL,
   rating decimal(2,1) DEFAULT 4.0,
   image_url text NOT NULL,
   images text[] DEFAULT '{}',
   amenities text[] DEFAULT '{}',
   created_at timestamptz DEFAULT now()
 );

-- Create airbnbs table
CREATE TABLE IF NOT EXISTS airbnbs (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
   name text NOT NULL,
   description text NOT NULL,
   price_per_night decimal(10,2) NOT NULL,
   rating decimal(2,1) DEFAULT 4.5,
   image_url text NOT NULL,
   images text[] DEFAULT '{}',
   amenities text[] DEFAULT '{}',
   max_guests integer NOT NULL DEFAULT 4,
   bedrooms integer NOT NULL DEFAULT 1,
   bathrooms integer NOT NULL DEFAULT 1,
   created_at timestamptz DEFAULT now()
 );

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   booking_type text NOT NULL CHECK (booking_type IN ('tour', 'hotel', 'airbnb')),
   item_id uuid NOT NULL,
   guest_name text NOT NULL,
   guest_email text NOT NULL,
   guest_phone text NOT NULL,
   guest_country text NOT NULL,
   number_of_guests integer NOT NULL DEFAULT 1,
   start_date date NOT NULL,
   end_date date NOT NULL,
   total_price decimal(10,2) NOT NULL,
   deposit_amount decimal(10,2) NOT NULL,
   special_requests text DEFAULT '',
   status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
   created_at timestamptz DEFAULT now()
 );

-- Enable Row Level Security
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE airbnbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for destinations (public read)
CREATE POLICY "Anyone can view destinations"
  ON destinations FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for tours (public read)
CREATE POLICY "Anyone can view tours"
  ON tours FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for hotels (public read)
CREATE POLICY "Anyone can view hotels"
   ON hotels FOR SELECT
   TO anon, authenticated
   USING (true);

-- RLS Policies for airbnbs (public read)
CREATE POLICY "Anyone can view airbnbs"
   ON airbnbs FOR SELECT
   TO anon, authenticated
   USING (true);

-- RLS Policies for bookings (public insert, authenticated read)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

-- Seed data for destinations
INSERT INTO destinations (name, description, image_url, highlights) VALUES
('Maasai Mara National Reserve, Kenya', 'One of the world''s most famous wildlife reserves, known for the Great Migration and big cats.', 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['Great Migration', 'Big Five', 'Maasai Culture']),
('Serengeti National Park, Tanzania', 'Endless plains teeming with wildlife, home to the annual wildebeest migration.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['Great Migration', 'Endless Plains', 'Predator-Prey Dynamics']),
('Amboseli National Park, Kenya', 'Famous for its large elephant herds and stunning views of Mount Kilimanjaro.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', ARRAY['Elephant Herds', 'Mount Kilimanjaro Views', 'Swamp Habitats']),
('Ngorongoro Crater, Tanzania', 'A natural wonder with a collapsed volcano containing diverse wildlife.', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['Crater Ecosystem', 'Diverse Wildlife', 'UNESCO Site']),
('Tsavo National Park, Kenya', 'Known for its red elephants and vast landscapes.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['Red Elephants', 'Lava Flows', 'Man-Eaters History']),
('Kruger National Park, South Africa', 'One of Africa''s largest game reserves with incredible biodiversity.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['Big Five', 'Biodiversity', 'Self-Drive Safaris']),
('Queen Elizabeth National Park, Uganda', 'Known for its tree-climbing lions and diverse birdlife.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['Tree-Climbing Lions', 'Bird Watching', 'Chimpanzee Tracking']),
('Bwindi Impenetrable Forest, Uganda', 'Home to half of the world''s mountain gorillas.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['Mountain Gorillas', 'Rainforest', 'UNESCO Site']),
('Akagera National Park, Rwanda', 'Known for its savannas and wetlands, with giraffes and zebras.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['Savannas', 'Wetlands', 'Giraffe Populations']),
('Chobe National Park, Botswana', 'Famous for its elephant herds and riverfront wildlife.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['Elephant Herds', 'River Safaris', 'Predators']),
('Etosha National Park, Namibia', 'Known for its salt pan and abundant wildlife.', 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['Salt Pan', 'Waterholes', 'Desert Wildlife']),
('Okavango Delta, Botswana', 'A unique inland delta with diverse ecosystems.', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['Inland Delta', 'Wetlands', 'Boat Safaris']),
('Hluhluwe-Imfolozi Park, South Africa', 'Home to the Big Five and conservation success stories.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['Big Five', 'White Rhinos', 'Conservation']),
('Murchison Falls National Park, Uganda', 'Features the powerful Murchison Falls and Nile River wildlife.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['Murchison Falls', 'Nile River', 'Hippo Pools']),
('Zimbabwe''s Mana Pools, Zimbabwe', 'UNESCO site with ancient baobab trees and wildlife.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['Baobab Trees', 'Wildlife', 'UNESCO Site']),
('Moremi Game Reserve, Botswana', 'Part of the Okavango Delta with rich wildlife.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['Okavango Delta', 'Wildlife', ' mokoro Safaris']),
('Ruaha National Park, Tanzania', 'Less crowded park with great leopard sightings.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['Leopard Sightings', 'Ruaha River', 'Wilderness']),
('Selous Game Reserve, Tanzania', 'One of Africa''s largest protected areas.', 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['Large Reserve', 'Wildlife', 'Boat Safaris']),
('Virunga National Park, DRC', 'Home to mountain gorillas and volcanoes.', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['Mountain Gorillas', 'Volcanoes', 'UNESCO Site']),
('Kgalagadi Transfrontier Park, South Africa/Botswana', 'Dune landscapes and desert wildlife.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['Dunes', 'Desert Wildlife', 'Transfrontier']);

-- Seed data for tours
INSERT INTO tours (destination_id, name, description, duration_days, price_per_person, max_group_size, image_url, images, included, itinerary) VALUES
((SELECT id FROM destinations WHERE name = 'Maasai Mara National Reserve, Kenya'), 'Maasai Mara Classic Safari', 'Experience the thrill of the Maasai Mara with game drives and cultural encounters.', 3, 450.00, 6, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives', 'Maasai Village Visit'], '[{"day": 1, "activities": ["Arrival and transfer to lodge", "Afternoon game drive"]}, {"day": 2, "activities": ["Full day game drive", "Maasai village visit"]}, {"day": 3, "activities": ["Morning game drive", "Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Serengeti National Park, Tanzania'), 'Serengeti Migration Safari', 'Witness the Great Migration in the Serengeti plains.', 4, 550.00, 8, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives', 'Hot Air Balloon'], '[{"day": 1, "activities": ["Arrival in Arusha", "Transfer to Serengeti"]}, {"day": 2, "activities": ["Game drives"]}, {"day": 3, "activities": ["Hot air balloon safari"]}, {"day": 4, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Amboseli National Park, Kenya'), 'Amboseli Elephant Safari', 'Focus on elephant herds with Kilimanjaro backdrop.', 2, 350.00, 6, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives'], '[{"day": 1, "activities": ["Arrival", "Game drive"]}, {"day": 2, "activities": ["Full day safari", "Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Ngorongoro Crater, Tanzania'), 'Ngorongoro Crater Tour', 'Explore the crater floor with diverse wildlife.', 1, 250.00, 6, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['Game Drive', 'Meals'], '[{"day": 1, "activities": ["Crater tour", "Return"]}'),
((SELECT id FROM destinations WHERE name = 'Tsavo National Park, Kenya'), 'Tsavo Adventure Safari', 'Experience the wild Tsavo with its unique landscapes.', 3, 400.00, 8, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives'], '[{"day": 1, "activities": ["Arrival", "Game drive"]}, {"day": 2, "activities": ["Full day safari"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Kruger National Park, South Africa'), 'Kruger Big Five Safari', 'Self-drive safari in search of the Big Five.', 5, 600.00, 4, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['Accommodation', 'Meals', 'Self-Drive Vehicle'], '[{"day": 1, "activities": ["Arrival", "Orientation"]}, {"day": 2-4, "activities": ["Self-drive safaris"]}, {"day": 5, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Queen Elizabeth National Park, Uganda'), 'Queen Elizabeth Wildlife Tour', 'Boat safari and chimp tracking.', 3, 500.00, 6, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], ARRAY['Accommodation', 'Meals', 'Boat Safari', 'Chimp Tracking'], '[{"day": 1, "activities": ["Arrival", "Game drive"]}, {"day": 2, "activities": ["Boat safari", "Chimp tracking"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Bwindi Impenetrable Forest, Uganda'), 'Bwindi Gorilla Trek', 'Trek to see mountain gorillas in the mist.', 2, 700.00, 8, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], ARRAY['Accommodation', 'Meals', 'Gorilla Permits', 'Guide'], '[{"day": 1, "activities": ["Arrival", "Briefing"]}, {"day": 2, "activities": ["Gorilla trek", "Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Akagera National Park, Rwanda'), 'Akagera Safari Experience', 'Savanna wildlife and boat safaris.', 3, 450.00, 6, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives', 'Boat Safari'], '[{"day": 1, "activities": ["Arrival", "Game drive"]}, {"day": 2, "activities": ["Boat safari"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Chobe National Park, Botswana'), 'Chobe Elephant Safari', 'Focus on elephants and river wildlife.', 4, 650.00, 8, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives', 'Boat Safari'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2-3, "activities": ["Safaris"]}, {"day": 4, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Etosha National Park, Namibia'), 'Etosha Wildlife Safari', 'Waterhole game viewing.', 3, 550.00, 6, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2, "activities": ["Game drives"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Okavango Delta, Botswana'), 'Okavango Delta Adventure', 'Mokoro canoe safaris in the delta.', 5, 750.00, 6, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['Accommodation', 'Meals', 'Mokoro Safari', 'Walking Safaris'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2-4, "activities": ["Delta activities"]}, {"day": 5, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Hluhluwe-Imfolozi Park, South Africa'), 'Hluhluwe Rhino Safari', 'Rhino conservation and Big Five.', 3, 500.00, 8, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2, "activities": ["Safaris"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Murchison Falls National Park, Uganda'), 'Murchison Falls Tour', 'Falls and Nile wildlife.', 3, 450.00, 6, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], ARRAY['Accommodation', 'Meals', 'Boat Safari', 'Game Drives'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2, "activities": ["Boat safari"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Zimbabwe''s Mana Pools, Zimbabwe'), 'Mana Pools Wilderness', 'Wild camping and wildlife.', 4, 600.00, 6, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], ARRAY['Accommodation', 'Meals', 'Guided Walks'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2-3, "activities": ["Wilderness activities"]}, {"day": 4, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Moremi Game Reserve, Botswana'), 'Moremi Delta Safari', 'Diverse delta wildlife.', 4, 700.00, 8, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['Accommodation', 'Meals', 'Mokoro', 'Walking Safaris'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2-3, "activities": ["Delta safaris"]}, {"day": 4, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Ruaha National Park, Tanzania'), 'Ruaha Leopard Safari', 'Leopard-focused safari.', 3, 550.00, 6, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2, "activities": ["Leopard tracking"]}, {"day": 3, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Selous Game Reserve, Tanzania'), 'Selous Boat Safari', 'Boat safaris on the Rufiji River.', 4, 500.00, 8, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['Accommodation', 'Meals', 'Boat Safaris', 'Walking Safaris'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2-3, "activities": ["River safaris"]}, {"day": 4, "activities": ["Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Virunga National Park, DRC'), 'Virunga Gorilla Trek', 'Mountain gorilla trekking.', 2, 800.00, 6, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['Accommodation', 'Meals', 'Gorilla Permits'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2, "activities": ["Gorilla trek", "Departure"]}'),
((SELECT id FROM destinations WHERE name = 'Kgalagadi Transfrontier Park, South Africa/Botswana'), 'Kgalagadi Desert Safari', 'Dune and desert wildlife.', 3, 600.00, 6, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['Accommodation', 'Meals', 'Game Drives'], '[{"day": 1, "activities": ["Arrival"]}, {"day": 2, "activities": ["Desert safaris"]}, {"day": 3, "activities": ["Departure"]}');

-- Seed data for hotels
INSERT INTO hotels (destination_id, name, description, price_per_night, rating, image_url, images, amenities) VALUES
((SELECT id FROM destinations WHERE name = 'Maasai Mara National Reserve, Kenya'), 'Mara Serena Safari Lodge', 'Luxury lodge overlooking the Mara River.', 250.00, 4.5, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant', 'Laundry']),
((SELECT id FROM destinations WHERE name = 'Serengeti National Park, Tanzania'), 'Serengeti Serena Safari Lodge', 'Comfortable lodge in the heart of the Serengeti.', 220.00, 4.3, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Amboseli National Park, Kenya'), 'Amboseli Serena Safari Lodge', 'Views of Kilimanjaro from every room.', 200.00, 4.4, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant', 'Spa']),
((SELECT id FROM destinations WHERE name = 'Ngorongoro Crater, Tanzania'), 'Ngorongoro Serena Safari Lodge', 'Perched on the crater rim.', 180.00, 4.2, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Tsavo National Park, Kenya'), 'Tsavo Safari Lodge', 'Rustic lodge in Tsavo East.', 150.00, 4.0, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Kruger National Park, South Africa'), 'Kruger Shalati Train', 'Luxury train accommodation.', 300.00, 4.7, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar', 'Spa']),
((SELECT id FROM destinations WHERE name = 'Queen Elizabeth National Park, Uganda'), 'Queen Elizabeth Safari Lodge', 'Overlooking the Kazinga Channel.', 170.00, 4.1, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant']),
((SELECT id FROM destinations WHERE name = 'Bwindi Impenetrable Forest, Uganda'), 'Bwindi Lodge', 'Eco-lodge near the forest.', 160.00, 4.3, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Akagera National Park, Rwanda'), 'Akagera Game Lodge', 'Luxury in the savanna.', 190.00, 4.4, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant']),
((SELECT id FROM destinations WHERE name = 'Chobe National Park, Botswana'), 'Chobe Safari Lodge', 'Riverfront luxury.', 280.00, 4.6, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant', 'Spa']),
((SELECT id FROM destinations WHERE name = 'Etosha National Park, Namibia'), 'Etosha Safari Lodge', 'Near the waterholes.', 140.00, 4.0, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Okavango Delta, Botswana'), 'Okavango Delta Camp', 'Tented camp in the delta.', 350.00, 4.8, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar', 'Spa']),
((SELECT id FROM destinations WHERE name = 'Hluhluwe-Imfolozi Park, South Africa'), 'Hluhluwe Safari Lodge', 'Rhino conservation lodge.', 180.00, 4.2, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant']),
((SELECT id FROM destinations WHERE name = 'Murchison Falls National Park, Uganda'), 'Murchison Safari Lodge', 'Near the falls.', 130.00, 3.9, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Zimbabwe''s Mana Pools, Zimbabwe'), 'Mana Pools Camp', 'Wilderness camp.', 200.00, 4.5, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], ARRAY['Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Moremi Game Reserve, Botswana'), 'Moremi Delta Lodge', 'Luxury in the reserve.', 320.00, 4.7, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['WiFi', 'Pool', 'Restaurant', 'Spa']),
((SELECT id FROM destinations WHERE name = 'Ruaha National Park, Tanzania'), 'Ruaha Safari Lodge', 'Remote wilderness lodge.', 170.00, 4.1, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Selous Game Reserve, Tanzania'), 'Selous Safari Camp', 'Riverside camp.', 150.00, 4.0, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Virunga National Park, DRC'), 'Virunga Lodge', 'Mountain lodge.', 220.00, 4.3, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']),
((SELECT id FROM destinations WHERE name = 'Kgalagadi Transfrontier Park, South Africa/Botswana'), 'Kgalagadi Lodge', 'Desert lodge.', 190.00, 4.4, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['WiFi', 'Restaurant', 'Bar']);

-- Seed data for airbnbs
INSERT INTO airbnbs (destination_id, name, description, price_per_night, rating, image_url, images, amenities, max_guests, bedrooms, bathrooms) VALUES
((SELECT id FROM destinations WHERE name = 'Maasai Mara National Reserve, Kenya'), 'Mara Riverside Cottage', 'Charming cottage by the river.', 120.00, 4.6, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'], ARRAY['WiFi', 'Kitchen', 'Fireplace'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Serengeti National Park, Tanzania'), 'Serengeti Plains Villa', 'Villa with plains view.', 150.00, 4.7, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['WiFi', 'Pool', 'Kitchen'], 6, 3, 2),
((SELECT id FROM destinations WHERE name = 'Amboseli National Park, Kenya'), 'Kilimanjaro View Bungalow', 'Bungalow with mountain views.', 100.00, 4.5, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'], ARRAY['WiFi', 'Kitchen', 'Balcony'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Ngorongoro Crater, Tanzania'), 'Crater Rim Cabin', 'Cabin on the crater rim.', 130.00, 4.4, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['WiFi', 'Kitchen', 'Fireplace'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Tsavo National Park, Kenya'), 'Tsavo Wilderness Lodge', 'Lodge in the wilderness.', 90.00, 4.2, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Kruger National Park, South Africa'), 'Kruger Safari House', 'House near the park.', 140.00, 4.6, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['WiFi', 'Pool', 'Kitchen'], 6, 3, 2),
((SELECT id FROM destinations WHERE name = 'Queen Elizabeth National Park, Uganda'), 'Channel View Cottage', 'Cottage by the channel.', 110.00, 4.3, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Bwindi Impenetrable Forest, Uganda'), 'Forest Edge Cabin', 'Cabin near the forest.', 120.00, 4.5, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Akagera National Park, Rwanda'), 'Savanna Lodge', 'Lodge in the savanna.', 100.00, 4.4, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Chobe National Park, Botswana'), 'Riverfront Villa', 'Villa by the river.', 160.00, 4.8, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['WiFi', 'Pool', 'Kitchen'], 6, 3, 2),
((SELECT id FROM destinations WHERE name = 'Etosha National Park, Namibia'), 'Waterhole Cabin', 'Cabin near waterholes.', 80.00, 4.1, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Okavango Delta, Botswana'), 'Delta Tented Camp', 'Luxury tent in the delta.', 200.00, 4.9, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Hluhluwe-Imfolozi Park, South Africa'), 'Rhino View Lodge', 'Lodge with rhino views.', 130.00, 4.4, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Murchison Falls National Park, Uganda'), 'Falls Cabin', 'Cabin near the falls.', 90.00, 4.0, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Zimbabwe''s Mana Pools, Zimbabwe'), 'Mana Wilderness Cabin', 'Cabin in Mana Pools.', 140.00, 4.6, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'], ARRAY['Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Moremi Game Reserve, Botswana'), 'Reserve Villa', 'Villa in Moremi.', 180.00, 4.7, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'], ARRAY['WiFi', 'Pool', 'Kitchen'], 6, 3, 2),
((SELECT id FROM destinations WHERE name = 'Ruaha National Park, Tanzania'), 'Ruaha Wilderness Lodge', 'Lodge in Ruaha.', 110.00, 4.3, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Selous Game Reserve, Tanzania'), 'Selous Riverside Cabin', 'Cabin by the river.', 100.00, 4.2, 'https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800', ARRAY['https://images.unsplash.com/photo-1547471080-7cc8555ca1f7?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Virunga National Park, DRC'), 'Mountain Cabin', 'Cabin in Virunga.', 150.00, 4.5, 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', ARRAY['https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1),
((SELECT id FROM destinations WHERE name = 'Kgalagadi Transfrontier Park, South Africa/Botswana'), 'Desert Cabin', 'Cabin in the desert.', 120.00, 4.4, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800', ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800'], ARRAY['WiFi', 'Kitchen'], 4, 2, 1);