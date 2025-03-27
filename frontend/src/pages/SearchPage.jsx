import { useState, useEffect } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Film, Search as SearchIcon, Tv, User, Star, TrendingUp, Filter, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState("movie");
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [results, setResults] = useState([]);
	const [showFilters, setShowFilters] = useState(false);
	const [sortBy, setSortBy] = useState("popularity");
	const { setContentType } = useContentStore();

	// Clear results when tab changes
	useEffect(() => {
		setResults([]);
		setSearchTerm("");
	}, [activeTab]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === "movie" ? setContentType("movie") : setContentType("tv");
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchTerm.trim()) {
			toast.error("Please enter a search term");
			return;
		}
		
		setIsSearching(true);
		try {
			const res = await axios.get(`http://localhost:8000/api/v1/search/${activeTab}/${searchTerm}`);
			// Sort results based on the selected sort option
			let sortedResults = [...res.data.content];
			if (sortBy === "popularity") {
				sortedResults.sort((a, b) => b.popularity - a.popularity);
			} else if (sortBy === "rating") {
				sortedResults.sort((a, b) => b.vote_average - a.vote_average);
			} else if (sortBy === "recent") {
				sortedResults.sort((a, b) => {
					const dateA = a.release_date || a.first_air_date || "";
					const dateB = b.release_date || b.first_air_date || "";
					return dateB.localeCompare(dateA);
				});
			}
			setResults(sortedResults);
		} catch (error) {
			if (error.response?.status === 404) {
				toast.error("Nothing found, make sure you are searching under the right category");
			} else {
				toast.error("An error occurred, please try again later");
			}
		} finally {
			setIsSearching(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 lg:pl-60'>
			<Navbar />
			
			{/* Main content area */}
			<div className='max-w-7xl mx-auto px-4 py-8'>
				{/* Hero section */}
				<div className="relative rounded-3xl overflow-hidden mb-12">
					{/* Background */}
					<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black z-0"></div>
					<div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full opacity-20 z-0">
						<div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-tl from-red-600 to-transparent"></div>
					</div>
					
					{/* Content */}
					<div className="relative z-10 p-8 md:p-12">
						<div className="max-w-2xl">
							<h1 className="text-3xl md:text-4xl font-bold mb-4">
								Discover <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Amazing Content</span>
							</h1>
							<p className="text-gray-300 mb-6">Find your next favorite movies, TV shows, and the people who make them great.</p>
							
							{/* Search form */}
							<form className='flex gap-2 items-stretch md:max-w-xl' onSubmit={handleSearch}>
								<div className="relative flex-1">
									<input
										type='text'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										placeholder={`Search for ${activeTab === "person" ? "an actor or director" : `a ${activeTab}`}`}
										className='w-full p-4 rounded-l-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pl-12'
									/>
									<SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
								</div>
								<button 
									className='bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white px-6 md:px-8 rounded-r-full transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg' 
									disabled={isSearching}
								>
									{isSearching ? "Searching..." : "Search"}
								</button>
							</form>
						</div>
					</div>
				</div>
				
				{/* Category tabs + filter toggle */}
				<div className="flex flex-wrap justify-between items-center mb-8 gap-4">
					<div className='flex flex-wrap gap-3'>
						<button
							className={`py-2.5 px-6 rounded-full flex items-center gap-2 transition-all ${
								activeTab === "movie" 
									? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg" 
									: "bg-gray-800/60 text-gray-300 hover:bg-gray-800"
							}`}
							onClick={() => handleTabClick("movie")}
						>
							<Film className="size-4" />
							<span>Movies</span>
						</button>
						<button
							className={`py-2.5 px-6 rounded-full flex items-center gap-2 transition-all ${
								activeTab === "tv" 
									? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg" 
									: "bg-gray-800/60 text-gray-300 hover:bg-gray-800"
							}`}
							onClick={() => handleTabClick("tv")}
						>
							<Tv className="size-4" />
							<span>TV Shows</span>
						</button>
						<button
							className={`py-2.5 px-6 rounded-full flex items-center gap-2 transition-all ${
								activeTab === "person" 
									? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg" 
									: "bg-gray-800/60 text-gray-300 hover:bg-gray-800"
							}`}
							onClick={() => handleTabClick("person")}
						>
							<User className="size-4" />
							<span>People</span>
						</button>
					</div>
					
					{/* Filter toggle */}
					<button 
						className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-800/60 hover:bg-gray-800 text-gray-300"
						onClick={() => setShowFilters(!showFilters)}
					>
						{showFilters ? <X className="size-4" /> : <Filter className="size-4" />}
						<span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
					</button>
				</div>
				
				{/* Filters */}
				{showFilters && (
					<div className="bg-gray-800/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
						<h3 className="font-semibold mb-4 flex items-center gap-2">
							<TrendingUp className="size-4 text-red-500" />
							<span>Sort Results</span>
						</h3>
						<div className="flex flex-wrap gap-3">
							<button 
								className={`px-4 py-2 rounded-lg border transition-colors ${
									sortBy === "popularity" 
										? "border-red-500 bg-red-600/20 text-white" 
										: "border-gray-700 hover:border-gray-600"
								}`}
								onClick={() => setSortBy("popularity")}
							>
								Most Popular
							</button>
							<button 
								className={`px-4 py-2 rounded-lg border transition-colors ${
									sortBy === "rating" 
										? "border-red-500 bg-red-600/20 text-white" 
										: "border-gray-700 hover:border-gray-600"
								}`}
								onClick={() => setSortBy("rating")}
							>
								Highest Rated
							</button>
							<button 
								className={`px-4 py-2 rounded-lg border transition-colors ${
									sortBy === "recent" 
										? "border-red-500 bg-red-600/20 text-white" 
										: "border-gray-700 hover:border-gray-600"
								}`}
								onClick={() => setSortBy("recent")}
							>
								Most Recent
							</button>
						</div>
					</div>
				)}

				{/* Results info */}
				{results.length > 0 && (
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-bold">
							{results.length} result{results.length !== 1 ? 's' : ''} found
						</h2>
						
						{/* Sort info - mobile only */}
						<div className="flex items-center gap-2 text-sm text-gray-400">
							<span>Sorted by:</span>
							<span className="text-red-400 font-medium capitalize">{sortBy}</span>
						</div>
					</div>
				)}

				{/* Results grid with improved cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{results.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;

						return (
							<div 
								key={result.id} 
								className='group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl hover:border-gray-700 transition-all duration-300 hover:-translate-y-1'
							>
								{activeTab === "person" ? (
									<div className='flex flex-col h-full'>
										<div className="overflow-hidden">
											<img
												src={ORIGINAL_IMG_BASE_URL + result.profile_path}
												alt={result.name}
												className='w-full h-72 object-cover transition-transform group-hover:scale-105 duration-300'
											/>
										</div>
										<div className="p-4 flex-1 flex flex-col">
											<h2 className='text-xl font-bold group-hover:text-red-400 transition-colors'>{result.name}</h2>
											<p className="text-gray-400 text-sm mt-1">
												{result.known_for_department}
											</p>
											{result.known_for && result.known_for.length > 0 && (
												<div className="mt-3 pt-3 border-t border-gray-800">
													<p className="text-xs text-gray-500 mb-1">Known For:</p>
													<p className="text-sm line-clamp-2">{result.known_for.map(item => item.title || item.name).join(', ')}</p>
												</div>
											)}
										</div>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										className="flex flex-col h-full"
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<div className="relative overflow-hidden">
											<img
												src={ORIGINAL_IMG_BASE_URL + result.poster_path}
												alt={result.title || result.name}
												className='w-full h-72 object-cover transition-transform group-hover:scale-105 duration-300'
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
											
											{result.vote_average > 0 && (
												<div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 rounded-full px-2 py-1 text-xs flex items-center z-10">
													<Star className="size-3 fill-yellow-400 mr-1" /> 
													{result.vote_average.toFixed(1)}
												</div>
											)}
											
											{/* Play button that appears on hover */}
											<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
												<div className="bg-red-600/90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
													<Film className="size-6" />
												</div>
											</div>
										</div>
										
										<div className="p-5 flex-1 flex flex-col">
											<h2 className='text-lg font-bold group-hover:text-red-400 transition-colors'>{result.title || result.name}</h2>
											<div className="flex items-center gap-3 mt-2 text-sm">
												<span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300">
													{result.release_date?.split('-')[0] || result.first_air_date?.split('-')[0] || 'Unknown'}
												</span>
												{activeTab === "movie" && result.runtime && (
													<span className="text-gray-400">{result.runtime} min</span>
												)}
											</div>
											{result.overview && (
												<p className="text-gray-400 text-sm mt-3 line-clamp-3">{result.overview}</p>
											)}
										</div>
									</Link>
								)}
							</div>
						);
					})}
				</div>
				
				{/* Empty state */}
				{results.length === 0 && searchTerm.trim() && !isSearching && (
					<div className="text-center py-16 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-800 mt-6">
						<div className="bg-gray-800/50 p-4 rounded-full inline-flex items-center justify-center mb-4">
							<SearchIcon className="size-8 text-gray-400" />
						</div>
						<h3 className="text-xl font-semibold mb-2">No results found</h3>
						<p className="text-gray-400 max-w-md mx-auto">Try checking your spelling or use different keywords.</p>
						
						<div className="mt-8 flex flex-wrap justify-center gap-3">
							<button 
								onClick={() => setSearchTerm('Action')}
								className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
							>
								Try "Action"
							</button>
							<button 
								onClick={() => setSearchTerm('Comedy')}
								className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
							>
								Try "Comedy"
							</button>
							<button 
								onClick={() => setSearchTerm('Drama')}
								className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
							>
								Try "Drama"
							</button>
						</div>
					</div>
				)}
				
				{/* Initial empty state */}
				{results.length === 0 && !searchTerm.trim() && !isSearching && (
					<div className="text-center py-16">
						<h3 className="text-xl font-semibold mb-2">Start searching for your favorite {activeTab === "movie" ? "movies" : activeTab === "tv" ? "TV shows" : "actors"}</h3>
						<p className="text-gray-400 max-w-md mx-auto">Enter a search term above to find great content.</p>
					</div>
				)}
			</div>
		</div>
	);
};
export default SearchPage;
