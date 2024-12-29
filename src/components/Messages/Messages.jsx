import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import NoChatSelected from "./NoChatSelected";
import "./Messages.css";
import "font-awesome/css/font-awesome.min.css";
import { Users } from "lucide-react";

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || null
  );
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null); // State to manage the selected file
  const chatWindowRef = useRef(null);

  const userId = localStorage.getItem("userId");
  const adminId = "78";
  const isAdmin = localStorage.getItem("role") === "admin";

  // Fetch users (Admin only)
  const getUsers = async () => {
    if (isAdmin) {
      try {
        const response = await fetch(
          "http://localhost/backend/fetch_users.php"
        );
        const data = await response.json();
        const filterUser = data.filter((user) => user.id !== adminId);
        setUsers(filterUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  // Fetch messages for the active user
  const fetchMessages = async (activeUserId) => {
    if (activeUserId) {
      try {
        const response = await fetch(
          `http://localhost/backend/Chat/get_messages.php?user_id=${activeUserId}`
        );
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  // Delete a message
  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `http://localhost/backend/Chat/delete_message.php?message_id=${messageId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (data.success) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.message_id === messageId ? { ...msg, is_deleted: true } : msg
          )
        );
      } else {
        console.error("Failed to delete message:", data.message);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !file) return;

    const receiverId = isAdmin ? activeUser?.id : adminId;

    if (receiverId === userId) {
      console.error("Sender and receiver cannot be the same.");
      return;
    }

    const newMessageObject = {
      sender_id: userId,
      receiver_id: receiverId,
      message: newMessage,
      created_at: new Date().toISOString(),
      message_id: Date.now(),
      is_deleted: false,
      file: file ? file.name : null // Include file name in the message object
    };

    // Update UI immediately for better user experience
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    setNewMessage("");
    setFile(null); // Reset the file input
    scrollToBottom();

    // Create FormData to send file and message
    const formData = new FormData();
    formData.append("sender_id", userId);
    formData.append("receiver_id", receiverId);
    formData.append("message", newMessage);
    if (file) formData.append("file", file);

    // Send to the backend
    try {
      const response = await fetch(
        "http://localhost/backend/Chat/send_message.php",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        fetchMessages(activeUser.id);
      } else {
        console.error("Failed to send message:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // Handle user selection (Admin only)
  const handleUserSelection = (user) => {
    setActiveUser(user);
    localStorage.setItem("activeUser", JSON.stringify(user));
    fetchMessages(user.id);
  };

  // Clear active user
  const clearActiveUser = () => {
    setActiveUser(null);
    localStorage.removeItem("activeUser");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Initial setup
  useEffect(() => {
    scrollToBottom();
    getUsers();
    fetchMessages(userId);

    if (!userId) {
      console.error("User not logged in");
      return;
    }

    // Only fetch messages for activeUser if they are not the admin (ID: 78)
    if (activeUser && activeUser.id !== adminId) {
      fetchMessages(activeUser.id);
    }
  }, [userId, activeUser]);

  // Check if there's no active user or chat selected
  const isNoChatSelected =
    !activeUser || !activeUser.id || activeUser.id === adminId;

  return (
    <div className="messages-container">
      {isAdmin && (
        <div className="message-list">
          <div className="tw-flex tw-items-center tw-gap-2 mb-3">
            <Users className='tw-size-6' />
            <h3 className="tw-font-semibold">Conversations</h3>
          </div>
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className={`message-item ${
                  activeUser?.id === user.id ? "active" : ""
                }`}
                onClick={() => handleUserSelection(user)}
              >
                <i className="fa fa-user-circle user-avatar"></i>

                <div className="">
                  <h4>{user.name}</h4>
                  <p>User ID: {user.id}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-users">No users available</p>
          )}
        </div>
      )}

      <div className="chat-window">
        {isNoChatSelected ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="chat-header">
              <h4>
                Chat with {activeUser.name} (ID: {activeUser.id})
              </h4>
              <span>Today, {moment().format("MMM D")}</span>
            </div>
            <div className="chat-messages" ref={chatWindowRef}>
              {messages.length > 0 ? (
                messages.map((msg) => {
                  const isUserMessage =
                    msg.sender_id.toString() === userId.toString();
                 
                    return (
                    
                    <div
                      key={msg.message_id}
                      className={`message-bubble ${
                        isUserMessage ? "message-right" : "message-left"
                      } ${msg.is_deleted ? "message-deleted" : ""}`}
                    >
                      <p>{msg.is_deleted ? "message deleted" : msg.message}</p>
                      {msg.file && (
                        <a
                          href={`http://localhost/uploads/${msg.file}`}
                          target="_blank"
                        >
                          Download Attachment
                        </a>
                      )}
                      <span className="message-time">
                        {moment(msg.created_at).format("MMM D, h:mm A")}
                      </span>
                      {!msg.is_deleted && isUserMessage && (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteMessage(msg.message_id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      )}
                    </div>

                  );
                })
              ) : (
                <p>No messages yet</p>
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              {/* <input type="file" onChange={handleFileChange} /> */}
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;