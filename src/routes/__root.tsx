import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtools } from "@tanstack/react-form-devtools";
import {
	ReactQueryDevtools,
	ReactQueryDevtoolsPanel,
} from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import {
	TanStackRouterDevtools,
	TanStackRouterDevtoolsPanel,
} from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/dashboard" className="[&.active]:font-bold">
					Dashboard
				</Link>
				<Link to="/users" className="[&.active]:font-bold">
					Users
				</Link>
				<Link to="/products" className="[&.active]:font-bold">
					Products
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
			<FormDevtools />
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
				]}
			/>
		</>
	),
});
