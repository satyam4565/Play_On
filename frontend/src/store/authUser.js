import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Flag to prevent multiple concurrent auth checks
let isPerformingAuthCheck = false;

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
	authCheckFailed: false,
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			console.log("Signup attempt with:", credentials.email);
			const response = await axios.post("http://localhost:8000/api/v1/auth/signup", credentials);
			console.log("Signup successful:", response.data);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			console.error("Signup failed:", error);
			toast.error(error.response?.data?.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			console.log("Login attempt with:", credentials.email);
			const response = await axios.post("http://localhost:8000/api/v1/auth/login", credentials);
			console.log("Login successful:", response.data);
			set({ user: response.data.user, isLoggingIn: false });
			toast.success("Logged in successfully");
		} catch (error) {
			console.error("Login failed:", error);
			set({ isLoggingIn: false, user: null });
			toast.error(error.response?.data?.message || "Login failed");
		}
	},
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			console.log("Logout attempt");
			await axios.post("http://localhost:8000/api/v1/auth/logout");
			console.log("Logout successful");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			console.error("Logout failed:", error);
			set({ isLoggingOut: false });
			toast.error(error.response?.data?.message || "Logout failed");
		}
	},
	authCheck: async () => {
		// Prevent multiple concurrent auth checks
		if (isPerformingAuthCheck) {
			console.log("Auth check already in progress, skipping");
			return;
		}
		
		isPerformingAuthCheck = true;
		set({ isCheckingAuth: true });
		
		try {
			console.log("Checking authentication status");
			const response = await axios.get("http://localhost:8000/api/v1/auth/authCheck");
			console.log("Auth check response:", response.data);
			set({ 
				user: response.data.user, 
				isCheckingAuth: false,
				authCheckFailed: false
			});
		} catch (error) {
			console.error("Auth check failed:", error);
			set({ 
				isCheckingAuth: false, 
				user: null,
				authCheckFailed: true  
			});
			// Don't show error toast for auth check failures
		} finally {
			// Reset the flag when done
			isPerformingAuthCheck = false;
		}
	},
	resetAuthState: () => {
		set({
			isCheckingAuth: false,
			authCheckFailed: false
		});
	}
}));
