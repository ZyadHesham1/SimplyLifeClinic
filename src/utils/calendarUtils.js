export const convertToCalendarEvents = (doctors) => {
    if (!doctors) return [];

    const daysMap = {
        sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
        thursday: 4, friday: 5, saturday: 6
    };

    const events = [];

    doctors.forEach((doctor) => {
        Object.entries(doctor.availability || {}).forEach(([day, time]) => {
            if (!daysMap.hasOwnProperty(day)) return;

            const today = new Date();
            const currentWeekday = today.getDay(); // 0 (Sunday) to 6 (Saturday)
            const dayOffset = (daysMap[day] - currentWeekday + 7) % 7; // Offset to next occurrence of the day
            const baseDate = new Date();
            baseDate.setDate(today.getDate() + dayOffset);

            for (let i = 0; i < 10; i++) { // Generate for the next 10 weeks
                const eventDate = new Date(baseDate);
                eventDate.setDate(baseDate.getDate() + i * 7); // Add 7 days each iteration

                const start = new Date(eventDate);
                start.setHours(parseInt(time.start.substring(0, 2)), parseInt(time.start.substring(2)), 0);

                const end = new Date(start);
                end.setHours(parseInt(time.end.substring(0, 2)), parseInt(time.end.substring(2)), 0);

                events.push({
                    id: `${doctor.name}-${day}-${i}`,
                    title: `${doctor.name} - Available`,
                    start,
                    end,
                    resource: { doctorName: doctor.name, doctorTitle: doctor.title }
                });
            }
        });
    });

    return events;
};
