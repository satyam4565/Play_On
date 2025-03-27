import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// Configure axios to always include credentials (cookies) with every request
axios.defaults.withCredentials = true;
// Set a timeout for requests
axios.defaults.timeout = 10000;
// Add request interceptor for debugging
axios.interceptors.request.use(
	config => {
		console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
		return config;
	},
	error => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
			<Toaster position="top-center" />
		</BrowserRouter>
	</React.StrictMode>
);
