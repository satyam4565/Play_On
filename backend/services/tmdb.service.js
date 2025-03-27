import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

const DUMMY_RESPONSES = {
	"trending/movie/day": {
		page: 1,
		results: [
			{
				id: 1,
				title: "Dummy Movie 1",
				overview: "This is a dummy movie since the API key is invalid",
				poster_path: "/placeholder.png",
				backdrop_path: "/placeholder.png",
				vote_average: 8.5,
				release_date: "2023-01-01"
			},
			{
				id: 2,
				title: "Dummy Movie 2",
				overview: "Another dummy movie for testing",
				poster_path: "/placeholder.png", 
				backdrop_path: "/placeholder.png",
				vote_average: 7.8,
				release_date: "2023-02-15"
			}
		],
		total_pages: 1,
		total_results: 2
	},
	"trending/tv/day": {
		page: 1,
		results: [
			{
				id: 101,
				name: "Dummy TV Show 1",
				overview: "This is a dummy TV show since the API key is invalid",
				poster_path: "/placeholder.png",
				backdrop_path: "/placeholder.png",
				vote_average: 8.2
			},
			{
				id: 102,
				name: "Dummy TV Show 2",
				overview: "Another dummy TV show for testing",
				poster_path: "/placeholder.png",
				backdrop_path: "/placeholder.png",
				vote_average: 7.5
			}
		],
		total_pages: 1,
		total_results: 2
	}
};

// Helper function to return dummy data based on URL path
const getDummyResponse = (url) => {
	console.log("Using dummy data for:", url);
	
	// Extract the path from the URL
	let path = url;
	if (url.includes('api.themoviedb.org/3/')) {
		path = url.split('api.themoviedb.org/3/')[1].split('?')[0];
	}
	
	// Check for trending endpoints
	if (path.includes('trending/movie')) {
		return DUMMY_RESPONSES["trending/movie/day"];
	} else if (path.includes('trending/tv')) {
		return DUMMY_RESPONSES["trending/tv/day"];
	} else if (path.includes('movie/popular') || 
			   path.includes('movie/top_rated') || 
			   path.includes('movie/upcoming') || 
			   path.includes('movie/now_playing')) {
		return DUMMY_RESPONSES["trending/movie/day"];
	} else if (path.includes('tv/popular') || 
			   path.includes('tv/top_rated') || 
			   path.includes('tv/on_the_air')) {
		return DUMMY_RESPONSES["trending/tv/day"];
	}
	
	// Default fallback
	return {
		success: true,
		results: [],
		message: "Dummy data not available for this endpoint"
	};
};

export const fetchFromTMDB = async (url) => {
	try {
		console.log("Making TMDB API request to:", url);
		
		const baseUrl = "https://api.themoviedb.org/3";
		const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
		
		// Parse the URL to add the api_key parameter
		const hasParams = fullUrl.includes('?');
		const urlWithKey = `${fullUrl}${hasParams ? '&' : '?'}api_key=${ENV_VARS.TMDB_API_KEY.trim()}`;
		
		console.log("Request URL (partial):", urlWithKey.split("api_key=")[0] + "api_key=XXXXX");
		
		// Check if we're in dev mode and should use dummy data
		const useDummyData = process.env.USE_DUMMY_DATA === 'true';
		if (useDummyData) {
			console.log("Using dummy data because USE_DUMMY_DATA=true");
			return getDummyResponse(fullUrl);
		}
		
		// Make the request with the api_key parameter
		const response = await axios.get(urlWithKey);
		
		if (response.status !== 200) {
			throw new Error("Failed to fetch data from TMDB: " + response.statusText);
		}
		
		console.log("TMDB API response status:", response.status);
		
		// Check if the response data is empty or malformed
		if (!response.data || (Array.isArray(response.data.results) && response.data.results.length === 0)) {
			console.warn("TMDB API returned empty or invalid data:", response.data);
		}
		
		return response.data;
	} catch (error) {
		console.error("TMDB API Error:", error.message);
		
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error("TMDB error response status:", error.response.status);
			console.error("TMDB error response data:", error.response.data);
			
			// Check for invalid API key error
			if (error.response.status === 401 && 
				error.response.data && 
				error.response.data.status_message && 
				error.response.data.status_message.includes("Invalid API key")) {
				console.log("Invalid API key detected, using dummy data");
				return getDummyResponse(url);
			}
		} else if (error.request) {
			// The request was made but no response was received
			console.error("TMDB no response received");
		}
		
		throw error; // Re-throw for upstream handling
	}
};
