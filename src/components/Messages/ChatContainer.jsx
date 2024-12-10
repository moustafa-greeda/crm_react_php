import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useChatStore } from '../../store/useChatStore'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../../store/useAuthStore'
import { formatMessageTime } from '../../lib/utils'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()
  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  // what will appear when its loading
  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto '>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `}>
            
            {/* chat pic */}
            <div className=' chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === authUser._id
                  ? authUser.profilePic || "/avatar.png"
                  : selectedUser.profilePic || "/avatar.png"
                } />
              </div>
            </div>
            
            {/* time */}
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1 text-black'>{formatMessageTime(message.createdAt)}</time>
            </div>

            {/* chat bubble */}
            <div   className={`chat-bubble flex ${message.senderId === authUser._id ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}>
              {message.text && <p>{message.text}</p>}
            </div>

          </div>
        ))}
      </div>
      <MessageInput />
    </div>

  )

}

export default ChatContainer