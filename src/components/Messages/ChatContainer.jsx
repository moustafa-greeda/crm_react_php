import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Show a placeholder if no user is selected
  if (!selectedUser) {
    return (
      <div className="tw-flex-1 tw-flex tw-justify-center tw-items-center tw-text-gray-500">
        Select a user to start chatting.
      </div>
    );
  }

  // Show a loading state
  if (isMessagesLoading) {
    return (
      <div className="tw-flex-1 tw-flex tw-flex-col tw-overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className=" tw-flex-1 tw-flex tw-flex-col tw-overflow-auto">
      <ChatHeader />

      {/* Messages */}
      <div className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-4">
        {messages.map((message) => (
          <div
            key={message.id || message._id}
            className={`tw-chat ${message.senderId === authUser?._id ? "tw-chat-end" : "tw-chat-start"
              }`}
          >
            {/* Profile Picture */}
            <div className="tw-chat-image tw-avatar">
              <div className='tw-size-10 tw-rounded-full tw-border'>
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile"
                />
              </div>
            </div>

            {/* Message Header (Time) */}
            <div className="tw-chat-header tw-mb-1">
              <time className="tw-text-xs tw-opacity-50 tw-ml-1 tw-text-black">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* Message Bubble */}
            <div
              className={`tw-chat-bubble tw-flex ${message.senderId === authUser._id
                  ? "tw-bg-green-500 tw-text-white"
                  : "tw-bg-gray-300 tw-text-black"
                }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
