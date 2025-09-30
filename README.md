# TanStack ERP

A modern ERP system built with Vite, React, TypeScript, Biome, and TanStack Router using screaming architecture. Now featuring comprehensive internationalization support with FormatJS.

## Features

- ⚡ **Vite** - Fast development and builds
- ⚛️ **React** - Modern UI library with hooks
- 🔷 **TypeScript** - Type safety and better developer experience
- 🧹 **Biome** - Fast linter and formatter (replacing ESLint + Prettier)
- 🚦 **TanStack Router** - Type-safe routing with excellent developer experience
- 🔄 **TanStack Query** - Powerful data synchronization for React
- 📝 **TanStack Form** - Type-safe, performant forms for React
- 🌐 **Axios** - Promise-based HTTP client for API requests
- 🛠️ **Developer Tools** - Integrated devtools for Router, Query, and Form
- 🌍 **Internationalization** - Multi-language support with FormatJS/react-intl
- 🕒 **Day.js with Timezone Support** - Lightweight date library with comprehensive timezone handling
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
│   ├── i18n/         # Internationalization configuration
│   ├── locales/      # Translation message files
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

## API Integration with Axios and TanStack Query

This project uses **Axios** as the HTTP client, fully integrated with **TanStack Query** for powerful data fetching and caching capabilities.

### Features

- **Configured Axios Client**: Pre-configured instance with interceptors
- **Request Interceptors**: Automatic authentication token injection
- **Response Interceptors**: Global error handling
- **Type-safe API Client**: TypeScript interfaces for all API operations
- **TanStack Query Ready**: Utilities designed to work seamlessly with TanStack Query
- **Error Handling**: Comprehensive error extraction and handling utilities

### Basic Usage

#### Using the API Client Directly

```tsx
import { apiClient } from './shared/api';

// GET request
const response = await apiClient.get('/users');
const users = response.data;

// POST request
const response = await apiClient.post('/users', { name: 'John Doe' });
const newUser = response.data;
```

#### Using with TanStack Query

```tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from './shared/api';

function UsersList() {
  // Fetch users with TanStack Query
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.get('/users');
      return response.data;
    },
  });

  // Create user mutation
  const createUser = useMutation({
    mutationFn: async (userData) => {
      const response = await apiClient.post('/users', userData);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

#### Using the Helper API Client

The helper API client automatically extracts data from responses:

```tsx
import { createApiClient } from './shared/api';

const api = createApiClient();

// Data is automatically extracted
const users = await api.get<User[]>('/users');
const newUser = await api.post<User>('/users', { name: 'John Doe' });
```

#### Error Handling

```tsx
import { getApiError, isAxiosError } from './shared/api';
import { useMutation } from '@tanstack/react-query';

function CreateUserForm() {
  const createUser = useMutation({
    mutationFn: async (userData) => {
      const response = await apiClient.post('/users', userData);
      return response.data;
    },
    onError: (error) => {
      const apiError = getApiError(error);
      console.error('Error creating user:', apiError.message);
      
      if (isAxiosError(error) && error.response?.status === 409) {
        // Handle conflict error
        alert('User already exists');
      }
    },
  });

  // ... rest of component
}
```

### Creating Feature Services

Following the Dependency Inversion Principle, create service interfaces for each feature:

```tsx
// features/users/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserService {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  createUser(user: Omit<User, 'id'>): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

// features/users/services/userService.ts
import type { ApiClient } from '@/shared/api';
import type { User, UserService } from '../types';

export const createUserService = (apiClient: ApiClient): UserService => ({
  async getUsers() {
    return apiClient.get<User[]>('/users');
  },
  
  async getUserById(id: string) {
    return apiClient.get<User>(`/users/${id}`);
  },
  
  async createUser(user: Omit<User, 'id'>) {
    return apiClient.post<User>('/users', user);
  },
  
  async updateUser(id: string, user: Partial<User>) {
    return apiClient.patch<User>(`/users/${id}`, user);
  },
  
  async deleteUser(id: string) {
    return apiClient.delete<void>(`/users/${id}`);
  },
});

// features/users/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiClient } from '@/shared/api';
import { createUserService } from '../services/userService';

export const useUsers = () => {
  const queryClient = useQueryClient();
  const userService = createUserService(createApiClient());

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  const createUser = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users,
    isLoading,
    createUser: createUser.mutate,
    isCreating: createUser.isPending,
  };
};
```

### Configuration

Set your API base URL using environment variables:

```env
VITE_API_BASE_URL=https://api.example.com
```

If not set, the default is `/api`.

### API Client Configuration

The axios client is configured with:
- **Base URL**: From `VITE_API_BASE_URL` environment variable or `/api`
- **Timeout**: 10 seconds
- **Headers**: `Content-Type: application/json`
- **Auth Token**: Automatically added from localStorage if available

### Available Utilities

- `apiClient` - Configured axios instance
- `createApiClient()` - Helper client that auto-extracts response data
- `getApiError(error)` - Extract structured error information
- `getErrorMessage(error)` - Get simple error message string
- `isAxiosError(error)` - Type guard for axios errors

## Internationalization (i18n)

This project includes comprehensive internationalization support using FormatJS (react-intl).

### Supported Languages

- 🇺🇸 **English** - Default language
- 🇪🇸 **Spanish** - Complete translation coverage

### Features

- **Language Switching**: Users can switch languages via the dropdown selector in the UI
- **Persistent Preferences**: Language selection is saved to localStorage
- **Locale-aware Formatting**: Numbers, dates, and currency are formatted according to the selected locale
- **Type-safe Messages**: Full TypeScript support for translation keys and values
- **React Integration**: Easy-to-use hooks and components for internationalized content

### Usage

#### Using FormattedMessage Components
```tsx
import { FormattedMessage } from 'react-intl';

function MyComponent() {
  return (
    <h1>
      <FormattedMessage id="app.welcome" />
    </h1>
  );
}
```

#### Using Hooks for Dynamic Content
```tsx
import { useIntl } from 'react-intl';

function MyComponent() {
  const intl = useIntl();
  
  const message = intl.formatMessage({ id: 'app.description' });
  return <p>{message}</p>;
}
```

#### Using Locale-aware Formatters
```tsx
import { useFormatters } from './shared/hooks/useFormatters';

function MyComponent() {
  const { formatCurrency, formatDate } = useFormatters();
  
  return (
    <div>
      <p>Price: {formatCurrency(1234.56)}</p>
      <p>Date: {formatDate(new Date())}</p>
    </div>
  );
}
```

### Adding New Languages

1. Create a new message file in `src/shared/locales/{locale}/messages.json`
2. Add the locale to `AVAILABLE_LOCALES` in `src/shared/i18n/index.ts`
3. Update the `SupportedLocale` type to include the new locale

### Message Files Structure

Translation files are located in `src/shared/locales/` with the following structure:
```
src/shared/locales/
├── en/
│   └── messages.json
└── es/
    └── messages.json
```

## Date and Time Handling

This project uses **Day.js** with comprehensive timezone support for all date and time operations.

### Features

- **Timezone-aware Formatting**: Automatic detection and handling of user timezones
- **Multiple Format Options**: Date, DateTime, and relative time formatting
- **Internationalization**: Date formats that respect locale preferences
- **Lightweight**: Day.js is only 2kB minified, much lighter than Moment.js
- **Timezone Persistence**: User timezone preferences are saved to localStorage

### Usage

#### Using the useFormatters Hook

```tsx
import { useFormatters } from './shared/hooks/useFormatters';

function MyComponent() {
  const { formatDate, formatDateTime, formatRelativeTime } = useFormatters();
  
  const now = new Date();
  
  return (
    <div>
      <p>Date: {formatDate(now)}</p>
      <p>DateTime: {formatDateTime(now)}</p>
      <p>Relative: {formatRelativeTime(now)}</p>
    </div>
  );
}
```

#### Using Timezone-specific Formatting

```tsx
import { useFormatters } from './shared/hooks/useFormatters';

function MyComponent() {
  const { formatDateTime } = useFormatters('America/New_York');
  
  return <p>NYC Time: {formatDateTime(new Date())}</p>;
}
```

#### Using Timezone Utilities Directly

```tsx
import dayjs, { 
  formatDateWithTimezone, 
  convertTimezone, 
  getCurrentTimestamp,
  COMMON_TIMEZONES 
} from './shared/utils/dayjs';

function TimezoneExample() {
  const utcTime = dayjs().utc();
  const nyTime = convertTimezone(utcTime, 'UTC', 'America/New_York');
  const formatted = formatDateWithTimezone(new Date(), 'YYYY-MM-DD HH:mm:ss', 'Europe/Madrid');
  
  return (
    <div>
      <p>UTC: {utcTime.format()}</p>
      <p>NY Time: {nyTime.format()}</p>
      <p>Madrid Time: {formatted}</p>
    </div>
  );
}
```

#### Managing User Timezone

```tsx
import { useTimezone } from './shared/hooks/useTimezone';
import { COMMON_TIMEZONES } from './shared/utils/dayjs';

function TimezoneSelector() {
  const { timezone, setTimezone, detectedTimezone } = useTimezone();
  
  return (
    <div>
      <p>Current: {timezone}</p>
      <p>Detected: {detectedTimezone}</p>
      <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        {COMMON_TIMEZONES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
```

### Available Timezone Utilities

- `getLocalTimezone()` - Detect user's timezone
- `formatDateWithTimezone()` - Format date in specific timezone
- `convertTimezone()` - Convert between timezones
- `getCurrentTimestamp()` - Get current time in timezone
- `isValidTimezone()` - Validate timezone string
- `COMMON_TIMEZONES` - List of common timezones for UI

## Project Structure Benefits

### Screaming Architecture
- **Feature-focused**: Each feature is self-contained with its own components, hooks, services, etc.
- **Scalable**: Easy to add new features without affecting existing ones
- **Team-friendly**: Multiple developers can work on different features simultaneously
- **Domain-driven**: The structure reflects the business domain, making it easier to understand

### Internationalization Benefits
- **Global Ready**: Built-in support for multiple languages and locales
- **User Experience**: Seamless language switching with persistent preferences
- **Developer Experience**: Type-safe translations and locale-aware formatting utilities
- **Extensible**: Easy to add new languages and regions as the application grows

### Technology Choices
- **Biome over ESLint + Prettier**: Faster, single tool for linting and formatting
- **TanStack Router**: Type-safe routing with excellent developer experience
- **TanStack Query**: Powerful data synchronization and caching for React applications
- **TanStack Form**: Type-safe, performant forms with built-in validation
- **FormatJS (react-intl)**: Industry-standard internationalization library with powerful formatting capabilities
- **Vite**: Significantly faster than Create React App for development and builds
- **Full TanStack DevTools**: Integrated debugging tools for Router, Query, and Form

## VSCode Configuration

This project includes shared VSCode configuration for consistent development experience:

### Automatic Setup
- **Format on Save**: Automatically formats code using Biome when saving files
- **Code Actions on Save**: Organizes imports and applies quick fixes
- **Extensions**: Recommended extensions are automatically suggested

### Recommended Extensions
- **Biome**: Primary linter and formatter (replaces ESLint + Prettier)
- **Tailwind CSS IntelliSense**: Enhanced Tailwind CSS support
- **TypeScript**: Latest TypeScript language features
- **Auto Rename Tag**: Automatically renames paired HTML/JSX tags
- **Path Intellisense**: Autocompletes filenames

### Configuration Files
- `.vscode/settings.json`: Editor settings and formatter configuration
- `.vscode/extensions.json`: Recommended and unwanted extensions
- `.vscode/tasks.json`: Predefined tasks for development commands
- `.vscode/launch.json`: Debug configuration for Chrome

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
