import React, { useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { Send } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

// const MessageInput = () => {
//     const [text, setText] = useState("")
//     const { sendMessages } = useChatStore();

//     // const handleSendMessage = async (e) => {
//     //     e.preventDefault();
//     //     if (!text.trim()) return;

//     //     try {
//     //         await sendMessages({
//     //             text: text.trim()
//     //         });

//     //         //clear form
//     //         setText("");
//     //     } catch (error) {
//     //         console.error("failed to send message", error);
//     //     }
//     // }
//     const handleSendMessage = () => {
//         if (messageText.trim()) {
//             sendMessages({
//                 text: messageText,
//                 senderId: authUser._id // Assuming this identifies the user sending the message
//             });
    
//             setMessageText(""); // Clear input after sending
//         }
//     };

//     return (
//         <form onSubmit={handleSendMessage} className='tw-flex tw-items-center tw-gap-2 tw-p-3'>
//             <div className='tw-flex-1 tw-flex tw-gap-2'>
//                 <input type="text"
//                     className="tw-w-full tw-input tw-input-bordered tw-rounded-lg tw-input-sm sm:tw-input-md"
//                     placeholder='Type a message....'
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />
//             </div>
//             <button
//                 type="submit"
//                 className="tw-btn tw-btn-sm tw-btn-success tw-btn-circle"
//                 disabled={!text.trim()}
//             >
//                 <Send size={20} />
//             </button>
//         </form>
//     )
// }

const MessageInput = () => {
    const [messageText, setMessageText] = useState(""); // Using messageText and setMessageText
    const { sendMessages } = useChatStore();
    const { authUser } = useAuthStore();

    const handleSendMessage = () => {
        if (messageText.trim()) {
            sendMessages({
                text: messageText,           // Sending the message text
                senderId: authUser._id       // Assuming this identifies the user sending the message
            });

            setMessageText(""); // Clear input after sending
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="tw-flex tw-items-center tw-gap-2 tw-p-3">
            <div className="tw-flex-1 tw-flex tw-gap-2">
                <input
                    type="text"
                    className="tw-w-full tw-input tw-input-bordered tw-rounded-lg tw-input-sm sm:tw-input-md"
                    placeholder="Type a message...."
                    value={messageText} // Use messageText here
                    onChange={(e) => setMessageText(e.target.value)}  // Update state as user types
                />
            </div>
            <button
                type="submit"
                className="tw-btn tw-btn-sm tw-btn-success tw-btn-circle"
                disabled={!messageText.trim()}  // Disable button if input is empty
            >
                <Send size={20} />
            </button>
        </form>
    );
};

export default MessageInput;
