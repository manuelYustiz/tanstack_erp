import { Link } from "@tanstack/react-router";
import { Home, LayoutDashboard, Package, Users, X } from "lucide-react";
import { cn } from "../utils/cn";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
	return (
		<>
			{/* Sidebar backdrop on mobile */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black/50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed left-0 top-0 z-30 flex h-screen w-72 flex-col overflow-y-hidden bg-slate-900 duration-300 ease-linear lg:static lg:translate-x-0",
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				{/* Sidebar Header */}
				<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
					<Link to="/" className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-primary">
							<span className="text-xl font-bold text-white">TE</span>
						</div>
						<span className="text-xl font-bold text-white">TanStack ERP</span>
					</Link>

					<button
						onClick={() => setSidebarOpen(false)}
						className="block lg:hidden"
						type="button"
					>
						<X className="h-6 w-6 text-white" />
					</button>
				</div>

				{/* Sidebar Menu */}
				<div className="flex flex-col overflow-y-auto duration-300 ease-linear">
					<nav className="px-4 py-4 lg:px-6">
						{/* Menu Group */}
						<div>
							<h3 className="mb-4 ml-4 text-sm font-semibold text-slate-400">
								MENU
							</h3>

							<ul className="mb-6 flex flex-col gap-1.5">
								{/* Dashboard */}
								<li>
									<Link
										to="/"
										className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-slate-300 duration-300 ease-in-out hover:bg-slate-800 hover:text-white [&.active]:bg-slate-800 [&.active]:text-white"
									>
										<Home className="h-5 w-5" />
										Home
									</Link>
								</li>

								{/* Dashboard Link */}
								<li>
									<Link
										to="/dashboard"
										className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-slate-300 duration-300 ease-in-out hover:bg-slate-800 hover:text-white [&.active]:bg-slate-800 [&.active]:text-white"
									>
										<LayoutDashboard className="h-5 w-5" />
										Dashboard
									</Link>
								</li>

								{/* Users Link */}
								<li>
									<Link
										to="/users"
										className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-slate-300 duration-300 ease-in-out hover:bg-slate-800 hover:text-white [&.active]:bg-slate-800 [&.active]:text-white"
									>
										<Users className="h-5 w-5" />
										Users
									</Link>
								</li>

								{/* Products Link */}
								<li>
									<Link
										to="/products"
										className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-slate-300 duration-300 ease-in-out hover:bg-slate-800 hover:text-white [&.active]:bg-slate-800 [&.active]:text-white"
									>
										<Package className="h-5 w-5" />
										Products
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</aside>
		</>
	);
}
