import * as React from "react";
import { cn } from "../../utils";

export interface CheckboxProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, ...props }, ref) => (
		<input
			type="checkbox"
			className={cn(
				"h-4 w-4 rounded border border-gray-300 bg-white text-theme-primary focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
