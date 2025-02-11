export const convertToCalendarEvents = (doctors) => {
  if (!doctors) return [];

  const daysMap = {
      sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
      thursday: 4, friday: 5, saturday: 6
  };

  return doctors.flatMap((doctor) =>
      Object.entries(doctor.availability || {}).map(([day, time]) => {
          if (!daysMap.hasOwnProperty(day)) return null; // Skip invalid days

          const today = new Date();
          const start = new Date(today);
          start.setDate(today.getDate() + ((daysMap[day] - today.getDay() + 7) % 7));
          start.setHours(parseInt(time.start.substring(0, 2)), parseInt(time.start.substring(2)), 0);

          const end = new Date(start);
          end.setHours(parseInt(time.end.substring(0, 2)), parseInt(time.end.substring(2)), 0);

          return {
              id: `${doctor.name}-${day}`,
              title: `${doctor.name} - Available`,
              start,
              end,
              resource: { doctorName: doctor.name, doctorTitle: doctor.title }
          };
      }).filter(event => event !== null) // Remove any invalid events
  );
};
