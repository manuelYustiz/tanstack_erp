import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";

export const Route = createFileRoute("/users")({
	component: Users,
});

function Users() {
	return (
		<DefaultLayout>
			<div className="rounded-sm border border-slate-200 bg-white px-5 pb-2.5 pt-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:px-7.5">
				<h4 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
					User Management
				</h4>

				<div className="overflow-x-auto">
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-slate-50 text-left dark:bg-slate-700">
								<th className="min-w-[220px] px-4 py-4 font-medium text-slate-900 dark:text-white xl:pl-11">
									Name
								</th>
								<th className="min-w-[150px] px-4 py-4 font-medium text-slate-900 dark:text-white">
									Email
								</th>
								<th className="min-w-[120px] px-4 py-4 font-medium text-slate-900 dark:text-white">
									Role
								</th>
								<th className="px-4 py-4 font-medium text-slate-900 dark:text-white">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-slate-200 dark:border-slate-700">
								<td className="px-4 py-5 pl-9 xl:pl-11">
									<h5 className="font-medium text-slate-900 dark:text-white">
										John Doe
									</h5>
								</td>
								<td className="px-4 py-5">
									<p className="text-slate-900 dark:text-white">
										john.doe@example.com
									</p>
								</td>
								<td className="px-4 py-5">
									<p className="inline-flex rounded-full bg-theme-primary/10 px-3 py-1 text-sm font-medium text-theme-primary">
										Admin
									</p>
								</td>
								<td className="px-4 py-5">
									<div className="flex items-center space-x-3.5">
										<button className="hover:text-theme-primary" type="button">
											Edit
										</button>
										<button className="hover:text-red-500" type="button">
											Delete
										</button>
									</div>
								</td>
							</tr>
							<tr className="border-b border-slate-200 dark:border-slate-700">
								<td className="px-4 py-5 pl-9 xl:pl-11">
									<h5 className="font-medium text-slate-900 dark:text-white">
										Jane Smith
									</h5>
								</td>
								<td className="px-4 py-5">
									<p className="text-slate-900 dark:text-white">
										jane.smith@example.com
									</p>
								</td>
								<td className="px-4 py-5">
									<p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 dark:bg-slate-700 dark:text-white">
										User
									</p>
								</td>
								<td className="px-4 py-5">
									<div className="flex items-center space-x-3.5">
										<button className="hover:text-theme-primary" type="button">
											Edit
										</button>
										<button className="hover:text-red-500" type="button">
											Delete
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</DefaultLayout>
	);
}
