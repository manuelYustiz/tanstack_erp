# Contributing to TanStack ERP

Thank you for your interest in contributing to TanStack ERP! This guide will help you get started with the development process and understand our contribution standards.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [SOLID Principles](#solid-principles)
- [Architecture Guidelines](#architecture-guidelines)
- [Code Standards](#code-standards)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- **Node.js 18+** - Required for running the development environment
- **npm** - Package manager (yarn is also supported)
- **Git** - Version control

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/tanstack_erp.git
   cd tanstack_erp
   ```

2. **Install Dependencies with Exact Versions**
   ```bash
   npm install
   ```
   
   ⚠️ **Important**: This project uses **exact version pinning** for all dependencies. Always install packages with exact versions to ensure consistent behavior across all environments:
   
   ```bash
   # For production dependencies
   npm install --save-exact package-name@x.x.x
   
   # For development dependencies
   npm install --save-dev --save-exact package-name@x.x.x
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Setup**
   ```bash
   npm run lint
   npm run build
   ```

## SOLID Principles

This project adheres to **SOLID principles** to ensure maintainable, scalable, and robust code. Please follow these guidelines:

### 1. Single Responsibility Principle (SRP)
- Each component, hook, and utility should have a single, well-defined purpose
- Separate data fetching, business logic, and UI concerns
- Example: Keep API calls in `services/`, UI logic in `components/`, and state management in `hooks/`

### 2. Open/Closed Principle (OCP)
- Design components and functions to be open for extension but closed for modification
- Use composition over inheritance
- Leverage TypeScript interfaces and generic types for extensibility
- Example: Create reusable base components that can be extended through props

### 3. Liskov Substitution Principle (LSP)
- Ensure that derived types can replace their base types without altering functionality
- Maintain consistent interfaces across similar components
- Example: All form input components should implement the same base interface

### 4. Interface Segregation Principle (ISP)
- Create specific, focused interfaces rather than large, monolithic ones
- Avoid forcing components to depend on interfaces they don't use
- Example: Separate read and write interfaces for data operations

### 5. Dependency Inversion Principle (DIP)
- Depend on abstractions, not concrete implementations
- Use dependency injection and context providers
- Example: Components should depend on service interfaces, not specific API implementations

## Architecture Guidelines

### Screaming Architecture

This project follows **Screaming Architecture** where the folder structure reflects the business domain:

```
src/
├── features/          # Feature-based modules (business logic)
│   ├── auth/         # Single responsibility: Authentication
│   ├── dashboard/    # Single responsibility: Dashboard functionality
│   ├── users/        # Single responsibility: User management
│   └── products/     # Single responsibility: Product management
├── shared/           # Shared utilities and components
│   ├── components/   # Reusable UI components (ISP)
│   ├── hooks/        # Custom React hooks (SRP)
│   ├── utils/        # Utility functions (SRP)
│   ├── types/        # TypeScript interfaces (ISP)
│   ├── api/          # API abstractions (DIP)
│   └── i18n/         # Internationalization
└── routes/           # TanStack Router definitions
```

### Feature Structure

Each feature should follow this structure:

```
features/feature-name/
├── components/       # Feature-specific UI components
├── hooks/           # Feature-specific React hooks
├── services/        # API calls and business logic (DIP)
├── types/           # Feature-specific TypeScript types (ISP)
├── utils/           # Feature-specific utilities (SRP)
└── index.ts         # Public API exports (ISP)
```

### Guidelines for New Features

1. **Start with types** - Define clear interfaces before implementation
2. **Separate concerns** - Keep API logic, business logic, and UI logic separate
3. **Use composition** - Build complex features from simple, reusable components
4. **Export cleanly** - Only export what other features need through `index.ts`

## Code Standards

### TypeScript
- **Strict mode enabled** - All TypeScript strict checks are enforced
- **No `any` types** - Use proper typing or `unknown` with type guards
- **Interface over type** - Prefer interfaces for object shapes
- **Generic constraints** - Use generic constraints for reusable components

### React
- **Functional components** - Use function components with hooks
- **Custom hooks** - Extract reusable logic into custom hooks (SRP)
- **Props interfaces** - Define clear interfaces for all component props (ISP)
- **Composition** - Prefer composition over prop drilling

### Styling
- **Tailwind CSS** - Use utility-first approach
- **Responsive design** - Mobile-first responsive implementation
- **Design system** - Follow established component patterns

### Code Formatting
- **Biome** - We use Biome for both linting and formatting (replaces ESLint + Prettier)
- **Automatic formatting** - Code is automatically formatted on save (if VSCode is configured)

#### Available Commands
```bash
# Check code quality
npm run lint

# Fix automatically fixable issues
npm run lint:fix

# Format code
npm run format
```

## Internationalization

### Adding New Languages

1. **Create message file**
   ```bash
   src/shared/locales/{locale}/messages.json
   ```

2. **Update locale configuration**
   ```typescript
   // src/shared/i18n/index.ts
   export const AVAILABLE_LOCALES = ['en', 'es', 'new-locale'];
   ```

3. **Update type definitions**
   ```typescript
   type SupportedLocale = 'en' | 'es' | 'new-locale';
   ```

### Message Guidelines
- Use **descriptive keys** that indicate context
- Keep messages **locale-neutral** in structure
- Use **ICU MessageFormat** for complex formatting
- Group related messages by feature

## API Integration

### Using Axios with TanStack Query

This project uses **Axios** for HTTP requests and **TanStack Query** for data synchronization. When adding API integrations:

1. **Use the configured axios client** from `src/shared/api`
2. **Create service interfaces** for each feature following DIP
3. **Integrate with TanStack Query** for caching and state management

### Creating API Services

Follow these steps when creating new API integrations:

1. **Define types first** (ISP)
   ```typescript
   // features/example/types/index.ts
   export interface ExampleItem {
     id: string;
     name: string;
   }

   export interface ExampleService {
     getItems(): Promise<ExampleItem[]>;
     createItem(item: Omit<ExampleItem, 'id'>): Promise<ExampleItem>;
   }
   ```

2. **Implement the service** (DIP)
   ```typescript
   // features/example/services/exampleService.ts
   import type { ApiClient } from '@/shared/api';
   import type { ExampleService, ExampleItem } from '../types';

   export const createExampleService = (apiClient: ApiClient): ExampleService => ({
     async getItems() {
       return apiClient.get<ExampleItem[]>('/examples');
     },
     
     async createItem(item) {
       return apiClient.post<ExampleItem>('/examples', item);
     },
   });
   ```

3. **Create React hooks** (SRP)
   ```typescript
   // features/example/hooks/useExample.ts
   import { useQuery, useMutation } from '@tanstack/react-query';
   import { createApiClient } from '@/shared/api';
   import { createExampleService } from '../services/exampleService';

   export const useExample = () => {
     const service = createExampleService(createApiClient());

     const { data: items, isLoading } = useQuery({
       queryKey: ['examples'],
       queryFn: () => service.getItems(),
     });

     const createMutation = useMutation({
       mutationFn: service.createItem,
     });

     return {
       items,
       isLoading,
       createItem: createMutation.mutate,
     };
   };
   ```

### API Best Practices

- **Always use TypeScript types** for requests and responses
- **Handle errors gracefully** using the provided error utilities
- **Use TanStack Query** for data fetching (don't use `useEffect` for API calls)
- **Invalidate queries** after mutations to keep data fresh
- **Follow REST conventions** for endpoint naming
- **Keep services pure** - no direct React dependencies in service files

### Error Handling

Use the provided error utilities for consistent error handling:

```typescript
import { getApiError, isAxiosError } from '@/shared/api';

try {
  const data = await apiClient.get('/endpoint');
} catch (error) {
  const apiError = getApiError(error);
  console.error('API Error:', apiError.message);
  
  if (isAxiosError(error)) {
    // Handle specific HTTP status codes
    if (error.response?.status === 404) {
      // Handle not found
    }
  }
}
```

## Testing

### Test Organization
- Place tests next to the files they test with `.test.ts` or `.test.tsx` extensions
- Follow the **Arrange, Act, Assert** pattern
- Use **descriptive test names** that explain the expected behavior

### Testing Principles (SOLID Applied)
- **SRP**: Each test should verify one specific behavior
- **OCP**: Write tests that are resilient to implementation changes
- **ISP**: Mock only the interfaces your component actually uses
- **DIP**: Test against interfaces, not concrete implementations

## Pull Request Process

### Before Submitting

1. **Run quality checks**
   ```bash
   npm run lint
   npm run format
   npm run build
   ```

2. **Test your changes**
   - Verify functionality works as expected
   - Check responsive design
   - Test internationalization if applicable

3. **Update documentation** if you've:
   - Added new features
   - Changed APIs
   - Modified configuration

### PR Guidelines

1. **Clear title and description**
   - Use descriptive titles
   - Explain the problem and solution
   - Reference any related issues

2. **Small, focused changes**
   - Follow the **Single Responsibility Principle** for PRs
   - Make one logical change per PR
   - Separate refactoring from feature changes

3. **Code review checklist**
   - [ ] Follows SOLID principles
   - [ ] Uses exact version dependencies
   - [ ] Includes proper TypeScript types
   - [ ] Follows established patterns
   - [ ] No linting errors
   - [ ] Builds successfully

## Troubleshooting

### Common Issues

**Linting errors**: Run `npm run lint:fix` to automatically fix many issues

**Build failures**: Ensure all dependencies are installed with exact versions

**TypeScript errors**: Check that all imports and types are properly defined

**Internationalization issues**: Verify message keys exist in all locale files

### Getting Help

- Check existing issues on GitHub
- Review the README.md for setup instructions
- Look at existing code patterns for examples
- Ask questions in pull request discussions

## Code Examples

### Creating a New Feature

```typescript
// features/example/types/index.ts (ISP)
export interface ExampleItem {
  id: string;
  name: string;
  description: string;
}

export interface ExampleService {
  getItems(): Promise<ExampleItem[]>;
  createItem(item: Omit<ExampleItem, 'id'>): Promise<ExampleItem>;
}

// features/example/services/exampleService.ts (DIP)
import type { ApiClient } from '@/shared/api';
import type { ExampleService, ExampleItem } from '../types';

export const createExampleService = (apiClient: ApiClient): ExampleService => ({
  async getItems() {
    return apiClient.get<ExampleItem[]>('/examples');
  },
  
  async createItem(item) {
    return apiClient.post<ExampleItem>('/examples', item);
  },
});

// features/example/hooks/useExample.ts (SRP)
import { useQuery, useMutation } from '@tanstack/react-query';
import type { ExampleService } from '../types';

export const useExample = (service: ExampleService) => {
  const { data: items, isLoading } = useQuery({
    queryKey: ['examples'],
    queryFn: () => service.getItems(),
  });

  const createMutation = useMutation({
    mutationFn: service.createItem,
  });

  return {
    items,
    isLoading,
    createItem: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};

// features/example/components/ExampleList.tsx (SRP, OCP)
import type { ExampleItem } from '../types';

interface ExampleListProps {
  items: ExampleItem[];
  onItemClick?: (item: ExampleItem) => void;
}

export const ExampleList = ({ items, onItemClick }: ExampleListProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className="p-4 border rounded cursor-pointer hover:bg-gray-50"
        >
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};
```

Thank you for contributing to TanStack ERP! Your adherence to these guidelines helps maintain code quality and ensures a positive experience for all contributors.