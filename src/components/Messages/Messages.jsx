import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./Messages.css";

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || null
  );
  const [newMessage, setNewMessage] = useState("");
  const chatWindowRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const adminId = "78"; // هذا هو الـ admin ID، يمكنك تعديله حسب الحاجة
  const isAdmin = localStorage.getItem("role") === "admin";

  // جلب المستخدمين
  const getUsers = async () => {
    if (isAdmin) {
      try {
        const response = await fetch(
          "http://localhost/backend/fetch_users.php"
        );
        const data = await response.json();
        console.log("Fetched users:", data);

        // تصفية المستخدمين لاستبعاد الـ admin
        const filteredUsers = Array.isArray(data)
          ? data.filter((user) => user.id.toString() !== adminId.toString())
          : [];

        setUsers(filteredUsers);

        // جلب آخر رسالة لكل مستخدم
        filteredUsers.forEach((user) => {
          getLastMessage(user.id);
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  // جلب الرسائل الخاصة بالمستخدم النشط
  const fetchMessages = async (activeUserId) => {
    if (activeUserId) {
      try {
        const receiverId = isAdmin ? activeUserId : adminId; // إذا كنت admin، ستجلب رسائل المستخدم المحدد، وإلا ستكون مع الـ admin

        const response = await fetch(
          `http://localhost/backend/Chat/get_messages.php?user_id=${activeUserId}&receiver_id=${receiverId}`
        );
        const data = await response.json();
        console.log("Fetched messages:", data); // طباعة الرد للتأكد
        if (data.messages) {
          setMessages(data.messages); // تأكد من هيكل البيانات
        } else {
          setMessages([]);
        }
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    }
  };

  // جلب آخر رسالة لمستخدم معين
  const getLastMessage = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost/backend/Chat/get_last_message.php?user_id=${userId}`
      );

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Attempt to parse the response as JSON
      const data = await response.json();
      console.log("Last message data:", data); // Debugging log

      // Check if data contains the message
      if (data && data.message) {
        setLastMessages((prev) => ({
          ...prev,
          [userId]: data.message
        }));
      } else {
        setLastMessages((prev) => ({
          ...prev,
          [userId]: "No messages yet" // Fallback when no message is found
        }));
      }
    } catch (error) {
      // Handle errors, including invalid JSON and network issues
      console.error("Error fetching last message:", error);
      setLastMessages((prev) => ({
        ...prev,
        [userId]: "No messages yet" // Fallback when an error occurs
      }));
    }
  };

  // حذف رسالة
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

  // إرسال رسالة
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      console.error("Message cannot be empty.");
      return;
    }

    const senderId = userId;
    const receiverId = isAdmin ? activeUser?.id : adminId;

    if (!senderId || !receiverId) {
      console.error("Sender or receiver ID is missing.");
      return;
    }

    const newMessageObject = {
      sender_id: senderId,
      receiver_id: receiverId,
      message: newMessage,
      created_at: new Date().toISOString(),
      message_id: Date.now()
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    setNewMessage("");
    scrollToBottom();

    try {
      const response = await fetch(
        "http://localhost/backend/Chat/send_message.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_id: senderId,
            receiver_id: receiverId,
            message: newMessage
          })
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("Message sent successfully.");
        fetchMessages(activeUser?.id);
      } else {
        console.error("Failed to send message:", data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // التمرير إلى أسفل المحادثة
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // التعامل مع اختيار المستخدم
  const handleUserSelection = (user) => {
    setActiveUser(user);
    fetchMessages(user.id);
  };

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
      {isAdmin && (
        <div className="message-list">
          <h3>Conversations</h3>
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className={`message-item ${
                  activeUser?.id === user.id ? "active" : ""
                }`}
                onClick={() => handleUserSelection(user)}
              >
                <div id="ee">
                  <div>
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h4>{user.name}</h4>
                    {/* عرض آخر رسالة */}
                    {/* <p>{lastMessages[user.id] || "No messages yet"}</p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-users">No users available</p>
          )}
        </div>
      )}

      <div className="chat-window">
        {isAdmin && !activeUser ? (
          <div className="no-conversation">
            <p>Please select a user to start the conversation.</p>
          </div>
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
                      className={`message-bubble ${
                        isUserMessage ? "message-right" : "message-left"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <span className="message-time">
                        {moment(msg.created_at).format("MMM D, h:mm A")}
                      </span>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteMessage(msg.message_id)}
                      >
                        Delete
                      </button>
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
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
