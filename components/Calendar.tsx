"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DateTimePopup from "./DateTimePopup";

type WorkingHour = {
  id: number;
  day: string;
  open: string;
  close: string;
  status: "Open" | "Closed" | "Iregular";
};

const CustomCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [popupOn, setPopupOn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  // Učitavanje radnog vremena za izabrani mesec
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/WorkingHours/by-month?year=${year}&month=${month}`
        );
        if (!res.ok) throw new Error("Neuspešno učitavanje podataka");
        const data = await res.json();
        setWorkingHours(data);
      } catch (err) {
        console.error("Greška pri učitavanju radnog vremena:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [year, month]);

  // Funkcija za promenu meseca
  const changeMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setMonth((prev) => (prev === 1 ? 12 : prev - 1));
      if (month === 1) setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => (prev === 12 ? 1 : prev + 1));
      if (month === 12) setYear((prev) => prev + 1);
    }
  };

  // Klik na dan otvara popup
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setPopupOn(true);
  };

  // Dohvatanje statusa dana
  const getStatus = (date: Date) => {
    const formattedDate = date.toLocaleDateString("sv-SE"); // Format: YYYY-MM-DD
    const found = workingHours.find((wh) => wh.day === formattedDate);
    return found ? found.status : "Open";
  };

  // Generisanje dana u mesecu
  const generateCalendarDays = () => {
    const firstDate = new Date(year, month - 1, 1);
    const totalDays = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDate.getDay(); // 0 = Nedelja, 1 = Ponedeljak, ...

    // Pomeri tako da ponedeljak bude prvi dan (0)
    const offset = (firstDayOfWeek + 6) % 7;

    const daysArray = [];

    for (let i = 0; i < offset; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month - 1, day));
    }

    return daysArray;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Kontrole meseca */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => changeMonth("prev")} className="text-gray-600 hover:text-black">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <h2 className="text-xl font-bold">{month}.{year}</h2>
        <button onClick={() => changeMonth("next")} className="text-gray-600 hover:text-black">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Učitavanje kalendara...</p>
      ) : (
        <div className="grid grid-cols-7 gap-2 w-full max-w-lg">
          {/* Dani u nedelji */}
          {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}

          {/* Dani u mesecu */}
          {generateCalendarDays().map((date, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center border rounded-lg cursor-pointer
                ${
                  date
                    ? getStatus(date) === "Closed"
                      ? "bg-red-400 text-white"
                      : getStatus(date) === "Iregular"
                      ? "bg-yellow-400 text-black"
                      : date.toDateString() === today.toDateString()
                      ? "border-2 border-blue-500 font-bold" // Obeležen današnji dan
                      : "bg-white"
                    : "invisible"
                }`}
              onClick={() => date && handleDayClick(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      <DateTimePopup
        popupOn={popupOn}
        setPopupOn={setPopupOn}
        selectedDate={selectedDate}
        workingHours={workingHours}
      />
    </div>
  );
};

export default CustomCalendar;
