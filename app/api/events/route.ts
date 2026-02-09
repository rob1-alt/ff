import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // URL of your Luma calendar
    const calendarUrl = 'https://luma.com/calendar/cal-XXuTw5tHZg1evbP';
    
    // In a real application, you might use an official API or a scraper library.
    // Here we return the latest event details found on your calendar:
    // https://luma.com/fk9z9g8t - FIND YOUR CO-FOUNDER
    
    return NextResponse.json({
      title: "FIND YOUR CO-FOUNDER",
      date: "Feb 14, 2026",
      day: "Saturday",
      time: "3:00 PM - 5:00 PM",
      location: "San Francisco, CA",
      description: "A dedicated networking event for founders looking to meet their perfect match. Whether you're a tech wizard looking for a business mind or vice versa, this is the place to be.",
      tag: "Co-Founder Match",
      link: "https://luma.com/fk9z9g8t"
    });
  } catch (error) {
    console.error("Error in /api/events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
