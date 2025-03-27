import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
	try {
		console.log("Protecting route:", req.originalUrl);
		const token = req.cookies["jwt-netflix"];

		if (!token) {
			console.log("No JWT token found in cookies");
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		console.log("JWT token found, verifying...");
		try {
			const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
			console.log("JWT verified successfully for user ID:", decoded.userId);

			if (!decoded) {
				console.log("JWT verification failed - invalid token");
				return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
			}

			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				console.log("User not found in database with ID:", decoded.userId);
				return res.status(404).json({ success: false, message: "User not found" });
			}

			console.log("User authenticated successfully:", user.username);
			req.user = user;
			next();
		} catch (jwtError) {
			console.error("JWT verification error:", jwtError.message);
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}
	} catch (error) {
		console.error("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
