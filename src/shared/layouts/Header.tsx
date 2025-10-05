import { LogOut, Menu, Moon, Settings, Sun, User } from "lucide-react";
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
	onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else if (theme === "light") {
			setTheme("system");
		} else {
			setTheme("dark");
		}
	};

	return (
		<header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
			<div className="flex h-16 items-center gap-4 px-4 sm:px-6">
				{/* Mobile menu button */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={onMenuClick}
				>
					<Menu className="h-5 w-5" />
				</Button>

				{/* Logo/Title */}
				<div className="flex items-center gap-2 font-semibold">
					<span className="text-xl">TanStack ERP</span>
				</div>

				{/* Spacer */}
				<div className="flex-1" />

				{/* Theme toggle */}
				<Button variant="ghost" size="icon" onClick={toggleTheme}>
					{theme === "dark" ? (
						<Moon className="h-5 w-5" />
					) : (
						<Sun className="h-5 w-5" />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>

				{/* User menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-10 w-10 rounded-full">
							<Avatar>
								<AvatarImage src="/avatar.png" alt="User" />
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">Admin User</p>
								<p className="text-xs leading-none text-gray-500 dark:text-gray-400">
									admin@example.com
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
