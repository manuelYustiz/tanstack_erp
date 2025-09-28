import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

interface MenuItem {
	id: string;
	label: string;
	href: string;
	icon: string;
	children?: MenuItem[];
}

const menuItems: MenuItem[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		href: "/admin",
		icon: "📊",
	},
	{
		id: "users",
		label: "Gestión de Usuarios",
		href: "/admin/users",
		icon: "👥",
		children: [
			{
				id: "users-list",
				label: "Lista de Usuarios",
				href: "/admin/users",
				icon: "📋",
			},
			{
				id: "users-roles",
				label: "Roles y Permisos",
				href: "/admin/users/roles",
				icon: "🔐",
			},
		],
	},
	{
		id: "products",
		label: "Inventario",
		href: "/admin/products",
		icon: "📦",
		children: [
			{
				id: "products-list",
				label: "Productos",
				href: "/admin/products",
				icon: "🏷️",
			},
			{
				id: "categories",
				label: "Categorías",
				href: "/admin/products/categories",
				icon: "📁",
			},
			{
				id: "stock",
				label: "Control de Stock",
				href: "/admin/products/stock",
				icon: "📈",
			},
		],
	},
	{
		id: "sales",
		label: "Ventas",
		href: "/admin/sales",
		icon: "💰",
		children: [
			{
				id: "orders",
				label: "Órdenes",
				href: "/admin/sales/orders",
				icon: "🛒",
			},
			{
				id: "invoices",
				label: "Facturas",
				href: "/admin/sales/invoices",
				icon: "📄",
			},
			{
				id: "reports",
				label: "Reportes",
				href: "/admin/sales/reports",
				icon: "📊",
			},
		],
	},
	{
		id: "settings",
		label: "Configuración",
		href: "/admin/settings",
		icon: "⚙️",
		children: [
			{
				id: "general",
				label: "General",
				href: "/admin/settings/general",
				icon: "🔧",
			},
			{
				id: "security",
				label: "Seguridad",
				href: "/admin/settings/security",
				icon: "🛡️",
			},
		],
	},
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
	const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"]);

	const toggleExpand = (itemId: string) => {
		setExpandedItems((prev) =>
			prev.includes(itemId)
				? prev.filter((id) => id !== itemId)
				: [...prev, itemId]
		);
	};

	const renderMenuItem = (item: MenuItem, level = 0) => {
		const hasChildren = item.children && item.children.length > 0;
		const isExpanded = expandedItems.includes(item.id);
		const paddingLeft = level === 0 ? "pl-4" : "pl-8";

		return (
			<div key={item.id}>
				{hasChildren ? (
					<button
						type="button"
						onClick={() => toggleExpand(item.id)}
						className={`w-full flex items-center justify-between ${paddingLeft} pr-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-theme-primary-50 dark:hover:bg-gray-700 transition-colors`}
					>
						<div className="flex items-center space-x-3">
							<span className="text-lg">{item.icon}</span>
							<span className="font-medium">{item.label}</span>
						</div>
						<span
							className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`}
						>
							▶
						</span>
					</button>
				) : (
					<Link
						to={item.href}
						className={`flex items-center space-x-3 ${paddingLeft} pr-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-theme-primary-50 dark:hover:bg-gray-700 transition-colors`}
						onClick={onClose}
					>
						<span className="text-lg">{item.icon}</span>
						<span className="font-medium">{item.label}</span>
					</Link>
				)}

				{hasChildren && isExpanded && (
					<div className="bg-gray-50 dark:bg-gray-800">
						{item.children?.map((child) => renderMenuItem(child, level + 1))}
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			{/* Desktop sidebar */}
			<div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
					{/* Logo */}
					<div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200 dark:border-gray-700">
						<h1 className="text-xl font-bold text-theme-primary">
							TanStack ERP
						</h1>
					</div>

					{/* Navigation */}
					<nav className="flex flex-1 flex-col">
						<ul className="flex flex-1 flex-col gap-y-1">
							{menuItems.map((item) => (
								<li key={item.id}>{renderMenuItem(item)}</li>
							))}
						</ul>
					</nav>
				</div>
			</div>

			{/* Mobile sidebar */}
			<div
				className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
					{/* Logo */}
					<div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
						<h1 className="text-xl font-bold text-theme-primary">
							TanStack ERP
						</h1>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							✕
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex flex-1 flex-col">
						<ul className="flex flex-1 flex-col gap-y-1">
							{menuItems.map((item) => (
								<li key={item.id}>{renderMenuItem(item)}</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
