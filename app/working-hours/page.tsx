"use client";

import CustomCalendar from "@/components/Calendar";

export default function WorkingHoursPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Radno vreme</h1>
      <CustomCalendar />
    </div>
  );
}
