"use client";

import { useState } from "react";
import CustomCalendar from "@/components/Calendar";
import AddDefaultTime from "@/components/AddDefaultTime";
import CloseDefaultDays from "@/components/CloseDefaultDays";

export default function WorkingHoursPage() {
  const [reloadKey, setReloadKey] = useState(0);

  // Funkcija za osvežavanje kalendara nakon dodavanja vremena
  const refreshCalendar = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Radno vreme</h1>

      {/* Dugme za dodavanje podrazumevanog vremena */}
      <AddDefaultTime refreshCalendar={refreshCalendar} />
      <CloseDefaultDays refreshCalendar={refreshCalendar} />

      {/* Kalendar koji se osvežava nakon dodavanja vremena */}
      <CustomCalendar key={reloadKey} />
    </div>
  );
}
