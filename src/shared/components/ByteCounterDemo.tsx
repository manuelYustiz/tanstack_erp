import { useState } from "react";
import { apiClient, byteCounter } from "../api";
import { Button } from "./ui/button";

/**
 * Demo component to showcase the byte counter functionality
 * Displays network usage statistics and allows testing with sample API calls
 */
export function ByteCounterDemo() {
	const [stats, setStats] = useState({
		sent: byteCounter.sent,
		received: byteCounter.received,
		total: byteCounter.getTotal(),
	});
	const [loading, setLoading] = useState(false);

	const updateStats = () => {
		setStats({
			sent: byteCounter.sent,
			received: byteCounter.received,
			total: byteCounter.getTotal(),
		});
	};

	const handleTestRequest = async () => {
		setLoading(true);
		try {
			// Make a test request (this will fail but will still count bytes)
			await apiClient.get("/test-endpoint");
		} catch {
			// Expected to fail, but bytes are counted
		} finally {
			updateStats();
			setLoading(false);
		}
	};

	const handleReset = () => {
		byteCounter.reset();
		updateStats();
	};

	const formatBytes = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
			<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Network Byte Counter
			</h3>
			<p className="text-gray-600 dark:text-gray-300 mb-4">
				Track bytes sent and received through axios requests
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
					<h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
						Bytes Sent
					</h4>
					<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
						{formatBytes(stats.sent)}
					</p>
					<p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
						{stats.sent.toLocaleString()} bytes
					</p>
				</div>

				<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
					<h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
						Bytes Received
					</h4>
					<p className="text-2xl font-bold text-green-600 dark:text-green-400">
						{formatBytes(stats.received)}
					</p>
					<p className="text-sm text-green-700 dark:text-green-300 mt-1">
						{stats.received.toLocaleString()} bytes
					</p>
				</div>

				<div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
					<h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
						Total
					</h4>
					<p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
						{formatBytes(stats.total)}
					</p>
					<p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
						{stats.total.toLocaleString()} bytes
					</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-3">
				<Button
					onClick={handleTestRequest}
					disabled={loading}
					variant="default"
				>
					{loading ? "Testing..." : "Test API Request"}
				</Button>
				<Button onClick={updateStats} variant="outline">
					Refresh Stats
				</Button>
				<Button onClick={handleReset} variant="outline">
					Reset Counter
				</Button>
			</div>

			<div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm text-gray-600 dark:text-gray-400">
				<p className="font-semibold mb-1">How it works:</p>
				<ul className="list-disc list-inside space-y-1">
					<li>
						The byte counter is integrated into axios request/response
						interceptors
					</li>
					<li>It tracks all HTTP requests made through the apiClient</li>
					<li>
						Click "Test API Request" to simulate a request and see the counter
						update
					</li>
					<li>Use "Reset Counter" to clear the statistics</li>
				</ul>
			</div>
		</div>
	);
}
