import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { 
	LayoutDashboard, 
	Users, 
	Package, 
	DollarSign, 
	Settings,
	FileText,
	Shield,
	FolderOpen,
	TrendingUp,
	ShoppingCart,
	Receipt,
	BarChart3,
	Wrench,
	ChevronRight,
	X
} from "lucide-react";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

interface MenuItem {
	id: string;
	label: string;
	href: string;
	icon: React.ReactNode;
	children?: MenuItem[];
}

const menuItems: MenuItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		href: '/admin',
		icon: <LayoutDashboard className="h-5 w-5" />,
	},
	{
		id: 'users',
		label: 'Gestión de Usuarios',
		href: '/admin/users',
		icon: <Users className="h-5 w-5" />,
		children: [
			{ 
				id: 'users-list', 
				label: 'Lista de Usuarios', 
				href: '/admin/users', 
				icon: <FileText className="h-4 w-4" /> 
			},
			{ 
				id: 'users-roles', 
				label: 'Roles y Permisos', 
				href: '/admin/users/roles', 
				icon: <Shield className="h-4 w-4" /> 
			},
		],
	},
	{
		id: 'products',
		label: 'Inventario',
		href: '/admin/products',
		icon: <Package className="h-5 w-5" />,
		children: [
			{ 
				id: 'products-list', 
				label: 'Productos', 
				href: '/admin/products', 
				icon: <Package className="h-4 w-4" /> 
			},
			{ 
				id: 'categories', 
				label: 'Categorías', 
				href: '/admin/products/categories', 
				icon: <FolderOpen className="h-4 w-4" /> 
			},
			{ 
				id: 'stock', 
				label: 'Control de Stock', 
				href: '/admin/products/stock', 
				icon: <TrendingUp className="h-4 w-4" /> 
			},
		],
	},
	{
		id: 'sales',
		label: 'Ventas',
		href: '/admin/sales',
		icon: <DollarSign className="h-5 w-5" />,
		children: [
			{ 
				id: 'orders', 
				label: 'Órdenes', 
				href: '/admin/sales/orders', 
				icon: <ShoppingCart className="h-4 w-4" /> 
			},
			{ 
				id: 'invoices', 
				label: 'Facturas', 
				href: '/admin/sales/invoices', 
				icon: <Receipt className="h-4 w-4" /> 
			},
			{ 
				id: 'reports', 
				label: 'Reportes', 
				href: '/admin/sales/reports', 
				icon: <BarChart3 className="h-4 w-4" /> 
			},
		],
	},
	{
		id: 'settings',
		label: 'Configuración',
		href: '/admin/settings',
		icon: <Settings className="h-5 w-5" />,
		children: [
			{ 
				id: 'general', 
				label: 'General', 
				href: '/admin/settings/general', 
				icon: <Wrench className="h-4 w-4" /> 
			},
			{ 
				id: 'security', 
				label: 'Seguridad', 
				href: '/admin/settings/security', 
				icon: <Shield className="h-4 w-4" /> 
			},
		],
	},
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
	const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

	const toggleExpand = (itemId: string) => {
		setExpandedItems(prev => 
			prev.includes(itemId) 
				? prev.filter(id => id !== itemId)
				: [...prev, itemId]
		);
	};

	const renderMenuItem = (item: MenuItem, level = 0) => {
		const hasChildren = item.children && item.children.length > 0;
		const isExpanded = expandedItems.includes(item.id);
		const paddingClass = level === 0 ? 'pl-4 pr-4' : 'pl-8 pr-4';

		if (hasChildren) {
			return (
				<Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleExpand(item.id)}>
					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							className={`w-full justify-between ${paddingClass} py-3 h-auto font-medium text-gray-700 dark:text-gray-300 hover:bg-theme-primary-50 dark:hover:bg-gray-700`}
						>
							<div className="flex items-center space-x-3">
								{item.icon}
								<span>{item.label}</span>
							</div>
							<ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="bg-gray-50 dark:bg-gray-800">
						{item.children?.map(child => renderMenuItem(child, level + 1))}
					</CollapsibleContent>
				</Collapsible>
			);
		}

		return (
			<Link
				key={item.id}
				to={item.href}
				className={`flex items-center space-x-3 ${paddingClass} py-3 text-gray-700 dark:text-gray-300 hover:bg-theme-primary-50 dark:hover:bg-gray-700 transition-colors rounded-md mx-2`}
				onClick={onClose}
			>
				{item.icon}
				<span className="font-medium">{item.label}</span>
			</Link>
		);
	};

	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			{/* Logo */}
			<div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
				<h1 className="text-xl font-bold text-theme-primary">
					TanStack ERP
				</h1>
				<Button
					variant="ghost"
					size="icon"
					onClick={onClose}
					className="lg:hidden"
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Cerrar menú</span>
				</Button>
			</div>
			
			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto py-4">
				<div className="space-y-1">
					{menuItems.map(item => renderMenuItem(item))}
				</div>
			</nav>

			{/* Footer */}
			<div className="border-t border-gray-200 dark:border-gray-700 p-4">
				<p className="text-xs text-gray-500 dark:text-gray-400 text-center">
					© 2024 TanStack ERP
				</p>
			</div>
		</div>
	);

	return (
		<>
			{/* Desktop sidebar */}
			<div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64">
				<div className="flex grow flex-col overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
					<SidebarContent />
				</div>
			</div>

			{/* Mobile sidebar */}
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side="left" className="w-64 p-0">
					<SidebarContent />
				</SheetContent>
			</Sheet>
		</>
	);
}