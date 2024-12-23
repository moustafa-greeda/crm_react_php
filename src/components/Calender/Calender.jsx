import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Calender.css";

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [events, setEvents] = useState([]);

  // جلب الأحداث من قاعدة البيانات
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost/backend/Calender/getEvents.php"
        );
        setEvents(response.data); // تخزين الأحداث المسترجعة
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    setShowModal(true); // فتح المودال
  };

  const handleCloseModal = () => {
    setShowModal(false); // غلق المودال
  };

  const handleCreateEvent = async () => {
    try {
      // إرسال البيانات إلى الـ API لإضافة الحدث
      const response = await axios.post(
        "http://localhost/backend/Calender/addEvent.php",
        {
          event_name: eventName,
          event_date: eventDate,
          start_time: startTime,
          end_time: endTime,
          notes: notes
        }
      );

      alert(response.data.message); // إعلام المستخدم
      setShowModal(false); // غلق المودال بعد الإضافة

      // تحديث قائمة الأحداث
      const newEvents = await axios.get(
        "http://localhost/backend/Calender/getEvents.php"
      );
      setEvents(newEvents.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="container">
      <main className="calendar">
        <header>
          <h1>Dec 2024</h1>
          <button className="btn btn-success" onClick={handleAddEvent}>
            + Add Event
          </button>
        </header>

        <section className="calendar-grid">
          {/* عرض الأيام في التقويم */}
          {Array.from({ length: 31 }).map((_, idx) => {
            const day = idx + 1;

            // العثور على الأحداث المناسبة لهذا اليوم
            const dayEvents = events.filter((event) => {
              const eventDate = new Date(event.event_date);
              return eventDate.getDate() === day;
            });

            return (
              <div key={idx} className="day">
                <div className="day-number">{day}</div>
                {dayEvents.length > 0 && (
                  <div className="events">
                    {dayEvents.map((event, index) => (
                      <div key={index} className="event">
                        <div className="event-name">{event.event_name}</div>
                        <div className="event-details">
                          <span className="start-time">{event.start_time}</span>
                          <span className="end-time">{event.end_time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      {/* المودال لإضافة حدث */}
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create New Event
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="event-name" className="form-label">
                    Event Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="event-name"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="event-date" className="form-label">
                    Event Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="event-date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div className="mb-3 input-group">
                  <label htmlFor="start-time" className="form-label">
                    Start Time:
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    id="start-time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="mb-3 input-group">
                  <label htmlFor="end-time" className="form-label">
                    End Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="end-time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes:
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateEvent}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;