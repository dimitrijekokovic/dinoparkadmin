"use client";

import React from "react";

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
  if (!popupOn || !selectedDate) return null;

  const formattedDate = selectedDate.toLocaleDateString("sv-SE"); // Pravilno formatiranje datuma
  const selectedInfo = workingHours.find((wh) => wh.day === formattedDate);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold">
          Radno vreme za {formattedDate}
        </h2>
        {selectedInfo ? (
          <p className="mt-2 text-gray-700">
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
          <p className="mt-2 text-gray-500">Nema podataka za ovaj dan.</p>
        )}
        <button
          onClick={() => setPopupOn(false)}
          className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Zatvori
        </button>
      </div>
    </div>
  );
};

export default DateTimePopup;
