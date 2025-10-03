import type { LoginCredentials } from "../types";

/**
 * Validation schema for login form using TanStack Form
 * This file contains the validation rules for the authentication form
 */

export const loginFormSchema = {
	username: {
		defaultValue: "",
		validators: {
			onChange: ({ value }: { value: string }) => {
				if (!value) {
					return "Username is required";
				}
				if (value.length < 3) {
					return "Username must be at least 3 characters";
				}
				return undefined;
			},
		},
	},
	password: {
		defaultValue: "",
		validators: {
			onChange: ({ value }: { value: string }) => {
				if (!value) {
					return "Password is required";
				}
				if (value.length < 6) {
					return "Password must be at least 6 characters";
				}
				return undefined;
			},
		},
	},
} as const;

/**
 * Initial values for the login form
 */
export const initialLoginValues: LoginCredentials = {
	username: "",
	password: "",
};
