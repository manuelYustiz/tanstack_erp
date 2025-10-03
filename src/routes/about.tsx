import { createFileRoute } from "@tanstack/react-router"
import {
	Button,
	Card,
	Flex,
	Grid,
	Heading,
	Text,
	TextArea,
	Theme,
} from "@radix-ui/themes";
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
	})

	return (
		<Card size="2">
			<Flex gap="6">
				<Flex direction="column" gap="3">
					<Heading as="h5" size="2">
						Global
					</Heading>
					<Grid gap="1">
						<Text as="div" weight="bold" size="2" mb="1">
							Feedback
						</Text>
						<TextArea placeholder="Write your feedback…" />
					</Grid>
					<Button>Send</Button>
				</Flex>

				<Theme accentColor="cyan" radius="full">
					<Card size="2">
						<Flex gap="6">
							<Flex direction="column" gap="3">
								<Heading as="h5" size="2">
									Child
								</Heading>
								<Grid gap="1">
									<Text as="div" weight="bold" size="2" mb="1">
										Feedback
									</Text>
									<TextArea placeholder="Write your feedback…" />
								</Grid>
								<Button>Send</Button>
							</Flex>

							<Theme accentColor="orange">
								<Card size="2">
									<Flex direction="column" gap="3">
										<Heading as="h5" size="2">
											Grandchild
										</Heading>
										<Grid gap="1">
											<Text as="div" weight="bold" size="2" mb="1">
												Feedback
											</Text>
											<TextArea placeholder="Write your feedback…" />
										</Grid>
										<Button>Send</Button>
									</Flex>
								</Card>
							</Theme>
						</Flex>
					</Card>
				</Theme>
			</Flex>
		</Card>
	)
}
