import { useForm } from "@tanstack/react-form";
import { Button } from "../../../shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../shared/components/ui/card";
import { Input } from "../../../shared/components/ui/input";
import { Label } from "../../../shared/components/ui/label";
import { loginFormSchema } from "../schemas/loginSchema";

export const AuthPage = () => {
	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			// Validate with Zod schema before submission
			const result = loginFormSchema.safeParse(value);
			if (!result.success) {
				console.error("Validation failed:", result.error);
				return;
			}

			// Handle login submission
			console.log("Login credentials:", result.data);
			// TODO: Implement actual authentication logic
			// This would typically call an API endpoint to authenticate the user
			alert(`Logging in with username: ${result.data.username}`);
		},
	});

	return (

    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-4"
					>
						<form.Field
							name="username"
							validators={{
								onChange: ({ value }) => {
									const result =
										loginFormSchema.shape.username.safeParse(value);
									return result.success
										? undefined
										: result.error.issues[0]?.message;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										type="text"
										placeholder="Enter your username"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										autoComplete="username"
									/>
									{field.state.meta.errors.length > 0 && (
										<p className="text-sm text-red-500">
											{field.state.meta.errors[0]}
										</p>
									)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="password"
							validators={{
								onChange: ({ value }) => {
									const result =
										loginFormSchema.shape.password.safeParse(value);
									return result.success
										? undefined
										: result.error.issues[0]?.message;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Enter your password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										autoComplete="current-password"
									/>
									{field.state.meta.errors.length > 0 && (
										<p className="text-sm text-red-500">
											{field.state.meta.errors[0]}
										</p>
									)}
								</div>
							)}
						</form.Field>

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									className="w-full"
									disabled={!canSubmit || isSubmitting}
								>
									{isSubmitting ? "Logging in..." : "Login"}
								</Button>
							)}
						</form.Subscribe>
					</form>
      </div>
    </div>

	);
};
