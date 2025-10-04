import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";

export const Route = createFileRoute("/products")({
	component: Products,
});

function Products() {
	return (
		<DefaultLayout>
			<div className="rounded-sm border border-slate-200 bg-white px-5 pb-2.5 pt-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:px-7.5">
				<h4 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
					Product Management
				</h4>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{/* Product Card 1 */}
					<div className="rounded-sm border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						<div className="mb-3 flex h-48 items-center justify-center rounded-sm bg-slate-100 dark:bg-slate-700">
							<span className="text-4xl text-slate-400">📦</span>
						</div>
						<h5 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
							Product Name 1
						</h5>
						<p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
							This is a sample product description.
						</p>
						<div className="flex items-center justify-between">
							<span className="text-xl font-bold text-theme-primary">
								$99.99
							</span>
							<button
								className="rounded bg-theme-primary px-4 py-2 text-sm font-medium text-white hover:bg-theme-primary-600"
								type="button"
							>
								View Details
							</button>
						</div>
					</div>

					{/* Product Card 2 */}
					<div className="rounded-sm border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						<div className="mb-3 flex h-48 items-center justify-center rounded-sm bg-slate-100 dark:bg-slate-700">
							<span className="text-4xl text-slate-400">📦</span>
						</div>
						<h5 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
							Product Name 2
						</h5>
						<p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
							This is a sample product description.
						</p>
						<div className="flex items-center justify-between">
							<span className="text-xl font-bold text-theme-primary">
								$149.99
							</span>
							<button
								className="rounded bg-theme-primary px-4 py-2 text-sm font-medium text-white hover:bg-theme-primary-600"
								type="button"
							>
								View Details
							</button>
						</div>
					</div>

					{/* Product Card 3 */}
					<div className="rounded-sm border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
						<div className="mb-3 flex h-48 items-center justify-center rounded-sm bg-slate-100 dark:bg-slate-700">
							<span className="text-4xl text-slate-400">📦</span>
						</div>
						<h5 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
							Product Name 3
						</h5>
						<p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
							This is a sample product description.
						</p>
						<div className="flex items-center justify-between">
							<span className="text-xl font-bold text-theme-primary">
								$199.99
							</span>
							<button
								className="rounded bg-theme-primary px-4 py-2 text-sm font-medium text-white hover:bg-theme-primary-600"
								type="button"
							>
								View Details
							</button>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
