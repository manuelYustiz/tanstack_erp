import { Link, useLocation } from "@tanstack/react-router";
import {
	Home,
	LayoutDashboard,
	Menu,
	Moon,
	Package,
	Sun,
	Users,
} from "lucide-react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useIntlContext } from "../components/IntlProvider";
import { Button } from "../components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";
import { useTheme } from "../hooks/useTheme";
import { AVAILABLE_LOCALES, type SupportedLocale } from "../i18n";

interface MainLayoutProps {
	children: React.ReactNode;
}

const navigationItems = [
	{ to: "/", icon: Home, label: "nav.home" },
	{ to: "/dashboard", icon: LayoutDashboard, label: "nav.dashboard" },
	{ to: "/test", icon: Package, label: "nav.test" },
	{ to: "/users", icon: Users, label: "nav.users" },
];

export function MainLayout({ children }: MainLayoutProps) {
	const { mode, toggleMode } = useTheme();
	const { locale, setLocale } = useIntlContext();
	const location = useLocation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
				<div className="flex h-16 items-center px-4 gap-4">
					{/* Mobile menu button */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild className="menu-button-mobile">
							<Button variant="outline" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">
									<FormattedMessage id="nav.toggleMenu" />
								</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-64 p-0">
							<SheetHeader className="p-6 pb-4">
								<SheetTitle>
									<FormattedMessage id="app.title" />
								</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-1 px-3">
								{navigationItems.map((item) => {
									const Icon = item.icon;
									const isActive = location.pathname === item.to;
									return (
										<Link
											key={item.to}
											to={item.to}
											className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
												isActive
													? "bg-theme-primary text-white"
													: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
											}`}
											onClick={() => setIsMobileMenuOpen(false)}
										>
											<Icon className="h-4 w-4" />
											<FormattedMessage id={item.label} />
										</Link>
									);
								})}
							</nav>
						</SheetContent>
					</Sheet>

					{/* Logo */}
					<div className="flex items-center gap-2 font-semibold">
						<LayoutDashboard className="h-6 w-6 text-theme-primary" />
						<span className="text-gray-900 dark:text-white">
							<FormattedMessage id="app.title" />
						</span>
					</div>

					{/* Spacer */}
					<div className="flex-1" />

					{/* Header controls */}
					<div className="flex items-center gap-2">
						{/* Language switcher */}
						<select
							value={locale}
							onChange={(e) => setLocale(e.target.value as SupportedLocale)}
							className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
						>
							{AVAILABLE_LOCALES.map((lang) => (
								<option key={lang.code} value={lang.code}>
									{lang.name}
								</option>
							))}
						</select>

						{/* Theme toggle */}
						<Button variant="outline" size="icon" onClick={toggleMode}>
							{mode === "light" ? (
								<Moon className="h-4 w-4" />
							) : (
								<Sun className="h-4 w-4" />
							)}
							<span className="sr-only">
								<FormattedMessage id="nav.toggleTheme" />
							</span>
						</Button>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Sidebar - Desktop */}
				<aside className="sidebar-desktop w-64 flex-col border-r bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)]">
					<nav className="flex flex-col gap-1 p-4">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.to;
							return (
								<Link
									key={item.to}
									to={item.to}
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
										isActive
											? "bg-theme-primary text-white"
											: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
									}`}
								>
									<Icon className="h-4 w-4" />
									<FormattedMessage id={item.label} />
								</Link>
							);
						})}
					</nav>
				</aside>

				{/* Main content */}
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-6">{children}</div>
				</main>
			</div>
		</div>
	);
}
