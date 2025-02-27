import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import arSA from "date-fns/locale/ar-SA";  // Import Arabic locale
import "react-big-calendar/lib/css/react-big-calendar.css";
import { convertToCalendarEvents } from "../utils/calendarUtils";

// Configure locales for the localizer
const locales = { 
  "en-US": enUS,
  "ar": arSA  // i18n.language will be 'ar' for Arabic
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const minTime = new Date();
minTime.setHours(9, 0, 0);
const maxTime = new Date();
maxTime.setHours(22, 0, 0);

const DoctorCalendar = () => {
  const { t, i18n } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("Appointment");
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const doctorsList = t("doctors.list", { returnObjects: true });
    console.log("Doctors from i18n:", doctorsList);
    if (Array.isArray(doctorsList)) {
      setDoctors(doctorsList);
    }
  }, [t]);

  // Convert doctor availability to calendar events
  const events = convertToCalendarEvents(doctors);
  const filteredEvents = selectedDoctor
    ? events.filter(
        (event) =>
          event.resource.doctorName.toLowerCase() === selectedDoctor.toLowerCase()
      )
    : events;

  // When a day cell is selected in month view, switch to week view
  const handleSelectSlot = (slotInfo) => {
    if (currentView === "month") {
      setCurrentDate(slotInfo.start);
      setCurrentView("week");
    }
  };

  // When an event is clicked, open WhatsApp with an encoded message
  const handleSelectEvent = (event) => {
    const doctorName = event.resource.doctorName;
    const dayName = event.start.toLocaleDateString("en-US", { weekday: "long" });
    const timeString = event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const message = `I'd like to reserve an appointment on ${dayName} with Dr. ${doctorName} at time: ${timeString}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  // Calendar label messages for Arabic
  const arabicMessages = {
    allDay: "طوال اليوم",
    previous: "السابق",
    next: "التالي",
    today: "اليوم",
    month: "شهر",
    week: "أسبوع",
    day: "يوم",
    agenda: "جدول",
    date: "تاريخ",
    time: "وقت",
    event: "حدث",
  };

  return (
    <div style={{ height: "500px", padding: "20px" }}>
      {/* Doctor Selection Dropdown */}
      <select
        onChange={(e) => {
          console.log("Selected Doctor:", e.target.value);
          setSelectedDoctor(e.target.value);
        }}
        style={{ marginBottom: "10px", padding: "5px", fontSize: "1em" }}
      >
        <option value="appointment">Appointment</option>
        {doctors?.map((doc) => (
          <option key={doc.name} value={doc.name}>
            {doc.name}
          </option>
        ))}
      </select>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        view={currentView}         // Controlled view
        onView={(view) => setCurrentView(view)}
        date={currentDate}         // Controlled date
        onNavigate={(date) => setCurrentDate(date)}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "day"]}
        min={minTime}
        max={maxTime}
        step={30}
        timeslots={2}
        defaultDate={new Date()}
        dayLayoutAlgorithm="no-overlap"
        scrollToTime={minTime}
        // Set culture based on i18n language
        culture={i18n.language}
        // Pass messages if the language is Arabic
        messages={i18n.language === "ar" ? arabicMessages : {}}
      />
    </div>
  );
};

export default DoctorCalendar;
