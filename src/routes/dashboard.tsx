import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	return (
		<div className="p-2">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="bg-blue-100 p-4 rounded-lg">
					<h3 className="font-semibold text-blue-800">Total Users</h3>
					<p className="text-2xl font-bold text-blue-600">1,234</p>
				</div>
				<div className="bg-green-100 p-4 rounded-lg">
					<h3 className="font-semibold text-green-800">Total Products</h3>
					<p className="text-2xl font-bold text-green-600">567</p>
				</div>
				<div className="bg-purple-100 p-4 rounded-lg">
					<h3 className="font-semibold text-purple-800">Revenue</h3>
					<p className="text-2xl font-bold text-purple-600">$89,123</p>
				</div>
			</div>
		</div>
	);
}
