import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
	try {
		console.log("Getting trending movie...");
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		
		// Handle both normal and dummy data responses
		let randomMovie;
		if (data.results && Array.isArray(data.results)) {
			randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
			console.log("Successfully fetched trending movie");
		} else {
			console.warn("Unexpected response format:", data);
			throw new Error("Invalid response format from TMDB service");
		}

		res.json({ success: true, content: randomMovie });
	} catch (error) {
		console.error("Error in getTrendingMovie:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMovieTrailers(req, res) {
	const { id } = req.params;
	try {
		console.log(`Getting trailers for movie ID: ${id}`);
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
		console.log(`Successfully fetched trailers for movie ID: ${id}`);

		res.json({ success: true, trailers: data.results });
	} catch (error) {
		console.error(`Error in getMovieTrailers for ID ${id}:`, error.message);

		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMovieDetails(req, res) {
	const { id } = req.params;
	try {
		console.log(`Getting details for movie ID: ${id}`);
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
		console.log(`Successfully fetched details for movie ID: ${id}`);

		res.json({ success: true, movie: data });
	} catch (error) {
		console.error(`Error in getMovieDetails for ID ${id}:`, error.message);

		if (error.message.includes("404")) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSimilarMovies(req, res) {
	const { id } = req.params;
	try {
		console.log(`Getting similar movies for ID: ${id}`);
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
		console.log(`Successfully fetched similar movies for ID: ${id}`);

		res.json({ success: true, movies: data.results });
	} catch (error) {
		console.error(`Error in getSimilarMovies for ID ${id}:`, error.message);

		if (error.message.includes("404")) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		console.log(`Getting movies by category: ${category}`);
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		
		// Handle both normal and dummy data responses
		let movies = [];
		if (data.results && Array.isArray(data.results)) {
			movies = data.results;
			console.log(`Successfully fetched ${movies.length} movies for category: ${category}`);
		} else {
			console.warn(`Unexpected response format for category ${category}:`, data);
			throw new Error("Invalid response format from TMDB service");
		}

		res.status(200).json({ success: true, content: movies });
	} catch (error) {
		console.error(`Error in getMoviesByCategory for category ${category}:`, error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
