import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";  // Import i18n hook
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { convertToCalendarEvents } from "../utils/calendarUtils"; 

const locales = { "en-US": enUS };

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
  const { t } = useTranslation();  // Get translation function
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("Appointment");

  // Load doctors from i18n JSON when language changes
  useEffect(() => {
    const doctorsList = t("doctors.list", { returnObjects: true });
    console.log("Doctors from i18n:", doctorsList); // Debugging
    if (Array.isArray(doctorsList)) {
      setDoctors(doctorsList);
    }
  }, [t]); // Runs whenever translations change

  // Convert JSON doctor availability to calendar events
  const events = convertToCalendarEvents(doctors);

  const filteredEvents = selectedDoctor
    ? events.filter((event) => event.resource.doctorName.toLowerCase() === selectedDoctor.toLowerCase())
    : events;


  return (
    <div style={{ height: "500px", padding: "20px" }}>
      {/* Doctor Selection Dropdown */}

      <select
        onChange={(e) => {
          console.log("Selected Doctor:", e.target.value); // Debugging
          setSelectedDoctor(e.target.value);
        }}
        style={{ marginBottom: "10px", padding: "5px", fontSize: "1em" }}
      >
        <option value="appointment">Appointment</option> {/* Default option */}
        {/* <option value="">All Doctors</option> */}
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
        defaultView="month"
        views={["month","week", "day"]}
        min={minTime}
        max={maxTime}
        step={30}
        timeslots={2}
        defaultDate={new Date()}
        dayLayoutAlgorithm="no-overlap"
        scrollToTime={minTime}
      />
    </div>
  );
};

export default DoctorCalendar;
