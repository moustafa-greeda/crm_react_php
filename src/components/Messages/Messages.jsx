import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import SidebarMessages from './SidebarMessages';
import ChatContainer from './ChatContainer';
import NoChatSelected from './NoChatSelected';

const Messages = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='tw-h-screen'>
      <div className="tw-flex tw-items-center tw-justify-center tw-pt-5 tw-px-4">
        <div className='tw-bg-base-100 tw-rounded-lg tw-shadow-xl tw-w-full tw-max-w-6xl tw-h-[calc(100vh-8rem)]'>
          <div className='tw-flex tw-h-full tw-rounded-lg tw-overflow-hidden'>

            <SidebarMessages />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}

          </div>
        </div>
      </div>

    </div>
  )
}

export default Messages;
