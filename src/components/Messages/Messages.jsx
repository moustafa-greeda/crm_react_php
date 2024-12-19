import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./Messages.css";
import NoChatSelected from "./NoChatSelected"
import { Send, Users } from "lucide-react";

const Messages = () => {
  const [users, setUsers] = useState([]); // User list
  const [messages, setMessages] = useState([]); // Messages
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || null
  ); // Active user
  const [newMessage, setNewMessage] = useState("");
  const chatWindowRef = useRef(null); // Ref for the chat window

  const userId = localStorage.getItem("userId"); // Logged-in user ID
  const adminId = "78"; // Admin ID
  const isAdmin = localStorage.getItem("isAdmin") === "admin"; // Check if admin

  // Fetch users (only for admin)
  const getUsers = async () => {
    if (isAdmin) {
      try {
        const response = await fetch(
          "http://localhost/backend/fetch_users.php"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  // Fetch messages for active user
  const fetchMessages = async (activeUserId) => {
    if (activeUserId) {
      try {
        const response = await fetch(
          `http://localhost/backend/Chat/get_messages.php?user_id=${activeUserId}`
        );
        const data = await response.json();
        setMessages(data); // Ensure messages are loaded in the original order (from top to bottom)
        scrollToBottom(); // Scroll to the bottom when fetching messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };
  // Handle message deletion
  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `http://localhost/backend/Chat/delete_message.php?message_id=${messageId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (data.success) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.message_id !== messageId)
        );
        console.log("Message deleted successfully.");
      } else {
        console.error("Failed to delete message:", data.message);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

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
      message_id: Date.now()
    };

    // Optimistically update the UI
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    setNewMessage(""); // Clear input field
    scrollToBottom(); // Scroll to the bottom after sending a message

    try {
      const response = await fetch(
        "http://localhost/backend/Chat/send_message.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_id: userId,
            receiver_id: receiverId,
            message: newMessage
          })
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        fetchMessages(activeUser.id); // Refresh messages from the backend
      } else {
        console.error("Failed to send message:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to the bottom of the chat window
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // Handle user selection for admin
  const handleUserSelection = (user) => {
    setActiveUser(user);
    fetchMessages(user.id);
  };

  // Load users and messages when the component is mounted or updated
  useEffect(() => {
    getUsers();
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    if (activeUser) {
      fetchMessages(activeUser.id);
    }
  }, [userId, activeUser]);

  return (
    <div className="messages-container">
      {/* Admin can see the list of users */}
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
                className={`message-item ${activeUser?.id === user.id ? "active" : ""}`}
                onClick={() => handleUserSelection(user)}
              >
                <div className="d-flex justify-content-center align-items-center tw-gap-2">
                  <img
                    src={"/avatar.png"}
                    alt={user.name}
                    className="tw-size-12 tw-object-cover tw-rounded-full"
                  />
                  <div>
                    <h4>{user.name}</h4>
                    <p>User ID: {user.id}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-users">No users available</p>
          )}
        </div>
      )}

      {/* Chat window */}
      <div className="chat-window">
        {isAdmin && !activeUser ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="chat-header">
              <h4>
                {isAdmin && activeUser
                  ? `Chat with ${activeUser.name} (ID: ${activeUser.id})`
                  : "Admin"}
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
                      className={`message-bubble ${isUserMessage ? "message-right" : "message-left"}`}
                    >
                      <p>{msg.message}</p>
                      <div className="message-details d-flex justify-content-between">
                        <time className="message-time pe-3">
                          {moment(msg.created_at).format("MMM D, h:mm A")}
                        </time>
                        <button
                          className="delete-button tw-text-red-400"
                          onClick={() => handleDeleteMessage(msg.message_id)}>
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
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
              <button onClick={handleSendMessage} className="tw-btn">Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
