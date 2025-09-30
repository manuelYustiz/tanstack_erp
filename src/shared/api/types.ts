import type { AxiosRequestConfig } from "axios";

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
	data: T;
	message?: string;
	success: boolean;
}

/**
 * API error response
 */
export interface ApiError {
	message: string;
	code?: string;
	details?: unknown;
}

/**
 * Generic API client interface
 */
export interface ApiClient {
	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
	put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
	patch<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T>;
	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
