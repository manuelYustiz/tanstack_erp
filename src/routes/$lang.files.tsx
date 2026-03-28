import { createFileRoute } from "@tanstack/react-router";
import {
	ChevronRight,
	Download,
	File,
	FileImage,
	FileSpreadsheet,
	FileText,
	FileVideo,
	Folder,
	FolderOpen,
	Grid3X3,
	HardDrive,
	LayoutList,
	Link2,
	MoreHorizontal,
	Package,
	Plus,
	Search,
	Share2,
	Star,
	Trash2,
	Upload,
	Users,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../shared/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../shared/components/ui/breadcrumb";
import { Button } from "../shared/components/ui/button";
import { Card, CardContent } from "../shared/components/ui/card";
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
import { AdminLayout } from "../shared/layouts";
import { cn } from "../shared/utils";

export const Route = createFileRoute("/$lang/files")({
	component: FilesPage,
});

type FileType =
	| "folder"
	| "pdf"
	| "xlsx"
	| "docx"
	| "image"
	| "video"
	| "zip"
	| "other";

interface FileItem {
	id: string;
	name: string;
	type: FileType;
	size?: string;
	modified: string;
	path: string;
	starred: boolean;
	shared: boolean;
	owner: string;
	children?: FileItem[];
}

const MOCK_FILES: FileItem[] = [
	{
		id: "f1",
		name: "Documentos",
		type: "folder",
		modified: "2024-01-19",
		path: "/",
		starred: true,
		shared: false,
		owner: "Admin User",
		children: [
			{
				id: "f1-1",
				name: "Contratos",
				type: "folder",
				modified: "2024-01-15",
				path: "/Documentos",
				starred: false,
				shared: true,
				owner: "Admin User",
			},
			{
				id: "f1-2",
				name: "Propuestas",
				type: "folder",
				modified: "2024-01-10",
				path: "/Documentos",
				starred: false,
				shared: false,
				owner: "Admin User",
			},
			{
				id: "f1-3",
				name: "Informe_Anual_2023.pdf",
				type: "pdf",
				size: "4.2 MB",
				modified: "2024-01-18",
				path: "/Documentos",
				starred: false,
				shared: false,
				owner: "Admin User",
			},
			{
				id: "f1-4",
				name: "Manual_Usuario_ERP.docx",
				type: "docx",
				size: "1.8 MB",
				modified: "2024-01-12",
				path: "/Documentos",
				starred: true,
				shared: true,
				owner: "Admin User",
			},
		],
	},
	{
		id: "f2",
		name: "Reportes",
		type: "folder",
		modified: "2024-01-18",
		path: "/",
		starred: false,
		shared: true,
		owner: "Admin User",
		children: [
			{
				id: "f2-1",
				name: "Ventas_Q4_2023.xlsx",
				type: "xlsx",
				size: "892 KB",
				modified: "2024-01-17",
				path: "/Reportes",
				starred: true,
				shared: false,
				owner: "Admin User",
			},
			{
				id: "f2-2",
				name: "Inventario_Enero.xlsx",
				type: "xlsx",
				size: "1.1 MB",
				modified: "2024-01-19",
				path: "/Reportes",
				starred: false,
				shared: false,
				owner: "Admin User",
			},
			{
				id: "f2-3",
				name: "KPIs_Dashboard.pdf",
				type: "pdf",
				size: "2.1 MB",
				modified: "2024-01-15",
				path: "/Reportes",
				starred: false,
				shared: true,
				owner: "Carlos García",
			},
		],
	},
	{
		id: "f3",
		name: "Imágenes",
		type: "folder",
		modified: "2024-01-16",
		path: "/",
		starred: false,
		shared: false,
		owner: "Admin User",
		children: [
			{
				id: "f3-1",
				name: "logo_empresa.png",
				type: "image",
				size: "245 KB",
				modified: "2024-01-05",
				path: "/Imágenes",
				starred: false,
				shared: true,
				owner: "Admin User",
			},
			{
				id: "f3-2",
				name: "banner_web.jpg",
				type: "image",
				size: "1.4 MB",
				modified: "2024-01-14",
				path: "/Imágenes",
				starred: false,
				shared: false,
				owner: "Admin User",
			},
			{
				id: "f3-3",
				name: "foto_equipo.jpg",
				type: "image",
				size: "3.2 MB",
				modified: "2023-12-20",
				path: "/Imágenes",
				starred: false,
				shared: false,
				owner: "Admin User",
			},
		],
	},
	{
		id: "f4",
		name: "Videos",
		type: "folder",
		modified: "2023-12-30",
		path: "/",
		starred: false,
		shared: false,
		owner: "Admin User",
		children: [
			{
				id: "f4-1",
				name: "tutorial_capacitacion.mp4",
				type: "video",
				size: "248 MB",
				modified: "2023-12-28",
				path: "/Videos",
				starred: false,
				shared: true,
				owner: "Admin User",
			},
		],
	},
	{
		id: "f5",
		name: "Presupuesto_2024.xlsx",
		type: "xlsx",
		size: "2.3 MB",
		modified: "2024-01-19",
		path: "/",
		starred: true,
		shared: true,
		owner: "Admin User",
	},
	{
		id: "f6",
		name: "Contrato_Proveedor_A.pdf",
		type: "pdf",
		size: "567 KB",
		modified: "2024-01-17",
		path: "/",
		starred: false,
		shared: false,
		owner: "Admin User",
	},
	{
		id: "f7",
		name: "Backup_Sistema.zip",
		type: "zip",
		size: "1.2 GB",
		modified: "2024-01-10",
		path: "/",
		starred: false,
		shared: false,
		owner: "Admin User",
	},
];

const SIDEBAR_ITEMS = [
	{ id: "myfiles", label: "Mis Archivos", icon: HardDrive, count: null },
	{ id: "shared", label: "Compartido conmigo", icon: Users, count: 5 },
	{ id: "starred", label: "Destacados", icon: Star, count: null },
	{ id: "recent", label: "Recientes", icon: FolderOpen, count: null },
	{ id: "trash", label: "Papelera", icon: Trash2, count: null },
];

const STORAGE_USED = 68;

function getFileIcon(type: FileType, className?: string) {
	const iconClass = cn("h-10 w-10 flex-shrink-0", className);
	switch (type) {
		case "folder":
			return (
				<Folder
					className={cn(
						iconClass,
						"text-yellow-500 fill-yellow-100 dark:fill-yellow-950"
					)}
				/>
			);
		case "pdf":
			return <FileText className={cn(iconClass, "text-red-500")} />;
		case "xlsx":
			return <FileSpreadsheet className={cn(iconClass, "text-green-600")} />;
		case "docx":
			return <FileText className={cn(iconClass, "text-blue-600")} />;
		case "image":
			return <FileImage className={cn(iconClass, "text-purple-500")} />;
		case "video":
			return <FileVideo className={cn(iconClass, "text-pink-500")} />;
		case "zip":
			return <Package className={cn(iconClass, "text-orange-500")} />;
		default:
			return <File className={cn(iconClass, "text-muted-foreground")} />;
	}
}

function getFileIconSmall(type: FileType) {
	const className = "h-5 w-5 flex-shrink-0";
	switch (type) {
		case "folder":
			return (
				<Folder
					className={cn(
						className,
						"text-yellow-500 fill-yellow-100 dark:fill-yellow-950"
					)}
				/>
			);
		case "pdf":
			return <FileText className={cn(className, "text-red-500")} />;
		case "xlsx":
			return <FileSpreadsheet className={cn(className, "text-green-600")} />;
		case "docx":
			return <FileText className={cn(className, "text-blue-600")} />;
		case "image":
			return <FileImage className={cn(className, "text-purple-500")} />;
		case "video":
			return <FileVideo className={cn(className, "text-pink-500")} />;
		case "zip":
			return <Package className={cn(className, "text-orange-500")} />;
		default:
			return <File className={cn(className, "text-muted-foreground")} />;
	}
}

function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

function FilesPage() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedSection, setSelectedSection] = useState("myfiles");
	const [currentPath, setCurrentPath] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);
	const [newFolderName, setNewFolderName] = useState("");
	const [newFolderOpen, setNewFolderOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

	const getCurrentFiles = (): FileItem[] => {
		if (selectedSection === "starred") {
			return flattenFiles(files).filter((f) => f.starred);
		}
		if (selectedSection === "shared") {
			return flattenFiles(files).filter((f) => f.shared);
		}
		if (selectedSection === "recent") {
			return flattenFiles(files)
				.filter((f) => f.type !== "folder")
				.sort(
					(a, b) =>
						new Date(b.modified).getTime() - new Date(a.modified).getTime()
				)
				.slice(0, 10);
		}

		let current: FileItem[] = files;
		for (const pathPart of currentPath) {
			const folder = current.find(
				(f) => f.type === "folder" && f.name === pathPart
			);
			if (folder?.children) {
				current = folder.children;
			}
		}
		return current;
	};

	const flattenFiles = (items: FileItem[]): FileItem[] => {
		const result: FileItem[] = [];
		for (const item of items) {
			result.push(item);
			if (item.children) {
				result.push(...flattenFiles(item.children));
			}
		}
		return result;
	};

	const handleItemDoubleClick = (item: FileItem) => {
		if (item.type === "folder") {
			setCurrentPath((prev) => [...prev, item.name]);
			setSelectedFile(null);
		}
	};

	const navigateToBreadcrumb = (index: number) => {
		setCurrentPath((prev) => prev.slice(0, index));
		setSelectedFile(null);
	};

	const toggleStar = (fileId: string) => {
		const updateStars = (items: FileItem[]): FileItem[] =>
			items.map((f) => ({
				...f,
				starred: f.id === fileId ? !f.starred : f.starred,
				children: f.children ? updateStars(f.children) : undefined,
			}));
		setFiles(updateStars(files));
	};

	const handleCreateFolder = () => {
		if (!newFolderName.trim()) return;
		const newFolder: FileItem = {
			id: `folder-${Date.now()}`,
			name: newFolderName.trim(),
			type: "folder",
			modified: new Date().toISOString().split("T")[0],
			path: currentPath.length > 0 ? `/${currentPath.join("/")}` : "/",
			starred: false,
			shared: false,
			owner: "Admin User",
			children: [],
		};

		if (currentPath.length === 0) {
			setFiles((prev) => [newFolder, ...prev]);
		} else {
			const addToPath = (
				items: FileItem[],
				pathParts: string[]
			): FileItem[] => {
				if (pathParts.length === 0) return items;
				return items.map((f) => {
					if (f.name === pathParts[0] && f.type === "folder") {
						if (pathParts.length === 1) {
							return { ...f, children: [newFolder, ...(f.children || [])] };
						}
						return {
							...f,
							children: addToPath(f.children || [], pathParts.slice(1)),
						};
					}
					return f;
				});
			};
			setFiles((prev) => addToPath(prev, currentPath));
		}
		setNewFolderName("");
		setNewFolderOpen(false);
	};

	const displayedFiles = getCurrentFiles().filter(
		(f) =>
			searchQuery === "" ||
			f.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const folders = displayedFiles.filter((f) => f.type === "folder");
	const regularFiles = displayedFiles.filter((f) => f.type !== "folder");

	const sectionTitle =
		SIDEBAR_ITEMS.find((s) => s.id === selectedSection)?.label ||
		"Mis Archivos";

	return (
		<AdminLayout>
			<div className="flex h-[calc(100vh-8rem)] gap-0 -m-6 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
				{/* Folder Sidebar */}
				<div className="flex w-56 flex-shrink-0 flex-col border-r border-border bg-muted/30">
					<div className="space-y-1 p-3">
						<Dialog open={newFolderOpen} onOpenChange={setNewFolderOpen}>
							<div className="flex gap-1.5">
								<DialogTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="flex-1 gap-1.5"
									>
										<Plus className="h-3.5 w-3.5" />
										Nueva carpeta
									</Button>
								</DialogTrigger>
								<Button size="sm" className="gap-1.5">
									<Upload className="h-3.5 w-3.5" />
									Subir
								</Button>
							</div>
							<DialogContent className="sm:max-w-[360px]">
								<DialogHeader>
									<DialogTitle>Nueva carpeta</DialogTitle>
								</DialogHeader>
								<div className="grid gap-3 py-2">
									<div className="grid gap-1.5">
										<Label htmlFor="folder-name">Nombre de la carpeta</Label>
										<Input
											id="folder-name"
											placeholder="Sin título"
											value={newFolderName}
											onChange={(e) => setNewFolderName(e.target.value)}
											onKeyDown={(e) =>
												e.key === "Enter" && handleCreateFolder()
											}
											autoFocus
										/>
									</div>
								</div>
								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setNewFolderOpen(false)}
									>
										Cancelar
									</Button>
									<Button
										onClick={handleCreateFolder}
										disabled={!newFolderName.trim()}
									>
										Crear
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<ScrollArea className="flex-1">
						<nav className="space-y-0.5 px-2 pb-2">
							{SIDEBAR_ITEMS.map((item) => {
								const Icon = item.icon;
								return (
									<button
										key={item.id}
										type="button"
										onClick={() => {
											setSelectedSection(item.id);
											setCurrentPath([]);
											setSelectedFile(null);
										}}
										className={cn(
											"flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
											selectedSection === item.id
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										)}
									>
										<Icon className="h-4 w-4 flex-shrink-0" />
										<span className="flex-1 text-left">{item.label}</span>
										{item.count !== null && item.count > 0 && (
											<Badge
												variant={
													selectedSection === item.id ? "outline" : "secondary"
												}
												className="h-5 min-w-5 justify-center px-1.5 text-xs"
											>
												{item.count}
											</Badge>
										)}
									</button>
								);
							})}
						</nav>

						<Separator className="my-2" />

						<div className="px-4 pb-4">
							<p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
								Almacenamiento
							</p>
							<div className="space-y-1.5">
								<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
									<div
										className="h-full rounded-full bg-primary transition-all"
										style={{ width: `${STORAGE_USED}%` }}
									/>
								</div>
								<p className="text-xs text-muted-foreground">
									6.8 GB de 10 GB usados
								</p>
							</div>
						</div>
					</ScrollArea>
				</div>

				{/* Main Content */}
				<div className="flex flex-1 flex-col overflow-hidden">
					{/* Toolbar */}
					<div className="flex items-center gap-3 border-b border-border px-4 py-3">
						<div className="flex flex-1 items-center gap-2 min-w-0">
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink
											href="#"
											onClick={(e) => {
												e.preventDefault();
												setCurrentPath([]);
												setSelectedSection("myfiles");
											}}
											className="text-sm"
										>
											{sectionTitle}
										</BreadcrumbLink>
									</BreadcrumbItem>
									{currentPath.map((part, index) => (
										<React.Fragment key={part}>
											<BreadcrumbSeparator>
												<ChevronRight className="h-3.5 w-3.5" />
											</BreadcrumbSeparator>
											<BreadcrumbItem>
												{index === currentPath.length - 1 ? (
													<BreadcrumbPage className="text-sm">
														{part}
													</BreadcrumbPage>
												) : (
													<BreadcrumbLink
														href="#"
														onClick={(e) => {
															e.preventDefault();
															navigateToBreadcrumb(index + 1);
														}}
														className="text-sm"
													>
														{part}
													</BreadcrumbLink>
												)}
											</BreadcrumbItem>
										</React.Fragment>
									))}
								</BreadcrumbList>
							</Breadcrumb>
						</div>
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Buscar archivos..."
								className="pl-8 h-9 w-56"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex rounded-md border border-border overflow-hidden">
							<Button
								variant={viewMode === "grid" ? "default" : "ghost"}
								size="icon"
								className="h-9 w-9 rounded-none border-0"
								onClick={() => setViewMode("grid")}
							>
								<Grid3X3 className="h-4 w-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "ghost"}
								size="icon"
								className="h-9 w-9 rounded-none border-0"
								onClick={() => setViewMode("list")}
							>
								<LayoutList className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<ScrollArea className="flex-1">
						<div className="p-4">
							{displayedFiles.length === 0 ? (
								<div className="flex h-48 flex-col items-center justify-center gap-3 text-muted-foreground">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
										<Folder className="h-8 w-8" />
									</div>
									<div className="text-center">
										<p className="font-medium">Esta carpeta está vacía</p>
										<p className="text-sm">
											Sube archivos o crea una nueva carpeta
										</p>
									</div>
								</div>
							) : (
								<>
									{/* Folders Section */}
									{folders.length > 0 && (
										<div className="mb-6">
											{regularFiles.length > 0 && (
												<h3 className="mb-3 text-sm font-medium text-muted-foreground">
													Carpetas
												</h3>
											)}
											{viewMode === "grid" ? (
												<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
													{folders.map((item) => (
														<FileGridCard
															key={item.id}
															item={item}
															isSelected={selectedFile?.id === item.id}
															onSingleClick={() => setSelectedFile(item)}
															onDoubleClick={() => handleItemDoubleClick(item)}
															onToggleStar={() => toggleStar(item.id)}
														/>
													))}
												</div>
											) : (
												<div className="overflow-hidden rounded-lg border border-border">
													{folders.map((item, index) => (
														<FileListRow
															key={item.id}
															item={item}
															isSelected={selectedFile?.id === item.id}
															isLast={index === folders.length - 1}
															onClick={() => setSelectedFile(item)}
															onDoubleClick={() => handleItemDoubleClick(item)}
															onToggleStar={() => toggleStar(item.id)}
														/>
													))}
												</div>
											)}
										</div>
									)}

									{/* Files Section */}
									{regularFiles.length > 0 && (
										<div>
											{folders.length > 0 && (
												<h3 className="mb-3 text-sm font-medium text-muted-foreground">
													Archivos
												</h3>
											)}
											{viewMode === "grid" ? (
												<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
													{regularFiles.map((item) => (
														<FileGridCard
															key={item.id}
															item={item}
															isSelected={selectedFile?.id === item.id}
															onSingleClick={() => setSelectedFile(item)}
															onDoubleClick={() => handleItemDoubleClick(item)}
															onToggleStar={() => toggleStar(item.id)}
														/>
													))}
												</div>
											) : (
												<div className="overflow-hidden rounded-lg border border-border">
													{regularFiles.map((item, index) => (
														<FileListRow
															key={item.id}
															item={item}
															isSelected={selectedFile?.id === item.id}
															isLast={index === regularFiles.length - 1}
															onClick={() => setSelectedFile(item)}
															onDoubleClick={() => handleItemDoubleClick(item)}
															onToggleStar={() => toggleStar(item.id)}
														/>
													))}
												</div>
											)}
										</div>
									)}
								</>
							)}
						</div>
					</ScrollArea>
				</div>

				{/* File Detail Panel */}
				{selectedFile && (
					<div className="flex w-64 flex-shrink-0 flex-col border-l border-border bg-muted/20">
						<div className="flex items-center justify-between border-b border-border px-4 py-3">
							<span className="text-sm font-medium">Detalles</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7"
								onClick={() => setSelectedFile(null)}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
						<ScrollArea className="flex-1">
							<div className="p-4">
								<div className="mb-4 flex justify-center">
									{getFileIcon(selectedFile.type, "h-16 w-16")}
								</div>
								<h3 className="mb-1 text-center text-sm font-semibold break-all">
									{selectedFile.name}
								</h3>
								{selectedFile.size && (
									<p className="mb-4 text-center text-xs text-muted-foreground">
										{selectedFile.size}
									</p>
								)}

								<div className="mb-4 flex gap-2">
									<Button
										size="sm"
										className="flex-1 gap-1.5"
										variant="outline"
									>
										<Share2 className="h-3.5 w-3.5" />
										Compartir
									</Button>
									{selectedFile.type !== "folder" && (
										<Button
											size="sm"
											className="flex-1 gap-1.5"
											variant="outline"
										>
											<Download className="h-3.5 w-3.5" />
											Descargar
										</Button>
									)}
								</div>

								<Separator className="my-3" />

								<div className="space-y-3 text-sm">
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
											Tipo
										</p>
										<p className="font-medium">
											{selectedFile.type === "folder"
												? "Carpeta"
												: selectedFile.type.toUpperCase()}
										</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
											Modificado
										</p>
										<p className="font-medium">
											{formatDate(selectedFile.modified)}
										</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
											Propietario
										</p>
										<p className="font-medium">{selectedFile.owner}</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
											Ubicación
										</p>
										<p className="font-medium text-xs break-all">
											{selectedFile.path}
										</p>
									</div>
									{selectedFile.shared && (
										<div className="flex items-center gap-2 rounded-md bg-muted p-2.5">
											<Users className="h-4 w-4 text-muted-foreground" />
											<span className="text-xs text-muted-foreground">
												Compartido con el equipo
											</span>
										</div>
									)}
									{selectedFile.starred && (
										<div className="flex items-center gap-2 rounded-md bg-yellow-50 dark:bg-yellow-950/30 p-2.5">
											<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
											<span className="text-xs text-muted-foreground">
												Marcado como destacado
											</span>
										</div>
									)}
								</div>

								<Separator className="my-3" />

								<div className="space-y-1">
									<Button
										variant="ghost"
										size="sm"
										className="w-full justify-start gap-2 text-sm"
									>
										<Link2 className="h-4 w-4" />
										Copiar enlace
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="w-full justify-start gap-2 text-sm text-destructive hover:text-destructive"
									>
										<Trash2 className="h-4 w-4" />
										Eliminar
									</Button>
								</div>
							</div>
						</ScrollArea>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}

interface FileGridCardProps {
	item: FileItem;
	isSelected: boolean;
	onSingleClick: () => void;
	onDoubleClick: () => void;
	onToggleStar: () => void;
}

function FileGridCard({
	item,
	isSelected,
	onSingleClick,
	onDoubleClick,
	onToggleStar,
}: FileGridCardProps) {
	return (
		<Card
			className={cn(
				"group cursor-pointer transition-all hover:shadow-md",
				isSelected && "ring-2 ring-primary shadow-md"
			)}
			onClick={onSingleClick}
			onDoubleClick={onDoubleClick}
		>
			<CardContent className="p-3">
				<div className="relative mb-2 flex justify-center pt-2">
					{getFileIcon(item.type)}
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onToggleStar();
						}}
						className={cn(
							"absolute right-0 top-0 rounded-full p-0.5 transition-all",
							item.starred
								? "text-yellow-400 opacity-100"
								: "text-muted-foreground opacity-0 group-hover:opacity-100"
						)}
					>
						<Star
							className={cn("h-3.5 w-3.5", item.starred && "fill-yellow-400")}
						/>
					</button>
				</div>
				<div className="space-y-0.5">
					<p
						className="truncate text-center text-xs font-medium leading-tight"
						title={item.name}
					>
						{item.name}
					</p>
					{item.size && (
						<p className="text-center text-[10px] text-muted-foreground">
							{item.size}
						</p>
					)}
				</div>
				{item.shared && (
					<div className="mt-1.5 flex justify-center">
						<Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
							<Users className="mr-1 h-2.5 w-2.5" />
							Compartido
						</Badge>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

interface FileListRowProps {
	item: FileItem;
	isSelected: boolean;
	isLast: boolean;
	onClick: () => void;
	onDoubleClick: () => void;
	onToggleStar: () => void;
}

function FileListRow({
	item,
	isSelected,
	isLast,
	onClick,
	onDoubleClick,
	onToggleStar,
}: FileListRowProps) {
	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: interactive row with dropdown buttons inside prevents using button element */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: double-click folder navigation not mappable to a single key event */}
			<div
				className={cn(
					"group flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/50",
					isSelected && "bg-primary/10"
				)}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
			>
				{getFileIconSmall(item.type)}
				<span className="flex-1 truncate text-sm font-medium" title={item.name}>
					{item.name}
				</span>
				<div className="hidden items-center gap-4 sm:flex">
					{item.shared && (
						<Badge variant="secondary" className="h-5 text-xs">
							<Users className="mr-1 h-3 w-3" />
							Compartido
						</Badge>
					)}
					<span className="w-24 text-right text-xs text-muted-foreground">
						{item.size || "—"}
					</span>
					<span className="w-32 text-right text-xs text-muted-foreground">
						{formatDate(item.modified)}
					</span>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onToggleStar();
						}}
						className={cn(
							"transition-all",
							item.starred
								? "text-yellow-400"
								: "text-muted-foreground opacity-0 group-hover:opacity-100"
						)}
					>
						<Star
							className={cn("h-4 w-4", item.starred && "fill-yellow-400")}
						/>
					</button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
								onClick={(e) => e.stopPropagation()}
							>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-40">
							<DropdownMenuItem>
								<Share2 className="mr-2 h-4 w-4" />
								Compartir
							</DropdownMenuItem>
							{item.type !== "folder" && (
								<DropdownMenuItem>
									<Download className="mr-2 h-4 w-4" />
									Descargar
								</DropdownMenuItem>
							)}
							<DropdownMenuItem>
								<Link2 className="mr-2 h-4 w-4" />
								Copiar enlace
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								<Trash2 className="mr-2 h-4 w-4" />
								Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{!isLast && <Separator />}
		</>
	);
}
