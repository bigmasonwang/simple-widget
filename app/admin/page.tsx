"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border">Name</th>
              <th className="px-6 py-3 border">Phone</th>
              <th className="px-6 py-3 border">Email</th>
              <th className="px-6 py-3 border">Date</th>
              <th className="px-6 py-3 border">Status</th>
              <th className="px-6 py-3 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 border">{booking.name}</td>
                <td className="px-6 py-4 border">{booking.phone}</td>
                <td className="px-6 py-4 border">{booking.email}</td>
                <td className="px-6 py-4 border">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border">
                  <span
                    className={`px-2 py-1 rounded ${
                      booking.status === "confirmed"
                        ? "bg-green-200"
                        : "bg-yellow-200"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 border">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
