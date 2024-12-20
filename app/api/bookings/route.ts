import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "app/data/bookings.json");

// Helper function to read bookings
function getBookings() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

// Helper function to write bookings
function saveBookings(bookings: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ bookings }, null, 2));
}

export async function GET() {
  try {
    const data = getBookings();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, date } = body;

    const newBooking = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      date,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const data = getBookings();
    data.bookings.push(newBooking);
    saveBookings(data.bookings);

    return NextResponse.json(newBooking);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
