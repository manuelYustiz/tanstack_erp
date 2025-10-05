import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../shared/layouts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shared/components/ui/card";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-gray-500 dark:text-gray-400">
						Welcome to your TanStack ERP admin panel
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">$45,231.89</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+20.1% from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Users</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+2350</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+180.1% from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Sales</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+12,234</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+19% from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Active Now</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+573</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+201 since last hour
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card className="col-span-4">
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent className="pl-2">
							<div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
								Chart placeholder
							</div>
						</CardContent>
					</Card>

					<Card className="col-span-3">
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>You made 265 sales this month.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-8">
								{[1, 2, 3, 4, 5].map((i) => (
									<div key={i} className="flex items-center">
										<div className="ml-4 space-y-1">
											<p className="text-sm font-medium leading-none">
												Customer {i}
											</p>
											<p className="text-sm text-gray-500 dark:text-gray-400">
												customer{i}@email.com
											</p>
										</div>
										<div className="ml-auto font-medium">
											+${(Math.random() * 1000).toFixed(2)}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</AdminLayout>
	);
}
