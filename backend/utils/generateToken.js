import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

	// Log token generation to help with debugging
	console.log(`Generated token for user ID: ${userId}`);

	// Cookie settings
	const cookieOptions = {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
		sameSite: ENV_VARS.NODE_ENV === "production" ? "none" : "strict", // Allow cross-site cookies in production
		secure: ENV_VARS.NODE_ENV === "production", // Only use secure in production
		path: "/", // Ensure the cookie is available on all paths
	};

	// Log cookie settings
	console.log("Setting cookie with options:", {
		...cookieOptions,
		maxAge: "15 days",
	});

	res.cookie("jwt-netflix", token, cookieOptions);

	return token;
};
