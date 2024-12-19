import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    // onlineUsers: [],
    onlineUsers: ["1", "2"], // Simulated online users with user IDs


    checkAuth: async () => {
        try {
            console.log("Using mock auth data...");
            set({ authUser: { _id: "123", name: "Mock User" } }); // Mock user

            // const res = await axiosInstance.get("http://localhost:5001/api/auth/check")
            // set({ authUser: res.data })
        }

        catch (error) {
            console.log("error in checkAuth" ,error)
            set({ authUser: null })
        } 
        
        finally{
            set({ isCheckingAuth: false })
        }
    }
})) 