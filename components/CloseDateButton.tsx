"use client";

import { useState } from "react";

type Props = {
  date: Date;
  onSuccess: () => void;
};

const CloseDateButton: React.FC<Props> = ({ date, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCloseDate = async () => {
    setLoading(true);
    setMessage("");

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatted = `${year}-${month}-${day}`;

    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/close?date=${formatted}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) throw new Error("Greška prilikom zatvaranja dana.");

      const data = await res.json();
      setMessage(data.message || "Uspešno zatvoreno.");
      onSuccess(); // refresuj kalendar ako treba
    } catch (err) {
      setMessage("Greška prilikom zatvaranja dana.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleCloseDate}
        disabled={loading}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
      >
        {loading ? "Zatvaram..." : "Zatvori ovaj dan"}
      </button>

      {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
    </div>
  );
};

export default CloseDateButton;
