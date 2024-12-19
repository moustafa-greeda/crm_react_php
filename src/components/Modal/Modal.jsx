import React, { useState } from "react";
import "./Modal.css";
const Modal = ({ onClose, onAddEvent }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventColor, setEventColor] = useState("#ffffff");

  const handleSubmit = () => {
    if (eventName && eventDate) {
      onAddEvent({ name: eventName, date: parseInt(eventDate), color: eventColor });
      setEventName("");
      setEventDate("");
      setEventColor("#ffffff");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Date (1-30)"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="color"
          value={eventColor}
          onChange={(e) => setEventColor(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
