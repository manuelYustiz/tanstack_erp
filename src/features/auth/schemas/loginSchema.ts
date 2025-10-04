import { z } from "zod";

/**
 * Validation schema for login form using Zod
 * This file contains the validation rules for the authentication form
 */
export const loginFormSchema = z.object({
	username: z
		.string()
		.min(1, "Username is required")
		.min(3, "Username must be at least 3 characters"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
});

/**
 * Type inference from Zod schema
 */
export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * Initial values for the login form
 */
export const initialLoginValues: LoginFormData = {
	username: "",
	password: "",
};
