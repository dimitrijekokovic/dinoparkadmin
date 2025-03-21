"use client";

import { useState } from "react";

type Props = {
  refreshCalendar: () => void; // Funkcija za osvežavanje kalendara nakon dodavanja vremena
};

const AddDefaultTime: React.FC<Props> = ({ refreshCalendar }) => {
  const [popupOn, setPopupOn] = useState(false);
  const [openTime, setOpenTime] = useState("09:00:00");
  const [closeTime, setCloseTime] = useState("17:00:00");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/generate?openTime=${encodeURIComponent(openTime)}&closeTime=${encodeURIComponent(closeTime)}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Greška pri dodavanju vremena.");

      const data = await res.json();
      setMessage(data.message);
      refreshCalendar(); // Osveži kalendar
    } catch (error) {
      setMessage("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      {/* Dugme za otvaranje popupa */}
      <button
        onClick={() => setPopupOn(true)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Add Default Time
      </button>

      {/* Popup */}
      {popupOn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold">Postavi radno vreme</h2>

            {/* Unos vremena otvaranja i zatvaranja */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">Vreme otvaranja:</label>
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value + ":00")}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">Vreme zatvaranja:</label>
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value + ":00")}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>

            {/* Prikaz poruke nakon slanja */}
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

            {/* Dugmad za potvrdu i zatvaranje */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? "Dodavanje..." : "Dodaj"}
              </button>
              <button
                onClick={() => setPopupOn(false)}
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition"
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

export default AddDefaultTime;
