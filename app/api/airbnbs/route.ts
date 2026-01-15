import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('airbnbs')
      .select('*, destinations(*)')
      .order('price_per_night');

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch airbnbs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      destination_id,
      name,
      description,
      price_per_night,
      rating,
      image_url,
      images,
      amenities,
      max_guests,
      bedrooms,
      bathrooms
    } = body;

    const { data, error } = await supabase
      .from('airbnbs')
      .insert([{
        destination_id,
        name,
        description,
        price_per_night,
        rating,
        image_url,
        images,
        amenities,
        max_guests,
        bedrooms,
        bathrooms
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create airbnb' }, { status: 500 });
  }
}