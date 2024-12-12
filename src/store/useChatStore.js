import { create } from "zustand";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [], // Messages array
  users: [], // Fake users list
  selectedUser: null,
  isMessagesLoading: false,
  isUsersLoading: false,

  // Get mock users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const mockUsers = [
        { _id: "1", fullName: "John Doe", profilePic: "/avatar.png" },
        { _id: "2", fullName: "Jane Smith", profilePic: "/avatar.png" },
        { _id: "3", fullName: "Mike Johnson", profilePic: "/avatar.png" },
      ];
      set({ users: mockUsers });
    } catch (error) {
      console.log("Error fetching users", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Get mock messages for a selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const mockMessages = [
        { _id: "m1", text: "Hello!", senderId: "123", createdAt: new Date() },
        { _id: "m2", text: "Hi, how are you?", senderId: userId, createdAt: new Date() },
        { _id: "m3", text: "I'm doing great, thanks!", senderId: "123", createdAt: new Date() },
      ];
      set({ messages: mockMessages });
    } catch (error) {
      console.log("Error fetching messages", error);
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
        // Uncomment and replace with your actual backend API call
        // const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

        // Simulate adding a message
        const newMessage = {
            id: Date.now(), // Using Date.now() to generate a unique ID
            text: messageData.text,
            sender: "You", // Assuming you're sending the message
            senderId: messageData.senderId, // Include senderId
            receiverId: selectedUser._id, // Include receiverId (the selected user)
            createdAt: new Date(), // Add timestamp
        };

        // Add the new message to the state
        set({ messages: [...messages, newMessage] });

        // Optionally, you can replace the above with the actual response data:
        // set({ messages: [...messages, res.data] });
    } catch (error) {
        // Handle errors (e.g., display a toast message)
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
},

  // Set selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
