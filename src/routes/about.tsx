import { createFileRoute } from "@tanstack/react-router";
import { FormattedMessage } from "react-intl";
import { useMeta } from "../shared/hooks/useMeta";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	// Set dynamic meta tags for the about page
	useMeta({
		title: "About Us - TanStack ERP",
		description:
			"Learn more about TanStack ERP, a modern ERP system built with cutting-edge technologies.",
		keywords:
			"About TanStack ERP, ERP System, Enterprise Resource Planning, Modern ERP",
		author: "TanStack ERP Team",
		// Open Graph tags (Facebook, LinkedIn, Discord)
		ogTitle: "About TanStack ERP",
		ogDescription:
			"Learn more about TanStack ERP, a modern ERP system built with cutting-edge technologies.",
		ogImage: "https://tanstack-erp.com/og-about.jpg",
		ogUrl: window.location.href,
		ogType: "website",
		ogSiteName: "TanStack ERP",
		// Twitter Card tags
		twitterCard: "summary_large_image",
		twitterTitle: "About TanStack ERP",
		twitterDescription:
			"Learn more about TanStack ERP, a modern ERP system built with cutting-edge technologies.",
		twitterImage: "https://tanstack-erp.com/twitter-about.jpg",
	});

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
					<FormattedMessage id="about.title" defaultMessage="About Us" />
				</h1>

				<p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
					<FormattedMessage
						id="about.description"
						defaultMessage="TanStack ERP is a modern enterprise resource planning system built with the latest web technologies."
					/>
				</p>

				<div className="mt-8">
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
						<FormattedMessage
							id="about.mission.title"
							defaultMessage="Our Mission"
						/>
					</h2>
					<p className="text-gray-700 dark:text-gray-300">
						<FormattedMessage
							id="about.mission.description"
							defaultMessage="To provide a modern, efficient, and user-friendly ERP solution for businesses of all sizes."
						/>
					</p>
				</div>
			</div>
		</div>
	);
}
