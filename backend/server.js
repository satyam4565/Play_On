import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// Configure CORS
// In development, we use simple CORS config. In production, 
// it would be more restrictive based on actual domains
app.use(cors({
    origin: ENV_VARS.NODE_ENV === 'production' ? true : 'http://localhost:5001',
    credentials: true // allow cookies
}));

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

// Log all incoming requests for debugging
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
	// Log cookies for debugging authentication issues
	if (req.cookies && req.cookies['jwt-netflix']) {
		console.log('JWT cookie present');
	} else {
		console.log('No JWT cookie found');
	}
	next();
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Make sure static files are served correctly
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Always serve index.html for any non-API routes to support client-side routing
app.get("*", (req, res) => {
	console.log(`Serving index.html for route: ${req.originalUrl}`);
	res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
	console.log(`Serving static files from: ${path.join(__dirname, "/frontend/dist")}`);
	console.log(`NODE_ENV: ${ENV_VARS.NODE_ENV}`);
	connectDB();
});
