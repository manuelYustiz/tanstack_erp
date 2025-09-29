import { useState } from "react";
import { useFormatters } from "../hooks/useFormatters";
import { useTimezone } from "../hooks/useTimezone";
import { COMMON_TIMEZONES } from "../utils/dayjs";

export function TimezoneDemo() {
	const { timezone, setTimezone, detectedTimezone } = useTimezone();
	const { formatDate, formatDateTime, formatRelativeTime } = useFormatters();
	const [testDate] = useState(new Date());

	return (
		<div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				🕒 Timezone & Date Formatting Demo
			</h3>

			<div className="mb-4">
				<label
					htmlFor="timezone-select"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
				>
					Current Timezone
				</label>
				<select
					id="timezone-select"
					value={timezone}
					onChange={(e) => setTimezone(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
				>
					{COMMON_TIMEZONES.map(({ value, label }) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
				<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
					Detected: {detectedTimezone}
				</p>
			</div>

			<div className="space-y-3">
				<div>
					<span className="font-medium text-gray-700 dark:text-gray-300">
						Date:
					</span>
					<span className="ml-2 text-gray-900 dark:text-white">
						{formatDate(testDate)}
					</span>
				</div>
				<div>
					<span className="font-medium text-gray-700 dark:text-gray-300">
						DateTime:
					</span>
					<span className="ml-2 text-gray-900 dark:text-white">
						{formatDateTime(testDate)}
					</span>
				</div>
				<div>
					<span className="font-medium text-gray-700 dark:text-gray-300">
						Relative:
					</span>
					<span className="ml-2 text-gray-900 dark:text-white">
						{formatRelativeTime(testDate)}
					</span>
				</div>
				<div>
					<span className="font-medium text-gray-700 dark:text-gray-300">
						Current Timezone:
					</span>
					<span className="ml-2 text-gray-900 dark:text-white font-mono text-sm">
						{timezone}
					</span>
				</div>
			</div>
		</div>
	);
}
