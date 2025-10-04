import * as React from "react";
import { cn } from "../../utils/cn";

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {
	htmlFor?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			// biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is provided by the consumer component
			<label
				ref={ref}
				className={cn(
					"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-200",
					className
				)}
				{...props}
			/>
		);
	}
);
Label.displayName = "Label";

export { Label };
