import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*, destinations(*)')
      .order('price_per_person');

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      destination_id,
      name,
      description,
      duration_days,
      price_per_person,
      max_group_size,
      image_url,
      images,
      included,
      itinerary
    } = body;

    const { data, error } = await supabase
      .from('tours')
      .insert([{
        destination_id,
        name,
        description,
        duration_days,
        price_per_person,
        max_group_size,
        image_url,
        images,
        included,
        itinerary
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 });
  }
}