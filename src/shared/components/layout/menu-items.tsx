import { 
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
} from "lucide-react";

export interface MenuItem {
	id: string;
	label: string;
	href: string;
	icon: React.ReactNode;
	children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
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