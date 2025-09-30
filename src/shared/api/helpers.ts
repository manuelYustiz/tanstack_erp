import type { AxiosError, AxiosRequestConfig } from "axios";
import { apiClient } from "./client";
import type { ApiClient, ApiError } from "./types";

/**
 * Create an API client wrapper that conforms to the ApiClient interface
 * This wrapper extracts the data from axios responses automatically
 */
export const createApiClient = (): ApiClient => ({
	async get<T>(url: string, config?: AxiosRequestConfig) {
		const response = await apiClient.get<T>(url, config);
		return response.data;
	},
	async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await apiClient.post<T>(url, data, config);
		return response.data;
	},
	async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await apiClient.put<T>(url, data, config);
		return response.data;
	},
	async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await apiClient.patch<T>(url, data, config);
		return response.data;
	},
	async delete<T>(url: string, config?: AxiosRequestConfig) {
		const response = await apiClient.delete<T>(url, config);
		return response.data;
	},
});

/**
 * Extract error message from Axios error
 */
export const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message;
	}
	return "An unknown error occurred";
};

/**
 * Check if error is an Axios error
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
	return (error as AxiosError).isAxiosError === true;
};

/**
 * Extract API error details from Axios error
 */
export const getApiError = (error: unknown): ApiError => {
	if (isAxiosError(error)) {
		const responseData = error.response?.data as ApiError | undefined;
		return {
			message: responseData?.message || error.message,
			code: error.code,
			details: responseData?.details,
		};
	}
	return {
		message: getErrorMessage(error),
	};
};
