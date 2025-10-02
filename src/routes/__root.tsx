import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/router-devtools";
import { NotFound } from "../shared/components/NotFound";
import { MainLayout } from "../shared/layouts/MainLayout";

export const Route = createRootRoute({
	component: () => (
		<>
			<MainLayout>
				<Outlet />
			</MainLayout>
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
