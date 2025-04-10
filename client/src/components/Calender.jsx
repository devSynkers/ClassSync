import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
    getDay,
    locales,
});

const initialEvents = [
    // Monday
    { title: "CA3026-ADS", start: new Date(2024, 3, 8, 8, 30), end: new Date(2024, 3, 8, 9, 20) },
    { title: "CA3202-WEB", start: new Date(2024, 3, 8, 10, 30), end: new Date(2024, 3, 8, 11, 20) },
    { title: "CA3203-IOT", start: new Date(2024, 3, 8, 13, 10), end: new Date(2024, 3, 8, 14, 0) },

    // Tuesday
    { title: "CA3020-ST", start: new Date(2024, 3, 9, 8, 30), end: new Date(2024, 3, 9, 9, 20) },
    { title: "CA3201-PYTHON", start: new Date(2024, 3, 9, 10, 30), end: new Date(2024, 3, 9, 11, 20) },
    { title: "CA3026-ADS", start: new Date(2024, 3, 9, 11, 25), end: new Date(2024, 3, 9, 12, 15) },
    { title: "RM3151", start: new Date(2024, 3, 9, 13, 10), end: new Date(2024, 3, 9, 14, 0) },

    // Wednesday
    { title: "CA3202-WEB", start: new Date(2024, 3, 10, 9, 25), end: new Date(2024, 3, 10, 10, 15) },
    { title: "CA3203-IOT Lab", start: new Date(2024, 3, 10, 10, 30), end: new Date(2024, 3, 10, 12, 15) },
    { title: "RM3151", start: new Date(2024, 3, 10, 13, 10), end: new Date(2024, 3, 10, 14, 0) },

    // Thursday
    { title: "CA3203-IOT", start: new Date(2024, 3, 11, 8, 30), end: new Date(2024, 3, 11, 9, 20) },
    { title: "CA3201-PYTHON", start: new Date(2024, 3, 11, 10, 30), end: new Date(2024, 3, 11, 11, 20) },
    { title: "CA3204-DSA", start: new Date(2024, 3, 11, 13, 10), end: new Date(2024, 3, 11, 14, 0) },
    { title: "CA3202-WEB Lab", start: new Date(2024, 3, 11, 15, 55), end: new Date(2024, 3, 11, 16, 45) },

    // Friday
    { title: "CA3204-DSA", start: new Date(2024, 3, 12, 8, 30), end: new Date(2024, 3, 12, 9, 20) },
    { title: "CA3020-ST", start: new Date(2024, 3, 12, 9, 25), end: new Date(2024, 3, 12, 10, 15) },
    { title: "CA3211-MAD LAB", start: new Date(2024, 3, 12, 13, 10), end: new Date(2024, 3, 12, 14, 0) },
];

const CalendarComponent = () => {
    const [events] = useState(initialEvents);

    const eventStyleGetter = (event) => {
        let bgColor = "#6c63ff";
        if (event.title.includes("PYTHON")) bgColor = "#00BFFF";
        else if (event.title.includes("WEB")) bgColor = "#32CD32";
        else if (event.title.includes("DSA")) bgColor = "#FF69B4";
        else if (event.title.includes("ADS")) bgColor = "#FFA500";
        return {
            style: {
                backgroundColor: bgColor,
                color: "black",
                borderRadius: "8px",
                border: "none",
                padding: "4px",
            },
        };
    };

    return (
        <div style={{ height: "100vh", padding: "20px" }}>
            <h2 className="text-xl font-bold mb-4">📅 University Timetable</h2>
            <Calendar
                localizer={localizer}
                events={events}
                defaultView="week"
                views={["week"]}
                defaultDate={new Date(2024, 3, 8)} // 👈 Shows April 8 week
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                style={{ height: 600 }}
            />
        </div>
    );
};

export default CalendarComponent;
