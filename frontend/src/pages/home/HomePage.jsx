import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { useEffect } from "react";

const HomePage = () => {
	const { user, authCheckFailed, resetAuthState } = useAuthStore();
	
	// Use effect to reset auth state when component mounts or unmounts
	// This helps break any potential loops
	useEffect(() => {
		console.log("HomePage mounted");
		
		return () => {
			// Reset auth state on unmount
			console.log("HomePage unmounting, resetting auth state");
			resetAuthState();
		};
	}, [resetAuthState]);
	
	// If auth check has failed or there's no user, always show the auth screen
	// This prevents infinite auth check loops
	if (authCheckFailed || !user) {
		console.log("No authenticated user or auth check failed, showing AuthScreen");
		return <AuthScreen />;
	}
	
	// Only show HomeScreen if we have a confirmed logged-in user
	console.log("User is authenticated, showing HomeScreen");
	return <HomeScreen />;
};

export default HomePage;
