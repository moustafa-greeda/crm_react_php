// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast"


// export const useChatStore = create((set) => ({
//     messages: [],
//     users: [],
//     selectedUser: null,
//     isUsersLoading: false,
//     isMessagesLoading: false,

//     getUsers: async () => {
//         set({ isUsersLoading: true })
//         try {
//             const res = await axiosInstance.get("/messages/users")
//             set({ users: res.data })
//         }

//         catch (error) {
//             console.log("error in getUsers", error)
//             toast.error(error.response.data.message)
//         }

//         finally {
//             set({ isUsersLoading: false })
//         }
//     },

//     getMessages: async (userId) => {
//         set({ isMessagesLoading: true })
//         try {
//             const res = await axiosInstance.get(`/messages/${userId}`)
//             set({ messages: res.data })

//         } catch (error) {
//             toast.error(error.response.data.message)

//         } finally {
//             set({ isMessagesLoading: false })

//         }
//     },

//     //optimize this later
//     setSelectedUser: (selectedUser) => set ({ selectedUser})
// })) 


import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
// import mockUsers from "../components/Messages/mockUsers";// Import mock data

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            // Simulated mock user data
            const mockUsers = [
                { _id: "1", fullName: "John Doe", profilePic: "/avatar.png" },
                { _id: "2", fullName: "Jane Smith", profilePic: "/avatar.png" },
                { _id: "3", fullName: "Mike Johnson", profilePic: "/avatar.png" },
            ];
            set({ users: mockUsers });
        } catch (error) {
            console.log("Error in getUsers", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            // const res = await axiosInstance.get(`/messages/${userId}`)
            // set({ messages: res.data })
            const mockMessages = [
                { id: 1, text: "Hello there!", sender: "John Doe" , senderId: "1", createdAt: new Date()},
                { id: 2, text: "How can I help you?", sender: "Jane Smith" ,  senderId: "123", createdAt: new Date() },
            ];
            set({ messages: mockMessages });

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isMessagesLoading: false })

        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get()

        try {
            // const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            // Simulate adding a message
            const newMessage = {
                id: messages.length + 1,
                text: messageData.text,
                sender: "You", // Assuming you're sending the message
            };

            set({ messages: [...messages, newMessage] });
            // set({ message: [...messages, res.data] })
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
