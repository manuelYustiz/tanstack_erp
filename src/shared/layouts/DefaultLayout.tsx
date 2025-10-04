import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="dark:bg-slate-900 dark:text-slate-100">
			{/* Page Wrapper */}
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				{/* Content Area */}
				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					{/* Header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

					{/* Main Content */}
					<main>
						<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
							{children}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
