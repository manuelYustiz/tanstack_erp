import { createFileRoute } from "@tanstack/react-router";
import {
	Archive,
	Clock,
	Edit,
	Forward,
	Inbox,
	MoreHorizontal,
	Paperclip,
	Reply,
	Search,
	Send,
	Star,
	Tag,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../shared/components/ui/avatar";
import { Badge } from "../shared/components/ui/badge";
import { Button } from "../shared/components/ui/button";
import { Card } from "../shared/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../shared/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../shared/components/ui/dropdown-menu";
import { Input } from "../shared/components/ui/input";
import { Label } from "../shared/components/ui/label";
import { ScrollArea } from "../shared/components/ui/scroll-area";
import { Separator } from "../shared/components/ui/separator";
import { Textarea } from "../shared/components/ui/textarea";
import { AdminLayout } from "../shared/layouts";
import { cn } from "../shared/utils";

export const Route = createFileRoute("/$lang/mail")({
	component: MailPage,
});

interface Email {
	id: string;
	from: { name: string; email: string; initials: string; color: string };
	to: string;
	subject: string;
	preview: string;
	body: string;
	date: string;
	read: boolean;
	starred: boolean;
	folder: "inbox" | "sent" | "drafts" | "spam" | "trash" | "archive";
	labels: string[];
	attachments?: { name: string; size: string }[];
}

const MOCK_EMAILS: Email[] = [
	{
		id: "1",
		from: {
			name: "Carlos García",
			email: "carlos@empresa.com",
			initials: "CG",
			color: "bg-blue-500",
		},
		to: "admin@example.com",
		subject: "Reunión de equipo - Agenda del viernes",
		preview:
			"Hola, adjunto la agenda para nuestra reunión del viernes. Por favor revisen los puntos antes de la sesión.",
		body: "Hola equipo,\n\nAdjunto la agenda para nuestra reunión del viernes 19 de enero. Por favor revisen los siguientes puntos antes de la sesión:\n\n1. Revisión de objetivos Q1\n2. Actualización del estado de proyectos activos\n3. Planificación de recursos para el próximo trimestre\n4. Temas varios\n\nLa reunión será a las 10:00 AM en la sala de conferencias principal.\n\nSaludos,\nCarlos García\nGerente de Proyectos",
		date: "2024-01-19T10:30:00",
		read: false,
		starred: true,
		folder: "inbox",
		labels: ["trabajo", "urgente"],
		attachments: [{ name: "agenda_viernes.pdf", size: "245 KB" }],
	},
	{
		id: "2",
		from: {
			name: "María López",
			email: "mlopez@proveedor.com",
			initials: "ML",
			color: "bg-purple-500",
		},
		to: "admin@example.com",
		subject: "Factura #2024-0891 - Servicios de enero",
		preview:
			"Estimado cliente, adjuntamos la factura correspondiente a los servicios prestados durante el mes de enero.",
		body: "Estimado cliente,\n\nAdjuntamos la factura #2024-0891 correspondiente a los servicios prestados durante el mes de enero de 2024.\n\nDetalle:\n- Soporte técnico mensual: $1,200.00\n- Mantenimiento preventivo: $350.00\n- Actualizaciones de software: $500.00\n\nTotal: $2,050.00\n\nFecha de vencimiento: 31 de enero de 2024\n\nPara cualquier consulta, no dude en contactarnos.\n\nAtentamente,\nMaría López\nDepartamento de Facturación",
		date: "2024-01-18T14:15:00",
		read: false,
		starred: false,
		folder: "inbox",
		labels: ["facturas"],
		attachments: [
			{ name: "factura_2024-0891.pdf", size: "1.2 MB" },
			{ name: "desglose_servicios.xlsx", size: "89 KB" },
		],
	},
	{
		id: "3",
		from: {
			name: "Roberto Sánchez",
			email: "rsanchez@cliente.net",
			initials: "RS",
			color: "bg-green-500",
		},
		to: "admin@example.com",
		subject: "Solicitud de cotización - Proyecto ERP",
		preview:
			"Buenos días, quisiera solicitar una cotización para la implementación de un sistema ERP para nuestra empresa.",
		body: "Buenos días,\n\nMi nombre es Roberto Sánchez, Gerente de TI de Soluciones Industriales SA.\n\nQuisiéramos solicitar una cotización para la implementación de un sistema ERP que incluya:\n\n- Módulo de inventario y almacenes\n- Módulo de facturación y contabilidad\n- Módulo de gestión de RRHH\n- Integración con sistemas existentes\n- Capacitación al personal\n- Soporte post-implementación\n\nNuestra empresa cuenta con aproximadamente 150 usuarios.\n\nEsperamos su respuesta.\n\nSaludos cordiales,\nRoberto Sánchez",
		date: "2024-01-18T09:00:00",
		read: true,
		starred: false,
		folder: "inbox",
		labels: ["clientes", "prospecto"],
	},
	{
		id: "4",
		from: {
			name: "Ana Martínez",
			email: "amartinez@rrhh.com",
			initials: "AM",
			color: "bg-orange-500",
		},
		to: "admin@example.com",
		subject: "Recordatorio: Evaluación de desempeño Q4",
		preview:
			"Este es un recordatorio de que el período de evaluaciones de desempeño del Q4 culmina el próximo viernes.",
		body: "Estimado equipo,\n\nEste es un recordatorio importante: el período de evaluaciones de desempeño correspondiente al Q4 2023 culmina el próximo viernes 20 de enero.\n\nPor favor, asegúrense de:\n\n✅ Completar la autoevaluación en el portal de RRHH\n✅ Revisar y evaluar a sus reportes directos\n✅ Programar las sesiones de feedback\n\nAcceso al portal: https://rrhh.empresa.com/evaluaciones\n\nPara cualquier consulta contactar al departamento de RRHH.\n\nGracias por su colaboración,\nAna Martínez\nDirectora de RRHH",
		date: "2024-01-17T16:45:00",
		read: true,
		starred: true,
		folder: "inbox",
		labels: ["rrhh"],
	},
	{
		id: "5",
		from: {
			name: "TechSupport",
			email: "support@techservice.io",
			initials: "TS",
			color: "bg-red-500",
		},
		to: "admin@example.com",
		subject: "[ALERTA] Mantenimiento programado del servidor - 21 enero",
		preview:
			"Le informamos que el próximo domingo 21 de enero se realizará un mantenimiento programado en nuestros servidores.",
		body: "Estimado usuario,\n\nLe informamos que el próximo domingo 21 de enero de 2024 se realizará un mantenimiento programado en nuestros servidores entre las 02:00 AM y las 06:00 AM (UTC-5).\n\nDurante este período:\n- Los servicios en la nube estarán temporalmente inactivos\n- Los backups automáticos quedarán pausados\n- El acceso al panel de administración no estará disponible\n\nRecomendaciones:\n- Guarde todos los trabajos pendientes antes del horario indicado\n- Planifique actividades que no requieran conectividad\n\nDisculpe los inconvenientes.\n\nEquipo de TechSupport",
		date: "2024-01-16T11:20:00",
		read: true,
		starred: false,
		folder: "inbox",
		labels: ["sistema"],
	},
	{
		id: "6",
		from: {
			name: "Admin User",
			email: "admin@example.com",
			initials: "AU",
			color: "bg-indigo-500",
		},
		to: "carlos@empresa.com",
		subject: "Re: Reunión de equipo - Agenda del viernes",
		preview:
			"Gracias Carlos, he revisado la agenda. Estaré presente en la reunión.",
		body: "Hola Carlos,\n\nGracias por compartir la agenda. He revisado todos los puntos y estaré presente en la reunión del viernes.\n\nTengo algunas observaciones sobre el punto 3 (planificación de recursos) que me gustaría discutir. ¿Sería posible agregar 10 minutos adicionales para ese tema?\n\nSaludos,\nAdmin User",
		date: "2024-01-19T11:00:00",
		read: true,
		starred: false,
		folder: "sent",
		labels: [],
	},
	{
		id: "7",
		from: {
			name: "Admin User",
			email: "admin@example.com",
			initials: "AU",
			color: "bg-indigo-500",
		},
		to: "rsanchez@cliente.net",
		subject: "Re: Solicitud de cotización - Proyecto ERP",
		preview:
			"Estimado Roberto, muchas gracias por su interés. Nos complace presentarle nuestra propuesta.",
		body: "Estimado Roberto,\n\nMuchas gracias por su interés en nuestros servicios. Nos complace presentarle nuestra propuesta para la implementación del sistema ERP.\n\nEn los próximos 2-3 días hábiles enviaremos la cotización detallada que incluirá:\n\n- Descripción técnica de cada módulo\n- Cronograma de implementación\n- Inversión requerida\n- Plan de capacitación\n- Términos de soporte\n\nMientras tanto, ¿podríamos agendar una llamada de 30 minutos para entender mejor sus necesidades específicas?\n\nQuedo a su disposición,\nAdmin User\nGerente Comercial",
		date: "2024-01-18T10:30:00",
		read: true,
		starred: false,
		folder: "sent",
		labels: ["clientes"],
	},
	{
		id: "8",
		from: {
			name: "Admin User",
			email: "admin@example.com",
			initials: "AU",
			color: "bg-indigo-500",
		},
		to: "",
		subject: "Propuesta comercial - Borrador",
		preview:
			"Estimado [Nombre], adjunto nuestra propuesta comercial actualizada...",
		body: "Estimado [Nombre],\n\nAdjunto nuestra propuesta comercial actualizada para su revisión...\n\n[BORRADOR - COMPLETAR]",
		date: "2024-01-17T09:00:00",
		read: true,
		starred: false,
		folder: "drafts",
		labels: [],
	},
];

const FOLDERS = [
	{ id: "inbox", label: "Bandeja de entrada", icon: Inbox, count: 2 },
	{ id: "starred", label: "Destacados", icon: Star, count: 0 },
	{ id: "sent", label: "Enviados", icon: Send, count: 0 },
	{ id: "drafts", label: "Borradores", icon: Edit, count: 1 },
	{ id: "archive", label: "Archivo", icon: Archive, count: 0 },
	{ id: "spam", label: "Spam", icon: X, count: 0 },
	{ id: "trash", label: "Papelera", icon: Trash2, count: 0 },
];

const LABELS = [
	{ id: "trabajo", label: "Trabajo", color: "bg-blue-500" },
	{ id: "urgente", label: "Urgente", color: "bg-red-500" },
	{ id: "facturas", label: "Facturas", color: "bg-yellow-500" },
	{ id: "clientes", label: "Clientes", color: "bg-green-500" },
	{ id: "rrhh", label: "RRHH", color: "bg-purple-500" },
	{ id: "sistema", label: "Sistema", color: "bg-gray-500" },
];

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return date.toLocaleTimeString("es-ES", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}
	if (diffDays === 1) return "Ayer";
	if (diffDays < 7)
		return date.toLocaleDateString("es-ES", { weekday: "short" });
	return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

function formatFullDate(dateStr: string): string {
	return new Date(dateStr).toLocaleString("es-ES", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

function MailPage() {
	const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
	const [composeOpen, setComposeOpen] = useState(false);
	const [composeTo, setComposeTo] = useState("");
	const [composeSubject, setComposeSubject] = useState("");
	const [composeBody, setComposeBody] = useState("");

	const filteredEmails = emails.filter((email) => {
		const matchesFolder =
			selectedFolder === "starred"
				? email.starred
				: email.folder === selectedFolder;
		const matchesSearch =
			searchQuery === "" ||
			email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
			email.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			email.preview.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesFolder && matchesSearch;
	});

	const toggleStar = (emailId: string) => {
		setEmails((prev) =>
			prev.map((e) => (e.id === emailId ? { ...e, starred: !e.starred } : e))
		);
	};

	const markAsRead = (emailId: string) => {
		setEmails((prev) =>
			prev.map((e) => (e.id === emailId ? { ...e, read: true } : e))
		);
	};

	const moveToTrash = (emailId: string) => {
		setEmails((prev) =>
			prev.map((e) =>
				e.id === emailId ? { ...e, folder: "trash" as const } : e
			)
		);
		if (selectedEmail?.id === emailId) setSelectedEmail(null);
	};

	const handleEmailClick = (email: Email) => {
		setSelectedEmail(email);
		markAsRead(email.id);
	};

	const handleSend = () => {
		if (!composeTo || !composeSubject) return;
		const newEmail: Email = {
			id: String(Date.now()),
			from: {
				name: "Admin User",
				email: "admin@example.com",
				initials: "AU",
				color: "bg-indigo-500",
			},
			to: composeTo,
			subject: composeSubject,
			preview: composeBody.slice(0, 100),
			body: composeBody,
			date: new Date().toISOString(),
			read: true,
			starred: false,
			folder: "sent",
			labels: [],
		};
		setEmails((prev) => [newEmail, ...prev]);
		setComposeOpen(false);
		setComposeTo("");
		setComposeSubject("");
		setComposeBody("");
	};

	const unreadCount = emails.filter(
		(e) => e.folder === "inbox" && !e.read
	).length;

	return (
		<AdminLayout>
			<div className="flex h-[calc(100vh-8rem)] gap-0 -m-6 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
				{/* Folder Sidebar */}
				<div className="flex w-56 flex-shrink-0 flex-col border-r border-border bg-muted/30">
					<div className="p-3">
						<Dialog open={composeOpen} onOpenChange={setComposeOpen}>
							<DialogTrigger asChild>
								<Button className="w-full gap-2" size="sm">
									<Edit className="h-4 w-4" />
									Nuevo correo
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[560px]">
								<DialogHeader>
									<DialogTitle>Nuevo correo</DialogTitle>
								</DialogHeader>
								<div className="grid gap-3 py-2">
									<div className="grid gap-1.5">
										<Label htmlFor="compose-to">Para</Label>
										<Input
											id="compose-to"
											placeholder="destinatario@email.com"
											value={composeTo}
											onChange={(e) => setComposeTo(e.target.value)}
										/>
									</div>
									<div className="grid gap-1.5">
										<Label htmlFor="compose-subject">Asunto</Label>
										<Input
											id="compose-subject"
											placeholder="Asunto del correo"
											value={composeSubject}
											onChange={(e) => setComposeSubject(e.target.value)}
										/>
									</div>
									<div className="grid gap-1.5">
										<Label htmlFor="compose-body">Mensaje</Label>
										<Textarea
											id="compose-body"
											placeholder="Escribe tu mensaje aquí..."
											className="min-h-[200px] resize-none"
											value={composeBody}
											onChange={(e) => setComposeBody(e.target.value)}
										/>
									</div>
								</div>
								<DialogFooter className="gap-2">
									<Button
										variant="outline"
										onClick={() => setComposeOpen(false)}
									>
										Cancelar
									</Button>
									<Button
										onClick={handleSend}
										disabled={!composeTo || !composeSubject}
									>
										<Send className="mr-2 h-4 w-4" />
										Enviar
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<ScrollArea className="flex-1">
						<nav className="space-y-0.5 px-2 pb-2">
							{FOLDERS.map((folder) => {
								const Icon = folder.icon;
								const count =
									folder.id === "inbox"
										? unreadCount
										: folder.id === "drafts"
											? emails.filter((e) => e.folder === "drafts").length
											: 0;
								return (
									<button
										key={folder.id}
										type="button"
										onClick={() => {
											setSelectedFolder(folder.id);
											setSelectedEmail(null);
										}}
										className={cn(
											"flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
											selectedFolder === folder.id
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										)}
									>
										<Icon className="h-4 w-4 flex-shrink-0" />
										<span className="flex-1 text-left">{folder.label}</span>
										{count > 0 && (
											<Badge
												variant={
													selectedFolder === folder.id ? "outline" : "secondary"
												}
												className="h-5 min-w-5 justify-center px-1.5 text-xs"
											>
												{count}
											</Badge>
										)}
									</button>
								);
							})}
						</nav>

						<Separator className="my-2" />

						<div className="px-2 pb-2">
							<p className="mb-1 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
								Etiquetas
							</p>
							{LABELS.map((label) => (
								<button
									key={label.id}
									type="button"
									className="flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								>
									<span
										className={cn("h-2.5 w-2.5 rounded-full", label.color)}
									/>
									{label.label}
								</button>
							))}
						</div>
					</ScrollArea>
				</div>

				{/* Email List */}
				<div className="flex w-80 flex-shrink-0 flex-col border-r border-border">
					<div className="flex items-center gap-2 border-b border-border p-3">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Buscar correos..."
								className="pl-8 h-9"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between border-b border-border px-4 py-2">
						<span className="text-sm font-medium">
							{FOLDERS.find((f) => f.id === selectedFolder)?.label ||
								"Destacados"}
						</span>
						<span className="text-xs text-muted-foreground">
							{filteredEmails.length} mensaje
							{filteredEmails.length !== 1 ? "s" : ""}
						</span>
					</div>

					<ScrollArea className="flex-1">
						{filteredEmails.length === 0 ? (
							<div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
								No hay mensajes
							</div>
						) : (
							<div>
								{filteredEmails.map((email, index) => (
									<div key={email.id}>
										{/* biome-ignore lint/a11y/useSemanticElements: div[role=button] used to avoid nested button (star toggle) inside outer button */}
										<div
											role="button"
											tabIndex={0}
											onClick={() => handleEmailClick(email)}
											onKeyDown={(e) =>
												e.key === "Enter" && handleEmailClick(email)
											}
											className={cn(
												"flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-muted/50 cursor-pointer",
												selectedEmail?.id === email.id && "bg-muted",
												!email.read && "bg-blue-50/50 dark:bg-blue-950/20"
											)}
										>
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8 flex-shrink-0">
													<AvatarFallback
														className={cn(
															"text-xs font-medium text-white",
															email.from.color
														)}
													>
														{email.from.initials}
													</AvatarFallback>
												</Avatar>
												<div className="flex min-w-0 flex-1 items-center gap-1">
													<span
														className={cn(
															"truncate text-sm",
															!email.read && "font-semibold"
														)}
													>
														{email.from.name}
													</span>
													{!email.read && (
														<span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
													)}
												</div>
												<div className="flex flex-shrink-0 items-center gap-1">
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															toggleStar(email.id);
														}}
														className="text-muted-foreground hover:text-yellow-400 transition-colors"
													>
														<Star
															className={cn(
																"h-3.5 w-3.5",
																email.starred &&
																	"fill-yellow-400 text-yellow-400"
															)}
														/>
													</button>
													<span className="text-xs text-muted-foreground">
														{formatDate(email.date)}
													</span>
												</div>
											</div>
											<div className="pl-10">
												<p
													className={cn(
														"truncate text-sm",
														!email.read
															? "font-medium text-foreground"
															: "text-muted-foreground"
													)}
												>
													{email.subject}
												</p>
												<p className="truncate text-xs text-muted-foreground">
													{email.preview}
												</p>
												{email.labels.length > 0 && (
													<div className="mt-1 flex flex-wrap gap-1">
														{email.labels.map((label) => {
															const labelData = LABELS.find(
																(l) => l.id === label
															);
															return (
																<span
																	key={label}
																	className={cn(
																		"inline-flex h-4 items-center rounded-full px-1.5 text-[10px] font-medium text-white",
																		labelData?.color || "bg-gray-500"
																	)}
																>
																	{labelData?.label || label}
																</span>
															);
														})}
													</div>
												)}
											</div>
										</div>
										{index < filteredEmails.length - 1 && (
											<Separator className="mx-4" />
										)}
									</div>
								))}
							</div>
						)}
					</ScrollArea>
				</div>

				{/* Email Detail */}
				<div className="flex flex-1 flex-col overflow-hidden">
					{selectedEmail ? (
						<>
							<div className="flex items-center justify-between border-b border-border px-6 py-3">
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										title="Responder"
									>
										<Reply className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										title="Reenviar"
									>
										<Forward className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										title="Archivar"
									>
										<Archive className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-destructive hover:text-destructive"
										title="Eliminar"
										onClick={() => moveToTrash(selectedEmail.id)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={() => toggleStar(selectedEmail.id)}
									>
										<Star
											className={cn(
												"h-4 w-4",
												selectedEmail.starred &&
													"fill-yellow-400 text-yellow-400"
											)}
										/>
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Tag className="mr-2 h-4 w-4" />
												Etiquetar
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Archive className="mr-2 h-4 w-4" />
												Archivar
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className="text-destructive"
												onClick={() => moveToTrash(selectedEmail.id)}
											>
												<Trash2 className="mr-2 h-4 w-4" />
												Eliminar
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>

							<ScrollArea className="flex-1">
								<div className="px-6 py-5">
									<h2 className="mb-4 text-xl font-semibold">
										{selectedEmail.subject}
									</h2>

									<Card className="mb-4 p-4">
										<div className="flex items-start gap-3">
											<Avatar className="h-10 w-10 flex-shrink-0">
												<AvatarFallback
													className={cn(
														"font-medium text-white",
														selectedEmail.from.color
													)}
												>
													{selectedEmail.from.initials}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 flex-wrap">
													<span className="font-medium">
														{selectedEmail.from.name}
													</span>
													<span className="text-sm text-muted-foreground">
														&lt;{selectedEmail.from.email}&gt;
													</span>
												</div>
												<div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
													<span>
														Para: {selectedEmail.to || "(sin destinatario)"}
													</span>
												</div>
												<div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
													<Clock className="h-3 w-3" />
													{formatFullDate(selectedEmail.date)}
												</div>
											</div>
											{selectedEmail.labels.length > 0 && (
												<div className="flex flex-wrap gap-1">
													{selectedEmail.labels.map((label) => {
														const labelData = LABELS.find(
															(l) => l.id === label
														);
														return (
															<Badge
																key={label}
																variant="secondary"
																className="text-xs"
															>
																{labelData?.label || label}
															</Badge>
														);
													})}
												</div>
											)}
										</div>
									</Card>

									<div className="rounded-lg border border-border bg-background p-5 text-sm leading-relaxed whitespace-pre-wrap">
										{selectedEmail.body}
									</div>

									{selectedEmail.attachments &&
										selectedEmail.attachments.length > 0 && (
											<div className="mt-4">
												<p className="mb-2 text-sm font-medium text-muted-foreground">
													Archivos adjuntos ({selectedEmail.attachments.length})
												</p>
												<div className="flex flex-wrap gap-2">
													{selectedEmail.attachments.map((att) => (
														<div
															key={att.name}
															className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm"
														>
															<Paperclip className="h-4 w-4 text-muted-foreground" />
															<span>{att.name}</span>
															<span className="text-muted-foreground">
																{att.size}
															</span>
														</div>
													))}
												</div>
											</div>
										)}

									<div className="mt-6">
										<Card className="p-4">
											<p className="mb-2 text-sm font-medium">Responder</p>
											<Textarea
												placeholder={`Responder a ${selectedEmail.from.name}...`}
												className="min-h-[100px] resize-none"
											/>
											<div className="mt-3 flex justify-end">
												<Button size="sm" className="gap-2">
													<Reply className="h-4 w-4" />
													Enviar respuesta
												</Button>
											</div>
										</Card>
									</div>
								</div>
							</ScrollArea>
						</>
					) : (
						<div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
								<Inbox className="h-8 w-8" />
							</div>
							<div className="text-center">
								<p className="font-medium">Selecciona un correo</p>
								<p className="text-sm">
									Elige un mensaje de la lista para verlo aquí
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</AdminLayout>
	);
}
