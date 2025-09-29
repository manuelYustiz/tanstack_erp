import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { Button } from "./ui/button";

export function NotFound() {
	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
			<div className="max-w-md w-full text-center">
				{/* 404 Large Number */}
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600">
						404
					</h1>
				</div>

				{/* Error Title */}
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					<FormattedMessage id="error.404.title" />
				</h2>

				{/* Error Subtitle */}
				<p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
					<FormattedMessage id="error.404.subtitle" />
				</p>

				{/* Error Description */}
				<p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
					<FormattedMessage id="error.404.description" />
				</p>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild className="flex items-center gap-2">
						<Link to="/">
							<Home className="w-4 h-4" />
							<FormattedMessage id="error.404.back_home" />
						</Link>
					</Button>

					<Button
						variant="outline"
						onClick={handleGoBack}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						<FormattedMessage id="error.404.back_previous" />
					</Button>
				</div>
			</div>
		</div>
	);
}
