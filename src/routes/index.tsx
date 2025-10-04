import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<DefaultLayout>
			<div className="rounded-sm border border-slate-200 bg-white px-5 pb-5 pt-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:px-7.5">
				<h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
					Welcome to TanStack ERP
				</h1>
				<p className="mb-4 text-slate-600 dark:text-slate-400">
					This is a modern ERP system built with TanStack Router, React Query,
					and Tailwind CSS.
				</p>
				<p className="text-slate-600 dark:text-slate-400">
					Use the sidebar navigation to explore different sections of the
					application.
				</p>
			</div>
		</DefaultLayout>
	);
}
