import React from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../utils/localizer';

const CalendarView = ({ tasks }) => {
    // Convert tasks to calendar events

    const events = tasks
        .filter(task => task.scheduledDate)
        .map(task => ({
            id: task.id,
            title: task.task,
            start: new Date(task.scheduledDate),
            end: new Date(task.scheduledDate),
            allDay: true,
            resource: task,
        }));

    return (
        <div style={{ height: '80vh', width: '100%', padding: '1rem' }}>
            <Calendar
                localizer={localizer}
                events={events}
                defaultView="month"
                views={['month', 'week', 'day']}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '1200px'}}
                eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: '#0288d1',
                      borderRadius: '6px',
                      color: '#fff',
                      border: 'none',
                      padding: '4px',
                    }
                  })}
            />
        </div>
    );
};

export default CalendarView;