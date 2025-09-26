# TanStack ERP

A modern ERP system built with Vite, React, TypeScript, Biome, and TanStack Router using screaming architecture.

## Features

- ⚡ **Vite** - Fast development and builds
- ⚛️ **React** - Modern UI library with hooks
- 🔷 **TypeScript** - Type safety and better developer experience
- 🧹 **Biome** - Fast linter and formatter (replacing ESLint + Prettier)
- 🚦 **TanStack Router** - Type-safe routing with excellent developer experience
- 📁 **Screaming Architecture** - Feature-based organization for better maintainability

## Architecture

This project follows the **Screaming Architecture** pattern, where the folder structure screams about the business domain rather than technical implementation:

```
src/
├── features/          # Feature-based modules (the main business logic)
│   ├── auth/         # Authentication feature
│   ├── dashboard/    # Dashboard feature
│   ├── users/        # User management feature
│   └── products/     # Product management feature
├── shared/           # Shared utilities across features
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript type definitions
│   ├── constants/    # Application constants
│   ├── api/          # API utilities and configurations
│   └── styles/       # Global styles
├── pages/            # Page components (if needed for complex layouts)
├── layouts/          # Layout components
└── routes/           # TanStack Router route definitions
```

Each feature folder contains:
- `components/` - Feature-specific components
- `hooks/` - Feature-specific custom hooks
- `services/` - API calls and business logic
- `types/` - Feature-specific types
- `utils/` - Feature-specific utilities

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Building

Build for production:
```bash
npm run build
```

### Linting and Formatting

Check code quality:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

Format code:
```bash
npm run format
```

## Project Structure Benefits

### Screaming Architecture
- **Feature-focused**: Each feature is self-contained with its own components, hooks, services, etc.
- **Scalable**: Easy to add new features without affecting existing ones
- **Team-friendly**: Multiple developers can work on different features simultaneously
- **Domain-driven**: The structure reflects the business domain, making it easier to understand

### Technology Choices
- **Biome over ESLint + Prettier**: Faster, single tool for linting and formatting
- **TanStack Router**: Type-safe routing with excellent developer experience
- **Vite**: Significantly faster than Create React App for development and builds

## Routes

- `/` - Home page with project overview
- `/dashboard` - Main dashboard with statistics
- `/users` - User management interface
- `/products` - Product management interface

## Contributing

1. Follow the existing folder structure
2. Use Biome for code formatting and linting
3. Ensure TypeScript types are properly defined
4. Keep features isolated and self-contained
