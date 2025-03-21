"use client";

import { useState } from "react";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CloseDefaultDays = ({ refreshCalendar }: { refreshCalendar: () => void }) => {
  const [popupOn, setPopupOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleCloseDay = async (day: string) => {
    setLoading(true);
    setSelectedDay(day);
    setMessage(null);

    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/toggle-weekday?day=${day}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) throw new Error("Greška prilikom ažuriranja.");

      const data = await res.json();
      setMessage(data.message || `Zatvoren je ${day}`);
      refreshCalendar();
    } catch (error) {
      setMessage("Došlo je do greške.");
    }

    setLoading(false);
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setPopupOn(true)}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Close Default Days
      </button>

      {popupOn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Izaberi dan za zatvaranje</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => handleCloseDay(day)}
                  disabled={loading && selectedDay === day}
                  className={`px-3 py-2 rounded-lg border ${
                    selectedDay === day && loading
                      ? "bg-gray-300"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}

            <div className="text-right">
              <button
                onClick={() => setPopupOn(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseDefaultDays;
