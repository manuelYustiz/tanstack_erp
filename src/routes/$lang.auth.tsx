import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../features/auth";

export const Route = createFileRoute("/$lang/auth")({
	component: AuthPage,
});
