-- TK Adventures Data Migration
-- This migration adds TK Adventures tour packages, hotels, and airbnbs to the database

-- Insert destinations for TK Adventures tours
INSERT INTO destinations (name, description, image_url, highlights) VALUES
('Maasai Mara, Amboseli & Tsavo East', 'Experience the best of Kenya''s wildlife across three iconic parks - witness the Great Migration, see red elephants, and enjoy diverse landscapes.', 'https://www.tkadventures.co.ke/uploads/tours/tk-tour-5-days-maasai-mara-amboseli-tsavo-east-safari.webp', ARRAY['Great Migration', 'Big Five', 'Wildlife', 'Mount Kilimanjaro Views', 'Red Elephants']),
('Mount Kilimanjaro - Marangu Route', 'Climb Africa''s highest peak via the scenic Marangu Route, staying in comfortable mountain huts along the way.', 'https://www.tkadventures.co.ke/uploads/tours/tk-tour-mount-kilimanjaro-hike-marangu-route-6-days.webp', ARRAY['Mountain Climbing', 'Hiking', 'Wildlife', 'Summit Uhuru Peak', 'Scenic Views']),
('Maasai Mara, Lake Nakuru, Samburu & Aberdares', 'A comprehensive 7-day safari covering Kenya''s most diverse ecosystems from savannas to forests.', 'https://www.tkadventures.co.ke/uploads/tours/tk-tour-7-days-maasai-mara-lake-nakuru-samburu-and-aberdares.webp', ARRAY['Great Migration', 'Big Five', 'Flamingos', 'Unique Wildlife', 'Diverse Ecosystems']),
('Diani Beach', 'Pristine white sand beaches along Kenya''s south coast with crystal clear waters and vibrant coral reefs.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', ARRAY['Beach', 'Water Sports', 'Relaxation', 'Coral Reefs', 'Marine Life']),
('Mombasa Beach', 'Historic coastal city with beautiful beaches, rich Swahili culture, and exciting water activities.', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800', ARRAY['Beach', 'History', 'Culture', 'Water Sports', 'Relaxation']),
('Nanyuki', 'Gateway to Mount Kenya with cool climate, stunning mountain views, and abundant wildlife.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', ARRAY['Mountain Views', 'Cool Climate', 'Hiking', 'Nature', 'Relaxation']),
('Diani Beach South', 'Exclusive beachfront location with luxury accommodations and direct ocean access.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', ARRAY['Mountain Views', 'Wildlife', 'Hiking', 'Nature', 'Relaxation']);

-- Insert tours with detailed itineraries
INSERT INTO tours (destination_id, name, description, duration_days, price_per_person, max_group_size, image_url, images, included, itinerary) VALUES
((SELECT id FROM destinations WHERE name = 'Maasai Mara, Amboseli & Tsavo East'), 
'5-Day Maasai Mara, Amboseli & Tsavo East Safari', 
'Experience the ultimate Kenyan safari adventure across three iconic national parks. Witness the Great Migration in Maasai Mara, see massive elephant herds with Mount Kilimanjaro views in Amboseli, and encounter the famous red elephants of Tsavo East. This comprehensive tour offers diverse landscapes, abundant wildlife, and unforgettable cultural experiences with the Maasai people.',
5, 250000.00, 8,
'https://www.tkadventures.co.ke/uploads/tours/tk-tour-5-days-maasai-mara-amboseli-tsavo-east-safari-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/tours/tk-tour-5-days-maasai-mara-amboseli-tsavo-east-safari-1.webp'],
ARRAY['Accommodation', 'Meals', 'Game Drives', 'Transport', 'Professional Guide', 'Park Fees'],
'[{"day": 1, "title": "Arrival in Maasai Mara", "activities": ["Pick up from Nairobi hotel or airport at 7:00 AM", "Scenic drive through the Great Rift Valley", "Stop at viewpoint for panoramic views", "Arrive in Maasai Mara for lunch", "Check in at luxury lodge", "Afternoon game drive to spot lions, cheetahs, and elephants", "Return to lodge for dinner and overnight"]}, {"day": 2, "title": "Full Day in Maasai Mara", "activities": ["Early morning game drive at 6:00 AM", "Breakfast at lodge", "Full day game drive with picnic lunch in the reserve", "Visit to Maasai village to learn about their culture", "Opportunity to witness the Great Migration (seasonal)", "Sundowner drinks in the savanna", "Return to lodge for dinner and overnight"]}, {"day": 3, "title": "Maasai Mara to Amboseli", "activities": ["Early morning game drive at 6:00 AM", "Breakfast and check out from lodge", "Drive to Amboseli National Park via Nairobi", "Lunch en route", "Arrive in Amboseli and check in at lodge", "Afternoon game drive with stunning Mount Kilimanjaro views", "Spot large elephant herds and other wildlife", "Dinner and overnight at lodge"]}, {"day": 4, "title": "Full Day in Amboseli", "activities": ["Early morning game drive at 6:00 AM", "Visit to Observation Hill for panoramic views", "Full day game drive focusing on elephant behavior", "Visit to local Maasai communities", "Photography opportunities with Kilimanjaro backdrop", "Lunch at lodge", "Afternoon game drive", "Dinner and overnight at lodge"]}, {"day": 5, "title": "Amboseli to Tsavo East and Departure", "activities": ["Early morning game drive at 6:00 AM", "Breakfast and check out", "Drive to Tsavo East National Park", "Game drive in Tsavo East to see red elephants", "Visit to Lugard Falls", "Lunch at Tsavo East", "Afternoon game drive", "Return to Nairobi", "Drop off at hotel or airport"]}]'),

((SELECT id FROM destinations WHERE name = 'Mount Kilimanjaro - Marangu Route'),
'6-Day Mount Kilimanjaro Climb - Marangu Route',
'Conquer Africa''s highest peak via the popular Marangu Route, also known as the "Coca-Cola Route." This scenic path takes you through diverse climate zones from lush rainforest to alpine desert. Stay in comfortable mountain huts with bunk beds and dining facilities. Our experienced guides ensure your safety and success in reaching Uhuru Peak at 5,895 meters.',
6, 450000.00, 10,
'https://www.tkadventures.co.ke/uploads/tours/tk-tour-mount-kilimanjaro-hike-marangu-route-6-days-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/tours/tk-tour-mount-kilimanjaro-hike-marangu-route-6-days-1.webp', 'https://www.tkadventures.co.ke/uploads/tours/tk-tour-mount-kilimanjaro-hike-marangu-route-6-days-2.webp', 'https://www.tkadventures.co.ke/uploads/tours/tk-tour-mount-kilimanjaro-hike-marangu-route-6-days-3.webp', 'https://www.tkadventures.co.ke/uploads/tours/tk-tour-mount-kilimanjaro-hike-marangu-route-6-days-4.webp'],
ARRAY['Accommodation in Huts', 'Meals', 'Porters', 'Professional Guides', 'Climbing Permits', 'Park Fees', 'Rescue Fees'],
'[{"day": 1, "title": "Marangu Gate to Mandara Hut", "activities": ["Pick up from hotel in Moshi or Arusha at 8:00 AM", "Drive to Marangu Gate (1,860m)", "Registration and briefing with park rangers", "Begin hike through lush rainforest", "Spot black and white colobus monkeys", "Reach Mandara Hut (2,700m) after 3-4 hours", "Optional walk to Maundi Crater for views", "Dinner and overnight at Mandara Hut"]}, {"day": 2, "title": "Mandara Hut to Horombo Hut", "activities": ["Early breakfast at 7:00 AM", "Begin ascent through heather and moorland zone", "Pass through giant lobelias and groundsels", "Reach Horombo Hut (3,720m) after 4-5 hours", "Lunch at Horombo Hut", "Afternoon acclimatization walk to Zebra Rocks", "Spectacular views of Mawenzi Peak", "Dinner and overnight at Horombo Hut"]}, {"day": 3, "title": "Horombo Hut to Kibo Hut", "activities": ["Early breakfast at 7:00 AM", "Hike through alpine desert zone", "Pass the Last Water point", "Reach Kibo Hut (4,700m) after 5-6 hours", "Lunch and rest at Kibo Hut", "Briefing for summit attempt", "Early dinner at 5:00 PM", "Early sleep to prepare for midnight summit"]}, {"day": 4, "title": "Summit Attempt and Descent", "activities": ["Midnight wake up at 11:30 PM", "Light snack and hot drinks", "Begin summit ascent at 12:00 AM", "Hike through scree slope to Hans Meyer Point", "Reach Gillman''s Point (5,681m) for sunrise", "Continue to Uhuru Peak (5,895m) - Africa''s highest point", "Celebrate at summit with photos", "Descend to Kibo Hut for rest and lunch", "Continue descent to Horombo Hut", "Dinner and overnight at Horombo Hut"]}, {"day": 5, "title": "Horombo Hut to Marangu Gate", "activities": ["Leisurely breakfast at 8:00 AM", "Begin descent through moorland and heather zones", "Stop at Mandara Hut for lunch", "Continue descent to Marangu Gate", "Certificate presentation for successful summit", "Sign out at park office", "Drive back to hotel", "Celebration dinner and overnight at hotel"]}, {"day": 6, "title": "Departure", "activities": ["Breakfast at hotel", "Transfer to Kilimanjaro International Airport or Arusha", "Optional city tour if time permits", "End of tour"]}]'),

((SELECT id FROM destinations WHERE name = 'Maasai Mara, Lake Nakuru, Samburu & Aberdares'),
'7-Day Maasai Mara, Lake Nakuru, Samburu & Aberdares Safari',
'An extraordinary 7-day journey through Kenya''s most diverse ecosystems. From the unique wildlife of Samburu to the tree hotels of Aberdares, the flamingo-filled Lake Nakuru, and the world-famous Maasai Mara. Experience the Great Migration, spot the Big Five, and enjoy boat safaris. This tour offers the complete Kenyan safari experience.',
7, 320000.00, 8,
'https://www.tkadventures.co.ke/uploads/tours/tk-tour-7-days-maasai-mara-lake-nakuru-samburu-and-aberdares-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/tours/tk-tour-7-days-maasai-mara-lake-nakuru-samburu-and-aberdares-1.webp'],
ARRAY['Accommodation', 'Meals', 'Game Drives', 'Transport', 'Professional Guide', 'Park Fees', 'Boat Safari'],
'[{"day": 1, "title": "Nairobi to Samburu", "activities": ["Pick up from Nairobi hotel at 7:00 AM", "Drive north through scenic landscapes", "Cross the equator at Nanyuki", "Arrive in Samburu National Reserve", "Check in at lodge overlooking Ewaso Nyiro River", "Afternoon game drive", "Spot unique wildlife: Grevy''s zebra, reticulated giraffe, Somali ostrich", "Dinner and overnight at lodge"]}, {"day": 2, "title": "Full Day in Samburu", "activities": ["Early morning game drive at 6:00 AM", "Breakfast at lodge", "Full day game drive with picnic lunch", "Visit to Ewaso Nyiro River", "Spot elephants bathing and drinking", "Look for leopards along the riverbanks", "Visit local Samburu communities", "Dinner and overnight at lodge"]}, {"day": 3, "title": "Samburu to Aberdares", "activities": ["Morning game drive at 6:00 AM", "Breakfast and check out", "Drive to Aberdares National Park", "Check in at unique tree hotel", "Afternoon nature walk in the forest", "Spot various monkey species and birds", "Night game viewing from hotel balcony", "Dinner and overnight at tree hotel"]}, {"day": 4, "title": "Aberdares to Lake Nakuru", "activities": ["Early morning wildlife viewing", "Breakfast and check out", "Drive to Lake Nakuru National Park", "Game drive in Lake Nakuru", "View millions of flamingos at the lake shore", "Spot rhinos at the rhino sanctuary", "Visit Baboon Cliff for panoramic views", "Check in at lodge", "Dinner and overnight"]}, {"day": 5, "title": "Lake Nakuru to Maasai Mara", "activities": ["Morning game drive at 6:00 AM", "Breakfast and check out", "Drive through the Great Rift Valley", "Stop at viewpoint for scenic photos", "Arrive in Maasai Mara for lunch", "Check in at lodge", "Afternoon game drive", "Spot lions, cheetahs, and elephants", "Dinner and overnight at lodge"]}, {"day": 6, "title": "Full Day in Maasai Mara", "activities": ["Early morning balloon safari (optional)", "Champagne breakfast in the bush", "Full day game drive with picnic lunch", "Visit to Maasai village for cultural experience", "Witness the Great Migration (seasonal)", "Sundowner drinks in the savanna", "Return to lodge", "Dinner and overnight"]}, {"day": 7, "title": "Maasai Mara to Nairobi", "activities": ["Early morning game drive at 6:00 AM", "Breakfast and check out", "Drive back to Nairobi", "Lunch en route at scenic restaurant", "Arrive in Nairobi in the afternoon", "Optional visit to Giraffe Centre or Elephant Orphanage", "Drop off at hotel or airport", "End of tour"]}]');

-- Insert hotels
INSERT INTO hotels (destination_id, name, description, price_per_night, rating, image_url, images, amenities) VALUES
((SELECT id FROM destinations WHERE name = 'Diani Beach'),
'Baobab Beach Resort & Spa',
'Luxury beachfront resort on Diani Beach with stunning ocean views, multiple pools, world-class spa, and direct beach access. Perfect for families and couples seeking relaxation and adventure.',
45000.00, 4.7,
'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-baobab-beach-resort-spa-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-baobab-beach-resort-spa-1.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-baobab-beach-resort-spa-2.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-baobab-beach-resort-spa-3.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-baobab-beach-resort-spa-4.webp'],
ARRAY['WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Beach Access', 'Air Conditioning', 'Room Service', 'Gym', 'Kids Club', 'Water Sports', 'Conference Facilities']),

((SELECT id FROM destinations WHERE name = 'Diani Beach'),
'Neptune Village Beach Resort & Spa',
'All-inclusive beach resort offering luxury accommodations, multiple swimming pools, extensive entertainment programs, and direct access to pristine Diani Beach. Ideal for families and groups.',
42000.00, 4.6,
'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-neptune-village-beach-resort-spa-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-neptune-village-beach-resort-spa-1.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-neptune-village-beach-resort-spa-2.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-neptune-village-beach-resort-spa-3.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-neptune-village-beach-resort-spa-4.webp'],
ARRAY['WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Beach Access', 'Air Conditioning', 'All-Inclusive', 'Kids Club', 'Entertainment', 'Water Sports', 'Tennis Court']),

((SELECT id FROM destinations WHERE name = 'Nanyuki'),
'Alba Hotel',
'Charming mountain hotel in Nanyuki with stunning views of Mount Kenya. Features cozy rooms with fireplaces, excellent restaurant, and full board dining. Perfect base for exploring Mount Kenya region.',
28000.00, 4.3,
'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-alba-hotel-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-alba-hotel-1.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-alba-hotel-2.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-alba-hotel-3.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-alba-hotel-4.webp'],
ARRAY['WiFi', 'Restaurant', 'Bar', 'Room Service', 'Mountain Views', 'Parking', 'Full Board', 'Fireplace', 'Garden', 'Laundry Service']),

((SELECT id FROM destinations WHERE name = 'Diani Beach South'),
'Diani Sea Resort',
'Luxury all-inclusive resort on the southern end of Diani Beach with private beach, multiple pools, diving center, and extensive water sports facilities. Perfect for beach lovers and diving enthusiasts.',
48000.00, 4.8,
'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-diani-sea-resort-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-diani-sea-resort-1.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-diani-sea-resort-2.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-diani-sea-resort-3.webp', 'https://www.tkadventures.co.ke/uploads/hotels/tk-hotel-diani-sea-resort-4.webp'],
ARRAY['WiFi', 'Swimming Pool', 'Restaurant', 'Bar', 'Beach Access', 'Air Conditioning', 'Room Service', 'All-Inclusive', 'Water Sports', 'Diving Center', 'Spa']);

-- Insert airbnbs
INSERT INTO airbnbs (destination_id, name, description, price_per_night, rating, image_url, images, amenities, max_guests, bedrooms, bathrooms) VALUES
((SELECT id FROM destinations WHERE name = 'Nanyuki'),
'Nanyuki 5-Bedroom Mountain Villa',
'Spacious 5-bedroom villa with stunning Mount Kenya views. Features large living room, dining area, fully equipped kitchen, fireplace, garden, and BBQ area. Perfect for families or groups seeking mountain retreat.',
35000.00, 4.9,
'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-nanyuki-5-bedroom-a1-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-nanyuki-5-bedroom-a1-1.webp', 'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-nanyuki-5-bedroom-a1-2.webp', 'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-nanyuki-5-bedroom-a1-4.webp'],
ARRAY['WiFi', 'Kitchen', 'Living Room', 'Dining Area', 'Parking', 'Garden', 'Mountain Views', 'Fireplace', 'TV', 'Laundry', 'BBQ', 'Security'],
10, 5, 3),

((SELECT id FROM destinations WHERE name = 'Diani Beach'),
'Diani 2-Bedroom Beach Apartment',
'Modern 2-bedroom apartment just steps from Diani Beach. Features balcony with ocean views, air conditioning, fully equipped kitchen, and beach access. Ideal for couples or small families.',
28000.00, 4.7,
'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-diani-2-bedroom-a3-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-diani-2-bedroom-a3-1.webp', 'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-diani-2-bedroom-a3-2.webp', 'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-diani-2-bedroom-a3-3.webp'],
ARRAY['WiFi', 'Kitchen', 'Balcony', 'Air Conditioning', 'Beach Access', 'Parking', 'TV', 'Laundry', 'Ocean Views'],
4, 2, 1),

((SELECT id FROM destinations WHERE name = 'Mombasa Beach'),
'Mombasa 3-Bedroom Oceanfront Villa',
'Luxurious 3-bedroom villa with direct ocean access in Mombasa. Features spacious living and dining areas, balcony, air conditioning, BBQ area, garden, and 24-hour security. Perfect for families or groups.',
32000.00, 4.8,
'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-mombasa-3-bedroom-a5-1.webp',
ARRAY['https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-mombasa-3-bedroom-a5-1.webp', 'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-mombasa-3-bedroom-a5-2.webp', 'https://www.tkadventures.co.ke/uploads/airbnbs/tk-airbnb-mombasa-3-bedroom-a5-3.webp'],
ARRAY['WiFi', 'Kitchen', 'Living Room', 'Dining Area', 'Balcony', 'Air Conditioning', 'Parking', 'Security', 'Ocean Views', 'BBQ', 'Garden'],
6, 3, 2);