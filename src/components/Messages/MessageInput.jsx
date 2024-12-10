import React, { useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { Send } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState("")
    const { sendMessages } = useChatStore();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await sendMessages({
                text: text.trim()
            });

            //clear form
            setText("");
        } catch (error) {
            console.error("failed to send message",error);
        }
    }

    return (
        <form onSubmit={handleSendMessage} className='flex items-center gap-2 p-3'>
            <div className='flex-1 flex gap-2'>
                <input type="text"
                    className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                    placeholder='Type a message....'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

            </div>
            <button
                type="submit"
                className="btn btn-sm btn-success btn-circle"
                disabled={!text.trim()}
            >
                <Send size={20} />
            </button>
        </form>
    )
}

export default MessageInput 