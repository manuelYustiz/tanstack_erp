import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/router-devtools";
import { NotFound } from "../shared/components/NotFound";
import { ThemeProvider } from "../shared/components/ThemeProvider";

export const Route = createRootRoute({
	component: () => (
		<>
			<ThemeProvider defaultTheme="system" storageKey="tanstack-erp-ui-theme">
				<Outlet />
			</ThemeProvider>
			<TanStackDevtools
				plugins={[
					{
						name: "TanStack Query",
						render: <ReactQueryDevtoolsPanel />,
					},
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					FormDevtoolsPlugin(),
				]}
			/>
		</>
	),
	notFoundComponent: NotFound,
});
