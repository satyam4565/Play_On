import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play, Star, Calendar, Clock, Award, Loader, AlertTriangle, RefreshCw, LogIn } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
	const { trendingContent, isLoading, error, retryFetch, useDummyData } = useGetTrendingContent();
	const { contentType } = useContentStore();
	const [imgLoading, setImgLoading] = useState(true);
	const { user, authCheck, isCheckingAuth } = useAuthStore();
	const navigate = useNavigate();

	// Check authentication on component mount
	useEffect(() => {
		authCheck();
	}, [authCheck]);

	// Show auth checking state
	if (isCheckingAuth) {
		return (
			<div className='min-h-screen text-white relative pt-20 lg:pl-60'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
					<div className="text-center">
						<Loader className='animate-spin text-red-600 size-12 mb-4 mx-auto' />
						<p className="text-xl">Verifying your session...</p>
					</div>
				</div>
			</div>
		);
	}

	// If user is not authenticated, show login prompt
	if (!user) {
		return (
			<div className='min-h-screen text-white relative pt-20 lg:pl-60'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
					<div className="text-center max-w-md mx-auto p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800">
						<LogIn className='text-red-500 size-12 mb-4 mx-auto' />
						<h2 className="text-2xl font-bold mb-3">Authentication Required</h2>
						<p className="text-gray-300 mb-5">Please sign in to access the content library and view movies or TV shows.</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/auth/login"
								className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg"
							>
								Sign In
							</Link>
							<Link
								to="/auth/signup"
								className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg border border-gray-700"
							>
								Create Account
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Show loading state
	if (isLoading) {
		return (
			<div className='min-h-screen text-white relative pt-20 lg:pl-60'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
					<div className="text-center">
						<Loader className='animate-spin text-red-600 size-12 mb-4 mx-auto' />
						<p className="text-xl">Loading content...</p>
					</div>
				</div>
			</div>
		);
	}

	// Show error state (only if not using dummy data)
	if (error && !useDummyData) {
		return (
			<div className='min-h-screen text-white relative pt-20 lg:pl-60'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
					<div className="text-center max-w-md mx-auto p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800">
						<AlertTriangle className='text-amber-500 size-12 mb-4 mx-auto' />
						<h2 className="text-xl font-bold mb-2">Content Loading Error</h2>
						<p className="text-gray-300 mb-4">We couldn't load the content. This might be due to a connection issue or authentication problem.</p>
						<p className="text-sm text-gray-400 mb-6 max-w-md text-center">
							{error.response ? 
								`Error ${error.response.status}: ${error.response.data?.message || error.message}` : 
								error.message}
						</p>
						<div className="flex flex-wrap gap-3 justify-center">
							<button 
								onClick={retryFetch} 
								className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-2 px-4 rounded-lg flex items-center"
							>
								<RefreshCw className="size-4 mr-2" />
								Try Again
							</button>
							{error.response?.status === 401 && (
								<button 
									onClick={() => navigate('/auth/login')} 
									className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center"
								>
									<LogIn className="size-4 mr-2" />
									Sign In Again
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Show placeholder when no content is available and not using dummy data
	if (!trendingContent && !useDummyData) {
		return (
			<div className='min-h-screen text-white relative pt-20 lg:pl-60'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);
	}

	// Get the appropriate image path with fallbacks
	const getHeroImageUrl = () => {
		if (useDummyData || !trendingContent.backdrop_path || trendingContent.backdrop_path === '/placeholder.png') {
			return "/hero-fallback.jpg"; // Default fallback image for dummy data
		}
		
		if (trendingContent.backdrop_path) {
			return `${ORIGINAL_IMG_BASE_URL}${trendingContent.backdrop_path}`;
		} else if (trendingContent.poster_path) {
			return `${ORIGINAL_IMG_BASE_URL}${trendingContent.poster_path}`;
		}
		return "/hero-fallback.jpg";
	};

	return (
		<>
			{/* Main content with padding for navbar and sidebar */}
			<div className='min-h-screen text-white pt-20 lg:pl-60'>
				<Navbar />

				{/* Hero Section */}
				<div className='relative'>
					{/* Image loading state */}
					{imgLoading && (
						<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
					)}

					{/* Hero background image */}
					<div className="relative h-[70vh] overflow-hidden">
						<img
							src={getHeroImageUrl()}
							alt='Hero background'
							className='w-full h-full object-cover'
							onLoad={() => setImgLoading(false)}
							onError={(e) => {
								console.error("Hero image failed to load:", e);
								setImgLoading(false);
								// Try poster path as fallback if backdrop fails
								if (e.target.src.includes("backdrop_path") && trendingContent.poster_path) {
									e.target.src = `${ORIGINAL_IMG_BASE_URL}${trendingContent.poster_path}`;
								} else {
									e.target.src = "/hero-fallback.jpg";
									toast.error("Failed to load hero image");
								}
							}}
						/>
						
						{/* Gradient overlay for better text readability */}
						<div className='absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent' aria-hidden='true' />

						{/* Angled shape at the bottom */}
						<div 
							className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-black to-black/90"
							style={{clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0% 100%)'}}
						/>

						{/* Featured content info */}
						<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center p-8 md:p-12 lg:max-w-3xl'>
							<div className="flex flex-wrap items-center gap-3 mb-3">
								<div className="bg-red-600 text-white px-3 py-0.5 rounded-full text-sm font-semibold">FEATURED</div>
								{contentType === "movie" ? (
									<div className="bg-gray-800 px-3 py-0.5 rounded-full text-sm font-medium flex items-center gap-1">
										<Calendar className="size-3" />
										<span>{trendingContent?.release_date?.split("-")[0] || "Unknown"}</span>
									</div>
								) : (
									<div className="bg-gray-800 px-3 py-0.5 rounded-full text-sm font-medium flex items-center gap-1">
										<Calendar className="size-3" />
										<span>TV Series</span>
									</div>
								)}
								{trendingContent?.vote_average && (
									<div className="bg-amber-600/20 border border-amber-500 px-3 py-0.5 rounded-full text-sm font-medium flex items-center gap-1">
										<Star className="size-3 text-amber-500 fill-amber-500" />
										<span className="text-amber-400">{trendingContent.vote_average.toFixed(1)}</span>
									</div>
								)}
							</div>
							
							<h1 className='text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg'>
								{trendingContent?.title || trendingContent?.name || "Featured Content"}
								{useDummyData && <span className="text-sm font-normal text-gray-400 block mt-2">(Demo Content - API Key Issues)</span>}
							</h1>
							
							<div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
								<div className="flex items-center gap-1">
									<Clock className="size-4" />
									<span>{Math.floor(Math.random() * 60) + 90} min</span>
								</div>
								<div className="flex items-center gap-1">
									<Award className="size-4" />
									<span>{trendingContent?.adult ? "18+" : "PG-13"}</span>
								</div>
							</div>

							<p className='text-base md:text-lg text-gray-200 mb-6 line-clamp-3 md:line-clamp-none'>
								{trendingContent?.overview || "No overview available for this content."}
							</p>
						
							<div className='flex flex-wrap gap-4'>
								<Link
									to={useDummyData ? "#" : `/watch/${trendingContent?.id}`}
									className='bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-full flex items-center transition-all duration-300 shadow-lg hover:shadow-red-500/20'
								>
									<Play className='size-5 mr-2 fill-white' />
									Watch Now
								</Link>

								<Link
									to={useDummyData ? "#" : `/watch/${trendingContent?.id}`}
									className='bg-gray-800/70 hover:bg-gray-800 backdrop-blur-sm text-white py-3 px-8 rounded-full flex items-center transition-colors duration-300 border border-gray-700'
								>
									<Info className='size-5 mr-2' />
									More Info
								</Link>
							</div>
						</div>
					</div>

					{/* Content sections with new design */}
					<div className='py-12 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900'>
						{useDummyData && (
							<div className="mb-8 bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center">
								<AlertTriangle className="text-yellow-500 size-6 mr-3" />
								<div>
									<h3 className="font-semibold">Using Demo Content</h3>
									<p className="text-sm text-gray-300">The TMDB API key is invalid. Showing demo content for preview purposes.</p>
								</div>
							</div>
						)}
						
						<div className="mb-16">
							<h2 className="text-2xl font-bold mb-8 flex items-center">
								<span className="w-1 h-8 bg-red-600 mr-3 rounded-full"></span>
								<span>Popular {contentType === "movie" ? "Movies" : "TV Shows"}</span>
							</h2>
							
							<div className='grid'>
								{contentType === "movie"
									? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
									: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
							</div>
						</div>
						
						{/* Premium promotion banner */}
						<div className="rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-8 my-8">
							<div className="flex flex-col md:flex-row items-center justify-between gap-6">
								<div className="md:max-w-md">
									<h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Enjoy Premium Features</h3>
									<p className="text-gray-300 mb-4">Stream in 4K quality with no ads and download to watch offline. Get exclusive access to premium content.</p>
									<button className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition-all">
										Try Premium Free
									</button>
								</div>
								<div className="hidden md:block">
									<img src="/device-pile.png" alt="Devices" className="w-64 h-auto" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default HomeScreen;
