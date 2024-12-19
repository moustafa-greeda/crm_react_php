import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./Messages.css";

const messagesData = [
  {
    id: 1,
    name: "Ahmed Gamal",
    message: "Thank you for the clarification.",
    time: "1h",
    isTyping: true
  },
  {
    id: 2,
    name: "Mohammed Ahmed",
    message: "Thank you for the clarification.",
    time: "1h"
  },
  {
    id: 3,
    name: "Abdullah Alaa",
    message: "Thank you for the clarification.",
    time: "1h"
  }
  // Add more mock data as needed
];

const Messages = () => {
  const [activeMessage, setActiveMessage] = useState(messagesData[0]);

  return (
    <div className="messages-container">
      <div className="message-list">
        {messagesData.map((message) => (
          <div
            key={message.id}
            className={`message-item ${activeMessage.id === message.id ? "active" : ""}`}
            onClick={() => setActiveMessage(message)}
          >
            <h4>{message.name}</h4>
            <p>{message.isTyping ? <i>Typing...</i> : message.message}</p>
            <span>{message.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <h4>{activeMessage.name}</h4>
        </div>
        <div className="chat-messages">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
            irure dolor in reprehenderit...
          </p>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
