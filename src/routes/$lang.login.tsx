import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/login")({
	component: Login,
});

function Login() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Login</h1>
			</div>
		</div>
	);
}
