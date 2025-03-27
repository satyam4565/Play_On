import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/authUser";
import axios from "axios";
import toast from "react-hot-toast";

// Dummy trending content for when API fails
const DUMMY_TRENDING_CONTENT = {
	movie: {
		id: 100,
		title: "The Matrix Resurrections",
		backdrop_path: "/placeholder.png",
		poster_path: "/placeholder.png",
		overview: "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Neo will have to follow the white rabbit once more.",
		vote_average: 8.5,
		release_date: "2023-12-22"
	},
	tv: {
		id: 200,
		name: "Stranger Things 5",
		backdrop_path: "/placeholder.png",
		poster_path: "/placeholder.png",
		overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
		vote_average: 9.2
	}
};

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const [useDummyData, setUseDummyData] = useState(false);
	const { contentType } = useContentStore();
	const { user, authCheck } = useAuthStore();

	const retryFetch = () => {
		console.log("Retrying fetch...");
		setRetryCount(prev => prev + 1);
	};

	useEffect(() => {
		// Check if user is authenticated before making the API call
		// Make sure we handle the case where auth check is needed
		if (!user) {
			console.log("No user found, performing auth check");
			authCheck();
		}
		
		const getTrendingContent = async () => {
			// Don't fetch if we know the user is not authenticated
			if (!user) {
				console.log("No authenticated user, skipping fetch");
				setIsLoading(false);
				setError({ response: { status: 401, data: { message: "Authentication required" } } });
				return;
			}
			
			setIsLoading(true);
			setError(null);
			
			try {
				console.log(`Fetching trending ${contentType}... (attempt: ${retryCount + 1})`);
				// Set a timeout for this specific request
				const res = await axios.get(`/api/v1/${contentType}/trending`, {
					timeout: 8000,
					headers: {
						'Cache-Control': 'no-cache',
						'Pragma': 'no-cache',
						'Expires': '0',
					}
				});
				
				console.log("Trending content response:", res.data);
				
				if (!res.data || !res.data.content) {
					console.error("Invalid trending content response:", res.data);
					throw new Error("Invalid response format - missing content");
				}
				
				// Validate that we have necessary image paths
				const content = res.data.content;
				if (!content.backdrop_path && !content.poster_path) {
					console.warn("Trending content has no images:", content);
				}
				
				setTrendingContent(res.data.content);
				setUseDummyData(false);
			} catch (error) {
				console.error("Error fetching trending content:", error);
				setError(error);
				
				if (error.response) {
					console.log("Error response status:", error.response.status);
					console.log("Error response data:", error.response.data);
					
					// If there's an API key error (TMDB API error), use dummy data
					if (error.response.status === 401) {
						if (error.response.data?.success === false && 
							error.response.data?.message?.includes("Invalid API key")) {
							console.log("Using dummy trending data due to API key error");
							setUseDummyData(true);
							setTrendingContent(DUMMY_TRENDING_CONTENT[contentType]);
							setError(null); // Clear error to show dummy content
						} else {
							console.log("Authentication required for trending content");
							// Try to refresh auth status
							authCheck();
						}
					} else {
						toast.error(`Failed to load content: ${error.response.data?.message || "Server error"}`);
					}
				} else if (error.request) {
					console.log("No response received:", error.request);
					toast.error("No response from server. Please check your connection.");
				} else if (error.code === 'ECONNABORTED') {
					console.log("Request timeout");
					toast.error("Request timeout. Server is taking too long to respond.");
				} else {
					toast.error(`Request error: ${error.message}`);
				}
			} finally {
				setIsLoading(false);
			}
		};

		getTrendingContent();
	}, [contentType, retryCount, user, authCheck]);

	return { trendingContent, isLoading, error, retryFetch, useDummyData };
};
export default useGetTrendingContent;
