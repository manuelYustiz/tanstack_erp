import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bell, Menu, Palette, Sun, Moon, User, Settings, LogOut } from "lucide-react";

interface HeaderProps {
	title: string;
	onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
	const { theme, mode, toggleTheme, toggleMode } = useTheme();
	const [notificationsOpen, setNotificationsOpen] = useState(false);

	// Mock user data
	const currentUser = {
		name: "Admin Usuario",
		email: "admin@tanstack-erp.com",
		initials: "AU",
		role: "Administrador",
	};

	// Mock notifications
	const notifications = [
		{ id: 1, message: "Nueva orden recibida #1234", time: "5 min", unread: true },
		{ id: 2, message: "Stock bajo en Producto XYZ", time: "15 min", unread: true },
		{ id: 3, message: "Reporte mensual generado", time: "1 hora", unread: false },
	];

	const unreadCount = notifications.filter((n) => n.unread).length;

	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
			<div className="flex h-16 items-center justify-between px-6">
				{/* Left side */}
				<div className="flex items-center space-x-4">
					{/* Mobile menu button */}
					<Button
						variant="ghost"
						size="icon"
						onClick={onMenuClick}
						className="lg:hidden"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Abrir menú</span>
					</Button>

					{/* Page title */}
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
						{title}
					</h2>
				</div>

				{/* Right side */}
				<div className="flex items-center space-x-4">
					{/* Theme controls - Desktop only */}
					<div className="hidden md:flex items-center space-x-2">
						<Button onClick={toggleTheme} variant="ghost" size="sm">
							<Palette className="h-4 w-4 mr-1" />
							{theme === "theme-1" ? "Azul" : "Verde"}
						</Button>
						<Button onClick={toggleMode} variant="ghost" size="sm">
							{mode === "dark" ? (
								<Sun className="h-4 w-4" />
							) : (
								<Moon className="h-4 w-4" />
							)}
						</Button>
					</div>

					{/* Notifications */}
					<DropdownMenu
						open={notificationsOpen}
						onOpenChange={setNotificationsOpen}
					>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								{unreadCount > 0 && (
									<Badge
										variant="destructive"
										className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
									>
										{unreadCount}
									</Badge>
								)}
								<span className="sr-only">Notificaciones</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80">
							<DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<div className="max-h-64 overflow-y-auto">
								{notifications.map((notification) => (
									<DropdownMenuItem
										key={notification.id}
										className={`flex flex-col items-start p-4 ${
											notification.unread
												? "bg-blue-50 dark:bg-blue-900/20"
												: ""
										}`}
									>
										<p className="text-sm font-medium">
											{notification.message}
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Hace {notification.time}
										</p>
									</DropdownMenuItem>
								))}
							</div>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-center">
								Ver todas las notificaciones
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* User menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-10 w-auto px-2">
								<Avatar className="h-8 w-8">
									<AvatarFallback className="bg-theme-primary text-white text-sm">
										{currentUser.initials}
									</AvatarFallback>
								</Avatar>
								<div className="hidden md:block ml-2 text-left">
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{currentUser.name}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{currentUser.role}
									</p>
								</div>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										{currentUser.name}
									</p>
									<p className="text-xs leading-none text-gray-500 dark:text-gray-400">
										{currentUser.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Mi Perfil</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Configuración</span>
							</DropdownMenuItem>
							{/* Mobile theme controls */}
							<div className="md:hidden">
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={toggleTheme}>
									<Palette className="mr-2 h-4 w-4" />
									<span>
										Tema: {theme === "theme-1" ? "Azul" : "Verde"}
									</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={toggleMode}>
									{mode === "dark" ? (
										<Sun className="mr-2 h-4 w-4" />
									) : (
										<Moon className="mr-2 h-4 w-4" />
									)}
									<span>
										{mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
									</span>
								</DropdownMenuItem>
							</div>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-600">
								<LogOut className="mr-2 h-4 w-4" />
								<span>Cerrar Sesión</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}