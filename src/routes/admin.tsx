import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../shared/components/layout";
import { Button } from "../shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../shared/components/ui/card";

export const Route = createFileRoute("/admin")({
	component: AdminDashboard,
});

// Mock data for demonstration
const dashboardStats = [
	{
		title: "Ventas Totales",
		value: "$45,231.89",
		change: "+20.1%",
		changeType: "positive" as const,
		icon: "💰",
	},
	{
		title: "Usuarios Activos",
		value: "2,234",
		change: "+15.3%",
		changeType: "positive" as const,
		icon: "👥",
	},
	{
		title: "Productos",
		value: "1,892",
		change: "+2.4%",
		changeType: "positive" as const,
		icon: "📦",
	},
	{
		title: "Órdenes Pendientes",
		value: "23",
		change: "-4.2%",
		changeType: "negative" as const,
		icon: "⏳",
	},
];

const recentOrders = [
	{
		id: "#3210",
		customer: "Juan Pérez",
		product: "Laptop Dell XPS",
		amount: "$1,299.00",
		status: "Completado",
		date: "2024-01-15",
	},
	{
		id: "#3209",
		customer: "María García",
		product: "iPhone 15 Pro",
		amount: "$999.00",
		status: "Procesando",
		date: "2024-01-15",
	},
	{
		id: "#3208",
		customer: "Carlos López",
		product: 'Monitor Samsung 27"',
		amount: "$329.00",
		status: "Enviado",
		date: "2024-01-14",
	},
	{
		id: "#3207",
		customer: "Ana Rodríguez",
		product: "Teclado Mecánico",
		amount: "$149.00",
		status: "Completado",
		date: "2024-01-14",
	},
];

const topProducts = [
	{ name: "Laptop Dell XPS 13", sales: 89, revenue: "$115,671" },
	{ name: "iPhone 15 Pro", sales: 67, revenue: "$66,933" },
	{ name: 'Monitor Samsung 27"', sales: 45, revenue: "$14,805" },
	{ name: "AirPods Pro", sales: 38, revenue: "$9,462" },
];

function StatCard({
	title,
	value,
	change,
	changeType,
	icon,
}: (typeof dashboardStats)[0]) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<span className="text-2xl">{icon}</span>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				<p
					className={`text-xs ${
						changeType === "positive" ? "text-green-600" : "text-red-600"
					}`}
				>
					{change} desde el mes pasado
				</p>
			</CardContent>
		</Card>
	);
}

function AdminDashboard() {
	return (
		<AdminLayout title="Dashboard">
			<div className="space-y-6">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						¡Bienvenido al Panel de Administración!
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Aquí puedes gestionar todos los aspectos de tu sistema ERP.
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{dashboardStats.map((stat) => (
						<StatCard key={stat.title} {...stat} />
					))}
				</div>

				{/* Main Content Grid */}
				<div className="grid gap-6 md:grid-cols-2">
					{/* Recent Orders */}
					<Card>
						<CardHeader>
							<CardTitle>Órdenes Recientes</CardTitle>
							<CardDescription>
								Las últimas órdenes procesadas en el sistema
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{recentOrders.map((order) => (
									<div
										key={order.id}
										className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
									>
										<div>
											<p className="font-medium text-gray-900 dark:text-white">
												{order.customer}
											</p>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{order.product}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-500">
												{order.id} • {order.date}
											</p>
										</div>
										<div className="text-right">
											<p className="font-medium text-gray-900 dark:text-white">
												{order.amount}
											</p>
											<span
												className={`text-xs px-2 py-1 rounded-full ${
													order.status === "Completado"
														? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
														: order.status === "Procesando"
															? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
															: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
												}`}
											>
												{order.status}
											</span>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Top Products */}
					<Card>
						<CardHeader>
							<CardTitle>Productos Más Vendidos</CardTitle>
							<CardDescription>
								Los productos con mejor rendimiento este mes
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{topProducts.map((product, index) => (
									<div
										key={product.name}
										className="flex items-center justify-between"
									>
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 bg-theme-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
												{index + 1}
											</div>
											<div>
												<p className="font-medium text-gray-900 dark:text-white">
													{product.name}
												</p>
												<p className="text-sm text-gray-600 dark:text-gray-400">
													{product.sales} ventas
												</p>
											</div>
										</div>
										<p className="font-medium text-gray-900 dark:text-white">
											{product.revenue}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle>Acciones Rápidas</CardTitle>
						<CardDescription>
							Accesos directos a las funciones más utilizadas
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-4">
							<Button className="h-20 flex-col space-y-2">
								<span className="text-2xl">➕</span>
								<span className="text-sm">Nuevo Producto</span>
							</Button>
							<Button variant="secondary" className="h-20 flex-col space-y-2">
								<span className="text-2xl">👤</span>
								<span className="text-sm">Agregar Usuario</span>
							</Button>
							<Button variant="outline" className="h-20 flex-col space-y-2">
								<span className="text-2xl">📊</span>
								<span className="text-sm">Ver Reportes</span>
							</Button>
							<Button variant="ghost" className="h-20 flex-col space-y-2">
								<span className="text-2xl">⚙️</span>
								<span className="text-sm">Configuración</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}
