import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { Button } from "../shared/components/ui/button";
import { Checkbox } from "../shared/components/ui/checkbox";
import { useTheme } from "../shared/hooks/useTheme";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { theme, mode, toggleTheme, toggleMode } = useTheme();
	const darkModeId = useId();

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
					Welcome to TanStack ERP
				</h1>

				<p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
					This is a modern ERP system built with Vite, React, TypeScript, Biome,
					and TanStack Router using screaming architecture. Now featuring
					Tailwind CSS and a custom theme system with dark/light mode support.
				</p>

				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
						Features:
					</h2>
					<ul className="space-y-2 text-gray-700 dark:text-gray-300">
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							⚡ Vite for fast development and builds
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							⚛️ React with TypeScript for type safety
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🧹 Biome for linting and formatting
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🚦 TanStack Router for type-safe routing
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							📁 Screaming architecture for feature-based organization
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🎨 Tailwind CSS for utility-first styling
						</li>
						<li className="flex items-center">
							<span className="w-2 h-2 bg-theme-primary rounded-full mr-3"></span>
							🌙 Multi-theme system with dark/light mode support
						</li>
					</ul>
				</div>

				{/* Theme Demo Section */}
				<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						Theme System Demo
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
						<div className="bg-theme-primary-100 p-4 rounded-lg border border-theme-primary-200">
							<h4 className="font-semibold text-theme-primary-800 mb-2">
								Primary Theme
							</h4>
							<p className="text-theme-primary-600">
								Current theme: {theme === "theme-1" ? "Blue" : "Green"}
							</p>
						</div>
						<div className="bg-theme-secondary-100 p-4 rounded-lg border border-theme-secondary-200">
							<h4 className="font-semibold text-theme-secondary-800 mb-2">
								Secondary Colors
							</h4>
							<p className="text-theme-secondary-600">
								Complementary colors for accents
							</p>
						</div>
						<div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
							<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
								Dark Mode
							</h4>
							<p className="text-gray-600 dark:text-gray-300">
								Current mode: {mode}
							</p>
						</div>
					</div>
				</div>

				{/* Theme Controls */}
				<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						Theme Controls
					</h3>
					<div className="flex flex-wrap gap-4 items-center">
						<Button onClick={toggleTheme} variant="default">
							Switch to {theme === "theme-1" ? "Green" : "Blue"} Theme
						</Button>

						<div className="flex items-center space-x-2">
							<Checkbox
								id={darkModeId}
								checked={mode === "dark"}
								onChange={toggleMode}
							/>
							<label
								htmlFor={darkModeId}
								className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
							>
								Enable Dark Mode
							</label>
						</div>

						<Button onClick={toggleMode} variant="outline">
							Toggle {mode === "light" ? "Dark" : "Light"} Mode
						</Button>
					</div>

					<div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-400">
						<strong>Current Configuration:</strong> {theme} theme in {mode} mode
					</div>
				</div>
			</div>
		</div>
	);
}
