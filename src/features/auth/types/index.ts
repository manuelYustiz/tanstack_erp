/**
 * Authentication credentials interface
 */
export interface LoginCredentials {
	username: string;
	password: string;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
	token: string;
	user: {
		id: string;
		username: string;
		email?: string;
	};
}
