import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight, Loader, AlertTriangle, Film, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authUser";

// Dummy data for when API fails
const DUMMY_CONTENT = {
	popular: [
		{ id: 1, title: "Inception", poster_path: "/placeholder.png" },
		{ id: 2, title: "The Dark Knight", poster_path: "/placeholder.png" },
		{ id: 3, title: "Interstellar", poster_path: "/placeholder.png" },
		{ id: 4, title: "Parasite", poster_path: "/placeholder.png" },
		{ id: 5, title: "Joker", poster_path: "/placeholder.png" },
		{ id: 6, title: "Avengers: Endgame", poster_path: "/placeholder.png" }
	],
	trending: [
		{ id: 7, title: "Dune", poster_path: "/placeholder.png" },
		{ id: 8, title: "No Time to Die", poster_path: "/placeholder.png" },
		{ id: 9, title: "Top Gun: Maverick", poster_path: "/placeholder.png" },
		{ id: 10, title: "The Batman", poster_path: "/placeholder.png" },
		{ id: 11, title: "Spider-Man: No Way Home", poster_path: "/placeholder.png" },
		{ id: 12, title: "Everything Everywhere All at Once", poster_path: "/placeholder.png" }
	],
	top_rated: [
		{ id: 13, title: "The Shawshank Redemption", poster_path: "/placeholder.png" },
		{ id: 14, title: "The Godfather", poster_path: "/placeholder.png" },
		{ id: 15, title: "Pulp Fiction", poster_path: "/placeholder.png" },
		{ id: 16, title: "Schindler's List", poster_path: "/placeholder.png" },
		{ id: 17, title: "The Lord of the Rings", poster_path: "/placeholder.png" },
		{ id: 18, title: "Fight Club", poster_path: "/placeholder.png" }
	],
	upcoming: [
		{ id: 19, title: "Upcoming Movie 1", poster_path: "/placeholder.png" },
		{ id: 20, title: "Upcoming Movie 2", poster_path: "/placeholder.png" },
		{ id: 21, title: "Upcoming Movie 3", poster_path: "/placeholder.png" },
		{ id: 22, title: "Upcoming Movie 4", poster_path: "/placeholder.png" },
		{ id: 23, title: "Upcoming Movie 5", poster_path: "/placeholder.png" },
		{ id: 24, title: "Upcoming Movie 6", poster_path: "/placeholder.png" }
	],
	now_playing: [
		{ id: 25, title: "Now Playing 1", poster_path: "/placeholder.png" },
		{ id: 26, title: "Now Playing 2", poster_path: "/placeholder.png" },
		{ id: 27, title: "Now Playing 3", poster_path: "/placeholder.png" },
		{ id: 28, title: "Now Playing 4", poster_path: "/placeholder.png" },
		{ id: 29, title: "Now Playing 5", poster_path: "/placeholder.png" },
		{ id: 30, title: "Now Playing 6", poster_path: "/placeholder.png" }
	]
};

const MovieSlider = ({ category }) => {
	const { contentType } = useContentStore();
	const { user, authCheck } = useAuthStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [retryCount, setRetryCount] = useState(0);
	const [useDummyData, setUseDummyData] = useState(false);
	const navigate = useNavigate();

	const sliderRef = useRef(null);

	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

	useEffect(() => {
		// Check if user is authenticated
		if (!user) {
			authCheck(); // Try to verify if the user is actually logged in
		}
		
		const getContent = async () => {
			setIsLoading(true);
			setError(null);
			try {
				console.log(`Fetching ${contentType}/${category}...`);
				const res = await axios.get(`http://localhost:8000/api/v1/${contentType}/${category}`);
				console.log(`${category} response:`, res.data);
				
				if (!res.data.content || !Array.isArray(res.data.content)) {
					console.error(`Invalid response format for ${category}:`, res.data);
					throw new Error("Invalid response format");
				}
				
				setContent(res.data.content);
				setUseDummyData(false);
			} catch (error) {
				console.error(`Error fetching ${category}:`, error);
				setError(error);
				
				if (error.response) {
					console.log("Error response:", error.response.data);
					console.log("Error status:", error.response.status);
					
					// If there's an API key error (TMDB API error), use dummy data
					if (error.response.status === 401 && 
						error.response.data?.success === false && 
						error.response.data?.message?.includes("Invalid API key")) {
						console.log("Using dummy data due to API key error");
						setUseDummyData(true);
						setContent(DUMMY_CONTENT[category] || DUMMY_CONTENT.popular);
					}
					
					if (error.response.status === 401 && !error.response.data?.message?.includes("Invalid API key")) {
						// Authentication issue with our backend
						console.log("Authentication required for content");
					}
				}
			} finally {
				setIsLoading(false);
			}
		};

		getContent();
	}, [contentType, category, retryCount, user, authCheck]);

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	const getImageUrl = (item) => {
		// For dummy data
		if (useDummyData || item.poster_path === '/placeholder.png') {
			return "/placeholder.png";
		}
		
		// Try different image paths in order of preference
		if (item.poster_path) {
			return `${SMALL_IMG_BASE_URL}${item.poster_path}`;
		} else if (item.backdrop_path) {
			return `${SMALL_IMG_BASE_URL}${item.backdrop_path}`;
		} else {
			// Return placeholder for items with no images
			console.warn("No image path available for item:", item);
			return "/fallback-image.png";
		}
	};

	const handleRetry = () => {
		setRetryCount(prev => prev + 1);
	};

	const handleLogin = () => {
		navigate('/auth/login');
	};

	// Handle the unauthorized case specifically (excluding API key errors which use dummy data)
	if (error && error.response && error.response.status === 401 && !useDummyData) {
		return (
			<div className='bg-black text-white relative px-5 md:px-20 mb-12'>
				<h2 className='mb-4 text-2xl font-bold'>
					{formattedCategoryName} {formattedContentType}
				</h2>
				
				<div className="flex flex-col items-center justify-center py-12 bg-gray-900/20 rounded-lg border border-gray-800">
					<LogIn className="text-red-500 size-8 mb-2" />
					<p className="text-gray-300 mb-3">Authentication Required</p>
					<p className="text-sm text-gray-400 mb-4 max-w-md text-center">
						Please sign in to view this content
					</p>
					<div className="flex gap-3">
						<button 
							onClick={handleLogin}
							className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
						>
							Sign In
						</button>
						<button 
							onClick={handleRetry}
							className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className='bg-black text-white relative px-5 md:px-20 mb-12'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{formattedCategoryName} {formattedContentType}
				{useDummyData && <span className="ml-2 text-sm font-normal text-gray-400">(Demo Content)</span>}
			</h2>

			{isLoading && (
				<div className="flex items-center justify-center py-16 bg-gray-900/20 rounded-lg">
					<Loader className="animate-spin text-red-500 size-8 mr-3" />
					<span>Loading...</span>
				</div>
			)}

			{error && error.response?.status !== 401 && !useDummyData && (
				<div className="flex flex-col items-center justify-center py-12 bg-gray-900/20 rounded-lg border border-gray-800">
					<AlertTriangle className="text-yellow-500 size-8 mb-2" />
					<p className="text-gray-300 mb-3">Failed to load {formattedCategoryName} content</p>
					<p className="text-sm text-gray-400 mb-4 max-w-md text-center">
						{error.response ? 
							`Error ${error.response.status}: ${error.response.data?.message || error.message}` : 
							error.message}
					</p>
					<button 
						onClick={handleRetry}
						className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
					>
						Retry
					</button>
				</div>
			)}

			{!isLoading && (useDummyData || (!error && content.length > 0)) && (
				<>
					<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
						{content.map((item) => (
							<Link to={useDummyData ? "#" : `/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
								<div className='rounded-lg overflow-hidden h-40 bg-gray-900'>
									<img
										src={getImageUrl(item)}
										alt={item.title || item.name || "Movie poster"}
										className='transition-transform duration-300 ease-in-out group-hover:scale-125 w-full h-full object-cover'
										onError={(e) => {
											console.error("Image failed to load:", e.target.src);
											// First try fallback image
											if (!e.target.src.includes("fallback-image.png")) {
												e.target.src = "/fallback-image.png";
											// If fallback also fails, use placeholder
											} else if (!e.target.src.includes("placeholder.png")) {
												e.target.src = "/placeholder.png";
											}
											e.target.classList.add("object-contain", "p-4");
											e.target.classList.remove("object-cover");
										}}
									/>
									<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
										<Film className="text-white size-12" />
									</div>
								</div>
								<p className='mt-2 text-center text-sm truncate'>{item.title || item.name}</p>
							</Link>
						))}
					</div>

					{showArrows && content.length > 0 && (
						<>
							<button
								className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
								size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
								onClick={scrollLeft}
							>
								<ChevronLeft size={24} />
							</button>

							<button
								className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
								size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
								onClick={scrollRight}
							>
								<ChevronRight size={24} />
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};
export default MovieSlider;
