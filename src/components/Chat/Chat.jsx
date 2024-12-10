import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchMessages = async (userId) => {
    const response = await fetch(
      `http://localhost/backend/Chat/get_messages.php?user_id=${userId}`
    );
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!input || !selectedUser) return;
    const response = await fetch(
      "http://localhost/backend/Chat/send_message.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId: selectedUser })
      }
    );
    const data = await response.json();
    if (data.success) {
      setMessages([...messages, { message: input, user: "me" }]);
      setInput("");
    }
  };
  useEffect(() => {
    const chatBox = document.querySelector(".overflow-auto");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar */}
      <div className="col-3 bg-light p-3 border-end">
        <h5 className="text-center">Contacts</h5>
        <ul className="list-group">
          <li
            className="list-group-item list-group-item-action"
            onClick={() => {
              setSelectedUser(1);
              fetchMessages(1);
            }}
          >
            User 1
          </li>
          <li
            className="list-group-item list-group-item-action"
            onClick={() => {
              setSelectedUser(2);
              fetchMessages(2);
            }}
          >
            User 2
          </li>
        </ul>
      </div>

      {/* Chat Box */}
      <div className="col-9 d-flex flex-column">
        {/* Messages */}
        <div className="flex-grow-1 overflow-auto p-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${
                msg.user === "me"
                  ? "justify-content-end"
                  : "justify-content-start"
              } mb-2`}
            >
              <div
                className={`p-2 rounded ${
                  msg.user === "me"
                    ? "bg-primary text-white"
                    : "bg-light border"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="border-top p-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
