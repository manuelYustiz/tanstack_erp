import type React from "react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AdminLayoutProps {
	children: React.ReactNode;
	title?: string;
}

export function AdminLayout({
	children,
	title = "Dashboard",
}: AdminLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { theme, mode } = useTheme();

	return (
		<div
			className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme} ${mode}`}
		>
			{/* Sidebar */}
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			{/* Main content */}
			<div className="lg:ml-64">
				{/* Header */}
				<Header title={title} onMenuClick={() => setSidebarOpen(true)} />

				{/* Page content */}
				<main className="p-6">{children}</main>
			</div>

			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							setSidebarOpen(false);
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close sidebar"
				/>
			)}
		</div>
	);
}
