import { createFileRoute } from "@tanstack/react-router";
import { FormattedMessage } from "react-intl";
import { AdminLayout } from "../shared/layouts";

export const Route = createFileRoute("/$lang/test")({
	component: TestPage,
});

function TestPage() {
	return (
		<AdminLayout>
			<div className="space-y-6 p-6">
				<h1 className="text-3xl font-bold">
					<FormattedMessage id="app.title" />
				</h1>
				<p className="text-xl">
					<FormattedMessage id="app.welcome" />
				</p>
				<p className="text-lg">
					<FormattedMessage id="app.description" />
				</p>
				<div>
					<h2 className="text-2xl font-semibold mb-4">
						<FormattedMessage id="features.title" />
					</h2>
					<ul className="space-y-2">
						<li>
							<FormattedMessage id="features.vite" />
						</li>
						<li>
							<FormattedMessage id="features.react" />
						</li>
						<li>
							<FormattedMessage id="features.biome" />
						</li>
						<li>
							<FormattedMessage id="features.router" />
						</li>
					</ul>
				</div>
			</div>
		</AdminLayout>
	);
}
