import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../calendarOverrides.css';

const localizer = momentLocalizer(moment);

const StudentCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState(Views.WEEK);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const fetchCalendar = async (date = new Date()) => {
        setLoading(true);

        let start, end;
        if (view === Views.WEEK || view === Views.DAY) {
            start = moment(date).startOf('week').format('YYYY-MM-DD');
            end = moment(date).endOf('week').format('YYYY-MM-DD');
        } else {
            start = moment(date).startOf('month').startOf('week').format('YYYY-MM-DD');
            end = moment(date).endOf('month').endOf('week').format('YYYY-MM-DD');
        }

        try {
            const res = await axios.get(`http://localhost:3000/student/calendar/dynamic`, {
                params: { startDate: start, endDate: end },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const formattedEvents = res.data.map((event) => {
                const startTime = moment(`${event.date} 09:00`).add(event.period_no - 1, 'hours');
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
            setIsInitialLoad(false);
        }
    };

    useEffect(() => {
        fetchCalendar(currentDate);
    }, [currentDate, view]);

    const handleNavigate = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = '#60a5fa';
        let color = 'white';

        if (event.resource?.status === 'original') {
            backgroundColor = '#bfdbfe';
            color = 'black';
        } else if (event.resource?.status === 'exam') {
            backgroundColor = '#dc2626';
            color = 'white';
        } else if (event.resource?.status === 'swapped') {
            backgroundColor = '#60a5fa';
            color = 'white';
        }

        return {
            style: {
                backgroundColor,
                color,
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 500,
                whiteSpace: 'pre-line',
                textAlign: 'left'
            }
        };
    };

    const slotPropGetter = () => {
        if (view === Views.WEEK) {
            return {
                style: {
                    minHeight: '100px'
                }
            };
        }
        return {};
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">📅 My Calendar</h1>

            {loading && isInitialLoad ? (
                <div className="text-center text-gray-500">Loading calendar...</div>
            ) : (
                <Calendar
                    localizer={localizer}
                    events={events}
                    defaultView={Views.WEEK}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    step={60}
                    timeslots={1}
                    min={new Date(0, 0, 0, 7, 0)}
                    max={new Date(0, 0, 0, 19, 0)}
                    onNavigate={handleNavigate}
                    date={currentDate}
                    onView={handleViewChange}
                    view={view}
                    eventPropGetter={eventStyleGetter}
                    slotPropGetter={slotPropGetter}
                    style={{
                        height: '80vh',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',
                        padding: '8px'
                    }}
                />
            )}
        </div>
    );
};

export default StudentCalendar;
