import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Sheet, SheetContent } from "../components/ui/sheet";

interface AdminLayoutProps {
	children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header onMenuClick={() => setSidebarOpen(true)} />

			{/* Desktop Sidebar */}
			<div className="hidden md:block">
				<Sidebar />
			</div>

			{/* Mobile Sidebar */}
			<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
				<SheetContent side="left" className="p-0 w-64">
					<div className="pt-4">
						<Sidebar />
					</div>
				</SheetContent>
			</Sheet>

			{/* Main Content */}
			<main className="md:pl-64 pt-16">
				<div className="container mx-auto p-6">{children}</div>
			</main>
		</div>
	);
}
