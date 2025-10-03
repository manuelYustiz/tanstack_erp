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
			// Handle login submission
			console.log("Login credentials:", value);
			// TODO: Implement actual authentication logic
			// This would typically call an API endpoint to authenticate the user
			alert(`Logging in with username: ${value.username}`);
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-3xl font-bold text-center">
						Login
					</CardTitle>
					<CardDescription className="text-center">
						Enter your username and password to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
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
								onChange: loginFormSchema.username.validators.onChange,
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
								onChange: loginFormSchema.password.validators.onChange,
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
				</CardContent>
			</Card>
		</div>
	);
};
