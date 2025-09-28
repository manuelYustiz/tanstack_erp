import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/button";

interface HeaderProps {
	title: string;
	onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
	const { theme, mode, toggleTheme, toggleMode } = useTheme();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [notificationsOpen, setNotificationsOpen] = useState(false);

	// Mock user data
	const currentUser = {
		name: "Admin Usuario",
		email: "admin@tanstack-erp.com",
		avatar: "👤",
		role: "Administrador",
	};

	// Mock notifications
	const notifications = [
		{
			id: 1,
			message: "Nueva orden recibida #1234",
			time: "5 min",
			unread: true,
		},
		{
			id: 2,
			message: "Stock bajo en Producto XYZ",
			time: "15 min",
			unread: true,
		},
		{
			id: 3,
			message: "Reporte mensual generado",
			time: "1 hora",
			unread: false,
		},
	];

	const unreadCount = notifications.filter((n) => n.unread).length;

	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
			<div className="flex h-16 items-center justify-between px-6">
				{/* Left side */}
				<div className="flex items-center space-x-4">
					{/* Mobile menu button */}
					<button
						type="button"
						onClick={onMenuClick}
						className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						<span className="text-xl">☰</span>
					</button>

					{/* Page title */}
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
						{title}
					</h2>
				</div>

				{/* Right side */}
				<div className="flex items-center space-x-4">
					{/* Theme controls */}
					<div className="hidden md:flex items-center space-x-2">
						<Button
							onClick={toggleTheme}
							variant="ghost"
							size="sm"
							className="text-xs"
						>
							{theme === "theme-1" ? "🔵" : "🟢"} Tema
						</Button>
						<Button
							onClick={toggleMode}
							variant="ghost"
							size="sm"
							className="text-xs"
						>
							{mode === "dark" ? "☀️" : "🌙"}
						</Button>
					</div>

					{/* Notifications */}
					<div className="relative">
						<button
							type="button"
							onClick={() => setNotificationsOpen(!notificationsOpen)}
							className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							<span className="text-xl">🔔</span>
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
									{unreadCount}
								</span>
							)}
						</button>

						{/* Notifications dropdown */}
						{notificationsOpen && (
							<div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
								<div className="p-4 border-b border-gray-200 dark:border-gray-700">
									<h3 className="font-semibold text-gray-900 dark:text-white">
										Notificaciones
									</h3>
								</div>
								<div className="max-h-64 overflow-y-auto">
									{notifications.map((notification) => (
										<div
											key={notification.id}
											className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
												notification.unread
													? "bg-blue-50 dark:bg-blue-900/20"
													: ""
											}`}
										>
											<p className="text-sm text-gray-900 dark:text-white">
												{notification.message}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
												Hace {notification.time}
											</p>
										</div>
									))}
								</div>
								<div className="p-4">
									<Button variant="ghost" size="sm" className="w-full">
										Ver todas las notificaciones
									</Button>
								</div>
							</div>
						)}
					</div>

					{/* User menu */}
					<div className="relative">
						<button
							type="button"
							onClick={() => setUserMenuOpen(!userMenuOpen)}
							className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
						>
							<span className="text-2xl">{currentUser.avatar}</span>
							<div className="hidden md:block text-left">
								<p className="text-sm font-medium">{currentUser.name}</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									{currentUser.role}
								</p>
							</div>
							<span className="text-xs">▼</span>
						</button>

						{/* User dropdown */}
						{userMenuOpen && (
							<div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
								<div className="p-4 border-b border-gray-200 dark:border-gray-700">
									<p className="font-medium text-gray-900 dark:text-white">
										{currentUser.name}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{currentUser.email}
									</p>
								</div>
								<div className="p-2">
									<button type="button" className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
										👤 Mi Perfil
									</button>
									<button type="button" className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
										⚙️ Configuración
									</button>
									<div className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
										<button
											type="button"
											onClick={toggleTheme}
											className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
										>
											{theme === "theme-1" ? "🔵" : "🟢"} Cambiar Tema
										</button>
										<button
											type="button"
											onClick={toggleMode}
											className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
										>
											{mode === "dark" ? "☀️" : "🌙"}{" "}
											{mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
										</button>
									</div>
									<div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
										<button type="button" className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
											🚪 Cerrar Sesión
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Close dropdowns when clicking outside */}
			{(userMenuOpen || notificationsOpen) && (
				<div
					className="fixed inset-0 z-20"
					onClick={() => {
						setUserMenuOpen(false);
						setNotificationsOpen(false);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							setUserMenuOpen(false);
							setNotificationsOpen(false);
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close menus"
				/>
			)}
		</header>
	);
}
