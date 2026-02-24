import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const LUMA_API_BASE = 'https://public-api.luma.com';
const CALENDAR_ID = 'cal-XXuTw5tHZg1evbP';

// Fallback event when API is unavailable or no key
const FALLBACK_EVENT = {
  title: "FIND YOUR CO-FOUNDER",
  date: "Feb 14, 2026",
  day: "Saturday",
  time: "3:00 PM - 5:00 PM",
  location: "San Francisco, CA",
  description: "A dedicated networking event for founders looking to meet their perfect match. Whether you're a tech wizard looking for a business mind or vice versa, this is the place to be.",
  tag: "Co-Founder Match",
  link: "https://lu.ma/fk9z9g8t",
};

type LumaEvent = {
  id?: string;
  name?: string;
  start_at?: string;
  end_at?: string;
  duration_interval?: string;
  description?: string | null;
  description_md?: string | null;
  geo_address_json?: {
    full_address?: string | null;
    city_state?: string | null;
    city?: string | null;
    region?: string | null;
    country?: string | null;
  } | null;
  url?: string | null;
};

type LumaEntry = {
  api_id: string;
  event: LumaEvent;
};

function formatEventFromLuma(entry: LumaEntry): typeof FALLBACK_EVENT {
  const e = entry.event;
  const start = e.start_at ? new Date(e.start_at) : null;
  const end = e.end_at ? new Date(e.end_at) : null;

  const dateStr = start
    ? start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
  const dayStr = start
    ? start.toLocaleDateString('en-US', { weekday: 'long' })
    : '';
  const timeStart = start
    ? start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : '';
  const timeEnd = end
    ? end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : '';
  const timeStr = timeEnd ? `${timeStart} - ${timeEnd}` : timeStart;

  const location =
    e.geo_address_json?.full_address ||
    e.geo_address_json?.city_state ||
    e.geo_address_json?.city ||
    '';

  const description =
    (e.description_md && e.description_md.length > 0 ? e.description_md : e.description) ||
    '';

  // Use first few words of name as tag, or default
  const tag = e.name ? e.name.split(/\s+/).slice(0, 2).join(' ') || 'Event' : 'Event';

  const link = e.url || (e.id ? `https://lu.ma/${e.id}` : '');

  return {
    title: e.name || 'Upcoming Event',
    date: dateStr,
    day: dayStr,
    time: timeStr,
    location: location || 'TBD',
    description: description || 'Join us for this gathering.',
    tag,
    link: link || 'https://lu.ma/calendar/' + CALENDAR_ID,
  };
}

export async function GET() {
  try {
    const apiKey = process.env.LUMA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(FALLBACK_EVENT);
    }

    const after = new Date().toISOString();
    const params = new URLSearchParams({
      after,
      sort_column: 'start_at',
      sort_direction: 'asc',
      pagination_limit: '10',
    });

    const res = await fetch(`${LUMA_API_BASE}/v1/calendar/list-events?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-luma-api-key': apiKey,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Luma API error:', res.status, await res.text());
      return NextResponse.json(FALLBACK_EVENT);
    }

    const data = (await res.json()) as { entries?: LumaEntry[] };
    const entries = data.entries ?? [];

    if (entries.length === 0) {
      return NextResponse.json(FALLBACK_EVENT);
    }

    const nextEvent = formatEventFromLuma(entries[0]);
    return NextResponse.json(nextEvent);
  } catch (error) {
    console.error('Error in /api/events:', error);
    return NextResponse.json(FALLBACK_EVENT);
  }
}
