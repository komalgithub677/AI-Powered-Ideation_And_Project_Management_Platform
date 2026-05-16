// src/components/Calendar.jsx
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Date-fns setup
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function Calendar() {
  const [events, setEvents] = useState([
    {
      title: "Project Meeting",
      start: new Date(2025, 8, 27, 10, 0), // Sept 27, 2025 at 10:00
      end: new Date(2025, 8, 27, 11, 0),
    },
    {
      title: "Deadline: UI Design",
      start: new Date(2025, 8, 29, 17, 0),
      end: new Date(2025, 8, 29, 18, 0),
    },
  ]);

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields");
      return;
    }
    setEvents([
      ...events,
      {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      },
    ]);
    setNewEvent({ title: "", start: "", end: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-[700px] flex flex-col">
      <h2 className="text-2xl font-bold mb-4">📅 Calendar</h2>

      {/* Add Event Form */}
      <form
        onSubmit={handleAddEvent}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          className="border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>

      {/* Calendar */}
      <div className="flex-1">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          popup
        />
      </div>
    </div>
  );
}
