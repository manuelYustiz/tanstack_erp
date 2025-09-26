import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
	component: Products,
});

function Products() {
	const mockProducts = [
		{
			id: 1,
			name: "Laptop Pro",
			category: "Electronics",
			price: 1299.99,
			stock: 15,
		},
		{
			id: 2,
			name: "Office Chair",
			category: "Furniture",
			price: 299.99,
			stock: 8,
		},
		{
			id: 3,
			name: "Wireless Mouse",
			category: "Electronics",
			price: 49.99,
			stock: 32,
		},
	];

	return (
		<div className="p-2">
			<h1 className="text-2xl font-bold mb-4">Products Management</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Category
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Price
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Stock
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{mockProducts.map((product) => (
							<tr key={product.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{product.id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{product.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{product.category}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									${product.price}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{product.stock}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
