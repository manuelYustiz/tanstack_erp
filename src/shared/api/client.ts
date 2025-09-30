import axios from "axios";

/**
 * Base API client configured with axios
 * Used for making HTTP requests throughout the application
 */
export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Request interceptor for adding authentication tokens or other headers
 */
apiClient.interceptors.request.use(
	(config) => {
		// Add authentication token if available
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * Response interceptor for handling errors globally
 */
apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle common errors
		if (error.response?.status === 401) {
			// Unauthorized - could trigger logout
			console.error("Unauthorized access");
		}
		return Promise.reject(error);
	}
);
