import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Badge } from "../shared/components/ui/badge";
import { Button } from "../shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../shared/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../shared/components/ui/collapsible";
import { Separator } from "../shared/components/ui/separator";

export const Route = createFileRoute("/test")({
	component: TestPage,
});

function TestPage() {
	const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
					<FormattedMessage id="test.title" />
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400">
					<FormattedMessage id="test.description" />
				</p>
			</div>

			<Separator />

			{/* Buttons Section */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					<FormattedMessage id="test.button.section" />
				</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="default">Default Button</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<Button size="sm">Small</Button>
					<Button size="lg">Large</Button>
					<Button size="icon">🎨</Button>
				</div>
			</section>

			<Separator />

			{/* Cards Section */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					<FormattedMessage id="test.card.section" />
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Card Title 1</CardTitle>
							<CardDescription>This is a card description</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 dark:text-gray-400">
								Card content goes here. You can put any content inside a card
								component.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Cancel</Button>
							<Button>Submit</Button>
						</CardFooter>
					</Card>

					<Card className="bg-theme-primary-50 dark:bg-theme-primary-950 border-theme-primary-200 dark:border-theme-primary-800">
						<CardHeader>
							<CardTitle className="text-theme-primary-800 dark:text-theme-primary-200">
								Themed Card
							</CardTitle>
							<CardDescription>With custom theme colors</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-theme-primary-700 dark:text-theme-primary-300">
								This card uses theme colors that adapt to your selected theme.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Card Title 3</CardTitle>
							<CardDescription>Another example card</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600 dark:text-gray-400">
								Cards are great for organizing information in a structured way.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* Badges Section */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					<FormattedMessage id="test.badge.section" />
				</h2>
				<div className="flex flex-wrap gap-3">
					<Badge>Default Badge</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="destructive">Destructive</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge className="bg-theme-primary text-white">Themed Badge</Badge>
					<Badge className="bg-green-500 text-white">Success</Badge>
					<Badge className="bg-yellow-500 text-black">Warning</Badge>
					<Badge className="bg-blue-500 text-white">Info</Badge>
				</div>
			</section>

			<Separator />

			{/* Collapsible Section */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					<FormattedMessage id="test.collapsible.section" />
				</h2>
				<Collapsible
					open={isCollapsibleOpen}
					onOpenChange={setIsCollapsibleOpen}
					className="w-full max-w-2xl space-y-2"
				>
					<div className="flex items-center justify-between space-x-4 px-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Collapsible Component
						</h3>
						<CollapsibleTrigger asChild>
							<Button variant="ghost" size="sm">
								<FormattedMessage id="test.collapsible.trigger" />
								<span className="ml-2">{isCollapsibleOpen ? "▲" : "▼"}</span>
							</Button>
						</CollapsibleTrigger>
					</div>
					<CollapsibleContent className="space-y-2">
						<div className="rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-sm">
							<FormattedMessage id="test.collapsible.content" />
						</div>
						<div className="rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-sm">
							Additional content can be added here. The collapsible component is
							perfect for showing/hiding content dynamically.
						</div>
					</CollapsibleContent>
				</Collapsible>
			</section>

			<Separator />

			{/* Complex Layout Example */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					Complex Layout Example
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle>Main Content Area</CardTitle>
							<CardDescription>
								A larger content area for primary information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-4">
								<Badge variant="secondary">Status: Active</Badge>
								<Badge className="bg-green-500 text-white">Verified</Badge>
							</div>
							<p className="text-gray-600 dark:text-gray-400">
								This demonstrates how components can be combined to create more
								complex UI layouts. The grid system adapts to different screen
								sizes.
							</p>
							<div className="flex gap-2">
								<Button size="sm" variant="outline">
									Edit
								</Button>
								<Button size="sm">Save</Button>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Sidebar Info</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Additional information or actions can go in a sidebar.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Quick Stats</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Total Items
									</span>
									<Badge>42</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Active
									</span>
									<Badge className="bg-green-500 text-white">38</Badge>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Pending
									</span>
									<Badge className="bg-yellow-500 text-black">4</Badge>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
