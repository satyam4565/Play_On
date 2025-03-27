import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";

function App() {
	const { authCheck } = useAuthStore();
	const [isInitializing, setIsInitializing] = useState(true);

	useEffect(() => {
		// Only try to authenticate once when the app loads
		const initializeAuth = async () => {
			try {
				console.log("Initializing authentication check");
				await authCheck();
			} catch (error) {
				console.error("Error during auth initialization:", error);
			} finally {
				// Always mark initialization as complete, even if auth fails
				setIsInitializing(false);
			}
		};
		
		initializeAuth();
		
		// Cleanup any potential background processes on unmount
		return () => {
			console.log("App unmounting, cleaning up");
		};
	}, []);  // Empty dependency array - only run once

	// Only show loading indicator briefly during initial load
	if (isInitializing) {
		// Set a timeout to prevent infinite loading
		setTimeout(() => {
			setIsInitializing(false);
		}, 2000);  // Max 2 seconds loading time
		
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
			<Routes>
				{/* Basic routes - always accessible */}
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				
				{/* Content routes - redirect to login if needed */}
				<Route path='/watch/:id' element={<WatchPage />} />
				<Route path='/search' element={<SearchPage />} />
				<Route path='/history' element={<SearchHistoryPage />} />
				
				{/* 404 route */}
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	);
}

export default App;
