import axios from "axios";

/**
 * Byte counter for tracking network usage
 */
export const byteCounter = {
	sent: 0,
	received: 0,
	reset() {
		this.sent = 0;
		this.received = 0;
	},
	getTotal() {
		return this.sent + this.received;
	},
};

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
 * Also tracks bytes sent
 */
apiClient.interceptors.request.use(
	(config) => {
		// Add authentication token if available
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Count bytes sent
		// Calculate size of request body
		if (config.data) {
			const dataString =
				typeof config.data === "string"
					? config.data
					: JSON.stringify(config.data);
			byteCounter.sent += new Blob([dataString]).size;
		}

		// Count bytes in headers
		if (config.headers) {
			const headersString = JSON.stringify(config.headers);
			byteCounter.sent += new Blob([headersString]).size;
		}

		// Count bytes in URL
		if (config.url) {
			const fullUrl = config.baseURL
				? `${config.baseURL}${config.url}`
				: config.url;
			byteCounter.sent += new Blob([fullUrl]).size;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * Response interceptor for handling errors globally
 * Also tracks bytes received
 */
apiClient.interceptors.response.use(
	(response) => {
		// Count bytes received
		if (response.data) {
			const dataString =
				typeof response.data === "string"
					? response.data
					: JSON.stringify(response.data);
			byteCounter.received += new Blob([dataString]).size;
		}

		// Count bytes in response headers
		if (response.headers) {
			const headersString = JSON.stringify(response.headers);
			byteCounter.received += new Blob([headersString]).size;
		}

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
