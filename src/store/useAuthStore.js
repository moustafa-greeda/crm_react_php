import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: { _id: "123", fullName: "Mock User", profilePic: "/avatar.png" }, // Mock user with proper fields
    onlineUsers: [], 
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            console.log("Using mock auth data...");
            set({ authUser: { _id: "123", fullName: "Mock User", profilePic: "/avatar.png" } });
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));
