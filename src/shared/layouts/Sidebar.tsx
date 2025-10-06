import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { INVENTORY_MENU } from "../../modules/inventory/constants/inventory-menu.constants";
import { Button } from "../components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../components/ui/collapsible";
import { cn } from "../utils";

interface SidebarProps {
	className?: string;
}

export function Sidebar({ className }: SidebarProps) {
	const [openMenus, setOpenMenus] = useState<string[]>([]);

	const toggleMenu = (id: string) => {
		setOpenMenus((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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
					{INVENTORY_MENU.map((item) => {
						if (item.children) {
							const isOpen = openMenus.includes(item.id);
							return (
								<Collapsible
									key={item.id}
									open={isOpen}
									onOpenChange={() => toggleMenu(item.id)}
								>
									<CollapsibleTrigger asChild>
										<Button
											variant="ghost"
											className="w-full justify-start gap-2 font-normal"
										>
											{item.icon && (
												<span className="text-lg">{item.icon}</span>
											)}
											<span className="flex-1 text-left">{item.label}</span>
											{isOpen ? (
												<ChevronDown className="h-4 w-4" />
											) : (
												<ChevronRight className="h-4 w-4" />
											)}
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent className="ml-4 mt-1 space-y-1">
										{item.children.map((subItem) => (
											<Link
												key={subItem.id}
												to={subItem.path || "#"}
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
							<Link key={item.id} to={item.path || "#"} className="block">
								<Button
									variant="ghost"
									className="w-full justify-start gap-2 font-normal"
								>
									{item.icon && <span className="text-lg">{item.icon}</span>}
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
