import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">Welcome to TanStack ERP</h1>
      <p className="mt-4">
        This is a modern ERP system built with Vite, React, TypeScript, Biome,
        and TanStack Router using screaming architecture.
      </p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Features:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>⚡ Vite for fast development and builds</li>
          <li>⚛️ React with TypeScript for type safety</li>
          <li>🧹 Biome for linting and formatting</li>
          <li>🚦 TanStack Router for type-safe routing</li>
          <li>📁 Screaming architecture for feature-based organization</li>
        </ul>
      </div>
    </div>
  );
}
