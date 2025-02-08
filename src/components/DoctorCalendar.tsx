import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import { enUS } from 'date-fns/locale';
// import { zonedTimeToUtc } from 'date-fns-tz';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup localizer with date-fns
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Configure time bounds (9 AM to 9 PM)
const minTime = new Date();
minTime.setHours(9, 0, 0);
const maxTime = new Date();
maxTime.setHours(21, 0, 0);

const DoctorCalendar = ({ events, onSelectSlot }) => {
  // Customize the appearance of events
  const eventStyleGetter = (event) => {
    const backgroundColor = event.type === 'available' ? '#90EE90' : '#FF7F7F';
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        border: 'none',
        color: '#000',
        fontSize: '0.8em',
      },
    };
  };

  return (
    <div style={{ height: '800px', padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week', 'day']}
        min={minTime}
        max={maxTime}
        step={30}
        timeslots={2}
        eventPropGetter={eventStyleGetter}
        onSelectSlot={onSelectSlot}
        selectable={true}
        defaultDate={new Date()}
        dayLayoutAlgorithm="no-overlap"
        scrollToTime={minTime}
        components={{
          timeSlotWrapper: CustomTimeSlot,
        }}
      />
    </div>
  );
};

// Custom time slot to hide hours outside working time
const CustomTimeSlot = ({ value, children }) => {
  const hour = value.getHours();
  if (hour < 9 || hour >= 21) return null;
  
  return (
    <div className="rbc-time-slot">
      {children}
      <span className="rbc-label"></span>
    </div>
  );
};

export default DoctorCalendar;
