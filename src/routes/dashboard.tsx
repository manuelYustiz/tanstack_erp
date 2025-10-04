import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	return (
		<DefaultLayout>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
				{/* Card 1 */}
				<div className="rounded-sm border border-slate-200 bg-white px-7.5 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
					<div className="flex items-end justify-between">
						<div>
							<h4 className="text-title-md font-bold text-slate-900 dark:text-white">
								$3.456K
							</h4>
							<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
								Total views
							</span>
						</div>
					</div>
				</div>

				{/* Card 2 */}
				<div className="rounded-sm border border-slate-200 bg-white px-7.5 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
					<div className="flex items-end justify-between">
						<div>
							<h4 className="text-title-md font-bold text-slate-900 dark:text-white">
								$45.2K
							</h4>
							<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
								Total Profit
							</span>
						</div>
					</div>
				</div>

				{/* Card 3 */}
				<div className="rounded-sm border border-slate-200 bg-white px-7.5 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
					<div className="flex items-end justify-between">
						<div>
							<h4 className="text-title-md font-bold text-slate-900 dark:text-white">
								2.450
							</h4>
							<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
								Total Product
							</span>
						</div>
					</div>
				</div>

				{/* Card 4 */}
				<div className="rounded-sm border border-slate-200 bg-white px-7.5 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
					<div className="flex items-end justify-between">
						<div>
							<h4 className="text-title-md font-bold text-slate-900 dark:text-white">
								3.456
							</h4>
							<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
								Total Users
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content Area */}
			<div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
				{/* Main Content */}
				<div className="col-span-12 xl:col-span-8">
					<div className="rounded-sm border border-slate-200 bg-white px-5 pb-5 pt-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:px-7.5">
						<h4 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
							Dashboard Overview
						</h4>
						<p className="text-slate-600 dark:text-slate-400">
							Welcome to your TanStack ERP dashboard. Here you can view key
							metrics and manage your business operations.
						</p>
					</div>
				</div>

				{/* Sidebar Content */}
				<div className="col-span-12 xl:col-span-4">
					<div className="rounded-sm border border-slate-200 bg-white px-5 pb-5 pt-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
						<h4 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
							Recent Activity
						</h4>
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
									<span className="text-theme-primary font-semibold">UA</span>
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										User Added
									</p>
									<p className="text-xs text-slate-500">2 minutes ago</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
									<span className="text-theme-primary font-semibold">PA</span>
								</div>
								<div>
									<p className="text-sm font-medium text-slate-900 dark:text-white">
										Product Added
									</p>
									<p className="text-xs text-slate-500">5 minutes ago</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
