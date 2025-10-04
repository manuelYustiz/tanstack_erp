import { Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface HeaderProps {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
	const { theme, setTheme } = useTheme();

	return (
		<header className="sticky top-0 z-10 flex w-full bg-white drop-shadow-sm dark:bg-slate-900 dark:drop-shadow-none">
			<div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
				{/* Left side - Hamburger menu */}
				<div className="flex items-center gap-2 sm:gap-4 lg:hidden">
					<button
						aria-controls="sidebar"
						onClick={(e) => {
							e.stopPropagation();
							setSidebarOpen(!sidebarOpen);
						}}
						className="z-40 block rounded-sm border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:hidden"
						type="button"
					>
						<Menu className="h-5 w-5" />
					</button>
				</div>

				{/* Right side - Theme toggle and user menu */}
				<div className="flex items-center gap-3 2xl:gap-7">
					<ul className="flex items-center gap-2 2xl:gap-4">
						{/* Dark Mode Toggle */}
						<li>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
								className="rounded-full"
							>
								{theme === "dark" ? (
									<Sun className="h-5 w-5" />
								) : (
									<Moon className="h-5 w-5" />
								)}
								<span className="sr-only">Toggle theme</span>
							</Button>
						</li>
					</ul>

					{/* User Area */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="flex items-center gap-4" type="button">
								<span className="hidden text-right lg:block">
									<span className="block text-sm font-medium text-slate-900 dark:text-white">
										Admin User
									</span>
									<span className="block text-xs text-slate-500">
										Administrator
									</span>
								</span>

								<Avatar className="h-12 w-12">
									<AvatarImage src="" alt="User" />
									<AvatarFallback className="bg-theme-primary text-white">
										<User className="h-5 w-5" />
									</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Log out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
