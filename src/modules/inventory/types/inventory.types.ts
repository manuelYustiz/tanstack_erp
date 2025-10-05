export interface InventoryMenuItem {
	id: string;
	label: string;
	icon?: string;
	path?: string;
	children?: InventoryMenuItem[];
	module: "products" | "warehouses" | "movements" | "reports" | "configuration";
	permission: string;
}

export interface InventoryReport {
	id: string;
	name: string;
	description: string;
	path: string;
	icon: string;
	parameters: ReportParameter[];
	requiresDateRange: boolean;
}

export interface ReportParameter {
	name: string;
	type: "date" | "select" | "text" | "number";
	options?: string[];
	required: boolean;
}
