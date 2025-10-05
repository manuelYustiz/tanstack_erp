import { Link } from "@tanstack/react-router";
import {
	BarChart3,
	ChevronDown,
	ChevronRight,
	DollarSign,
	FileText,
	Home,
	Package,
	Settings,
	ShoppingCart,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../components/ui/collapsible";
import { cn } from "../utils/cn";

interface SidebarProps {
	className?: string;
}

interface MenuItem {
	label: string;
	icon: React.ReactNode;
	href?: string;
	subItems?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
	{
		label: "Dashboard",
		icon: <Home className="h-5 w-5" />,
		href: "/",
	},
	{
		label: "Users",
		icon: <Users className="h-5 w-5" />,
		href: "/users",
	},
	{
		label: "Products",
		icon: <Package className="h-5 w-5" />,
		subItems: [
			{ label: "All Products", href: "/products" },
			{ label: "Categories", href: "/products/categories" },
			{ label: "Inventory", href: "/products/inventory" },
		],
	},
	{
		label: "Orders",
		icon: <ShoppingCart className="h-5 w-5" />,
		subItems: [
			{ label: "All Orders", href: "/orders" },
			{ label: "Pending", href: "/orders/pending" },
			{ label: "Completed", href: "/orders/completed" },
		],
	},
	{
		label: "Finance",
		icon: <DollarSign className="h-5 w-5" />,
		subItems: [
			{ label: "Invoices", href: "/finance/invoices" },
			{ label: "Payments", href: "/finance/payments" },
			{ label: "Reports", href: "/finance/reports" },
		],
	},
	{
		label: "Reports",
		icon: <BarChart3 className="h-5 w-5" />,
		subItems: [
			{ label: "Sales", href: "/reports/sales" },
			{ label: "Analytics", href: "/reports/analytics" },
			{ label: "Exports", href: "/reports/exports" },
		],
	},
	{
		label: "Documents",
		icon: <FileText className="h-5 w-5" />,
		href: "/documents",
	},
	{
		label: "Settings",
		icon: <Settings className="h-5 w-5" />,
		href: "/settings",
	},
];

export function Sidebar({ className }: SidebarProps) {
	const [openMenus, setOpenMenus] = useState<string[]>([]);

	const toggleMenu = (label: string) => {
		setOpenMenus((prev) =>
			prev.includes(label)
				? prev.filter((item) => item !== label)
				: [...prev, label]
		);
	};

	return (
		<aside
			className={cn(
				"fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
				className
			)}
		>
			<div className="flex h-full flex-col gap-2 overflow-y-auto p-4">
				<nav className="flex flex-col gap-1">
					{menuItems.map((item) => {
						if (item.subItems) {
							const isOpen = openMenus.includes(item.label);
							return (
								<Collapsible
									key={item.label}
									open={isOpen}
									onOpenChange={() => toggleMenu(item.label)}
								>
									<CollapsibleTrigger asChild>
										<Button
											variant="ghost"
											className="w-full justify-start gap-2 font-normal"
										>
											{item.icon}
											<span className="flex-1 text-left">{item.label}</span>
											{isOpen ? (
												<ChevronDown className="h-4 w-4" />
											) : (
												<ChevronRight className="h-4 w-4" />
											)}
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent className="ml-4 mt-1 space-y-1">
										{item.subItems.map((subItem) => (
											<Link
												key={subItem.href}
												to={subItem.href}
												className="block"
											>
												<Button
													variant="ghost"
													className="w-full justify-start gap-2 pl-8 font-normal text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
												>
													{subItem.label}
												</Button>
											</Link>
										))}
									</CollapsibleContent>
								</Collapsible>
							);
						}

						return (
							<Link key={item.label} to={item.href || "#"} className="block">
								<Button
									variant="ghost"
									className="w-full justify-start gap-2 font-normal"
								>
									{item.icon}
									<span>{item.label}</span>
								</Button>
							</Link>
						);
					})}
				</nav>
			</div>
		</aside>
	);
}
