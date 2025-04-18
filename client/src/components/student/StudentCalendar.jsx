import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; // BigCalendar prefers moment, not date-fns import axios from 'axios'; import 'react-big-calendar/lib/css/react-big-calendar.css';
// import useFetch from "../../hooks/studentHooks/useFetch.js";
import axios from "axios";
const localizer = momentLocalizer(moment);

const formatStatusColor = (status) => {
    switch (status) {
        case 'swapped': return '#f59e0b';
        case 'exam': return '#dc2626';
        case 'original': return '#16a34a';
        default: return '#6b7280';
    }
};

    const StudentCalendar = () => {
        const [events, setEvents] = useState([]);
        const [loading, setLoading] = useState(true);

        const fetchCalendar = async () => {
            setLoading(true);
            const start = moment().startOf('week').format('YYYY-MM-DD');
            const end = moment().endOf('week').format('YYYY-MM-DD');

            try {
                const res = await axios.get(`http://localhost:3000/student/calendar/dynamic`, {
                    params: { startDate: start, endDate: end },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("Data",res.data);

                const formattedEvents = res.data.map((event) => {
                    const startTime = moment(`${event.date} 09:00`).add((event.period_no - 1) * 1, 'hours');
                    return {
                        title: `${event.course_name} (${event.faculty_name})${event.note ? '\nNote: ' + event.note : ''}`,
                        start: startTime.toDate(),
                        end: startTime.add(1, 'hours').toDate(),
                        allDay: false,
                        resource: { status: event.status, note: event.note }
                    };
                });

                setEvents(formattedEvents);
            } catch (err) {
                console.error('Error fetching calendar:', err);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchCalendar();
            }, []);

        const EventComponent = ({ event }) => {
            return (
                <div style={{ backgroundColor: formatStatusColor(event.resource.status), color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'pre-line' }} >
                    {event.title}
                </div> );
        };

        return (
            <div className="p-4 md:p-8">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">📅 Calendar</h1>
                {loading ?
                    ( <div className="text-center text-gray-500">Loading calendar...</div> ) :
                    ( <Calendar
                        localizer={localizer}
                        events={events}
                        defaultView="week"
                        views={['week', 'day','month']}
                        step={60}
                        timeslots={1}
                        min={new Date(0, 0, 0, 7, 0)}
                        max={new Date(0, 0, 0, 19, 0)}
                        components={{ event: EventComponent }}
                        style={{ height: '80vh', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }} />
                    )}
            </div>
        );
    };

export default StudentCalendar;