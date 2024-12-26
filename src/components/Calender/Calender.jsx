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
  const [users, setUsers] = useState([]); // To store users
  const [selectedUser, setSelectedUser] = useState(""); // To store selected user
  const [userRole, setUserRole] = useState(""); // User role (admin/user)
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  // Fetch users from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role"); // Get role from localStorage

        // Fetch events based on the user role
        const response = await axios.get(
          `http://localhost/backend/Calender/getEvents.php?user_id=${userId}&role=${role}`
        );

        if (Array.isArray(response.data)) {
          setEvents(response.data); // Store events
        } else {
          console.error("Expected an array but got:", response.data);
          setEvents([]); // Ensure events is always an array
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role"); // Get role from localStorage
      const response = await axios.post(
        "http://localhost/backend/Calender/addEvent.php",
        {
          user_id: selectedUser, // Send the selected user ID
          event_name: eventName,
          event_date: eventDate,
          start_time: startTime,
          end_time: endTime,
          notes: notes
        }
      );

      alert(response.data.message);
      setShowModal(false);

      // Fetch updated events after creating a new one
      const newEvents = await axios.get(
        `http://localhost/backend/Calender/getEvents.php?user_id=${userId}&role=${role}`
      );
      setEvents(newEvents.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="container">
      <main className="calendar">
        <header>
          <h1>{`${monthName} ${year}`}</h1>
          <button className="btn btn-light" onClick={handlePrevMonth}>
            &lt; Prev
          </button>
          <button className="btn btn-light" onClick={handleNextMonth}>
            Next &gt;
          </button>
          {userRole === "admin" && (
            <button
              className="btn btn-success"
              onClick={() => setShowModal(true)}
            >
              + Add Event
            </button>
          )}
        </header>

        <section className="calendar-grid">
          {Array.from({ length: 31 }).map((_, idx) => {
            const day = idx + 1;
            const dayEvents = events.filter((event) => {
              const eventDate = new Date(event.event_date);
              return (
                eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth()
              );
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
                  onClick={() => setShowModal(false)}
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
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    Select User:
                  </label>
                  <select
                    className="form-control"
                    id="user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Select a User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} {/* Corrected this line */}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
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
