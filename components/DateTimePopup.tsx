"use client";

import React, { useState } from "react";

type WorkingHour = {
  id: number;
  day: string;
  open: string;
  close: string;
  status: "Open" | "Closed" | "Iregular";
};

type Props = {
  popupOn: boolean;
  setPopupOn: (value: boolean) => void;
  selectedDate: Date | null;
  workingHours: WorkingHour[];
};

const DateTimePopup: React.FC<Props> = ({
  popupOn,
  setPopupOn,
  selectedDate,
  workingHours,
}) => {
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [message, setMessage] = useState("");

  if (!popupOn || !selectedDate) return null;

  const formattedDate = selectedDate.toLocaleDateString("sv-SE"); // YYYY-MM-DD
  const selectedInfo = workingHours.find((wh) => wh.day === formattedDate);

  const dateParam = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;

  const handleCustomHours = async () => {
    if (!openTime || !closeTime) return;

    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/custom-hours?date=${dateParam}&openTime=${openTime}:00&closeTime=${closeTime}:00`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      setMessage(data.message || "Uspešno ažurirano.");
    } catch (err) {
      setMessage("Greška pri ažuriranju.");
    }
  };

  const handleCloseDay = async () => {
    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/close?date=${dateParam}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      setMessage(data.message || "Dan uspešno zatvoren.");
    } catch (err) {
      setMessage("Greška pri zatvaranju dana.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-xl font-semibold">
          Radno vreme za {formattedDate}
        </h2>

        {selectedInfo ? (
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                selectedInfo.status === "Closed"
                  ? "text-red-500"
                  : selectedInfo.status === "Iregular"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {selectedInfo.status}
            </span>
            <br />
            <strong>Otvoreno:</strong> {selectedInfo.open} - {selectedInfo.close}
          </p>
        ) : (
          <p className="text-gray-500">Nema podataka za ovaj dan.</p>
        )}

        {/* Unos radnog vremena */}
        <div className="flex gap-2">
          <input
            type="time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="Otvaranje"
          />
          <input
            type="time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="Zatvaranje"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleCustomHours}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
          >
            Postavi radno vreme
          </button>

          <button
            onClick={handleCloseDay}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Zatvori dan
          </button>
        </div>

        {message && <p className="text-sm text-center mt-2 text-gray-700">{message}</p>}

        <button
          onClick={() => setPopupOn(false)}
          className="mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded w-full"
        >
          Zatvori prozor
        </button>
      </div>
    </div>
  );
};

export default DateTimePopup;
