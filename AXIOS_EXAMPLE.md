# Axios with TanStack Query - Complete Example

This document provides a complete, working example of using Axios with TanStack Query in the TanStack ERP project.

## Example: User Management Feature

### 1. Define Types (Interface Segregation Principle)

```typescript
// src/features/users/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
}

export interface UserService {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: string, data: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
```

### 2. Implement the Service (Dependency Inversion Principle)

```typescript
// src/features/users/services/userService.ts
import type { ApiClient } from '@/shared/api';
import type { User, CreateUserDto, UpdateUserDto, UserService } from '../types';

export const createUserService = (apiClient: ApiClient): UserService => ({
  async getUsers() {
    return apiClient.get<User[]>('/users');
  },

  async getUserById(id: string) {
    return apiClient.get<User>(`/users/${id}`);
  },

  async createUser(data: CreateUserDto) {
    return apiClient.post<User>('/users', data);
  },

  async updateUser(id: string, data: UpdateUserDto) {
    return apiClient.patch<User>(`/users/${id}`, data);
  },

  async deleteUser(id: string) {
    return apiClient.delete<void>(`/users/${id}`);
  },
});
```

### 3. Create React Hooks (Single Responsibility Principle)

```typescript
// src/features/users/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiClient, getApiError } from '@/shared/api';
import { createUserService } from '../services/userService';
import type { CreateUserDto, UpdateUserDto } from '../types';

export const useUsers = () => {
  const queryClient = useQueryClient();
  const userService = createUserService(createApiClient());

  // Fetch all users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  // Create user mutation
  const createUser = useMutation({
    mutationFn: (data: CreateUserDto) => userService.createUser(data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      const apiError = getApiError(error);
      console.error('Failed to create user:', apiError.message);
    },
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) => 
      userService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Update the user in the cache
      queryClient.setQueryData(['users', updatedUser.id], updatedUser);
      // Invalidate the users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users,
    isLoading,
    error,
    createUser: createUser.mutate,
    updateUser: updateUser.mutate,
    deleteUser: deleteUser.mutate,
    isCreating: createUser.isPending,
    isUpdating: updateUser.isPending,
    isDeleting: deleteUser.isPending,
  };
};

// Hook for fetching a single user
export const useUser = (id: string) => {
  const userService = createUserService(createApiClient());

  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // Only fetch if id is provided
  });
};
```

### 4. Use in Components

```typescript
// src/features/users/components/UsersList.tsx
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import type { CreateUserDto } from '../types';

export const UsersList = () => {
  const { users, isLoading, createUser, deleteUser, isCreating } = useUsers();
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    role: 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(formData, {
      onSuccess: () => {
        // Reset form after successful creation
        setFormData({ name: '', email: '', role: 'user' });
        alert('User created successfully!');
      },
      onError: (error) => {
        alert('Failed to create user');
      },
    });
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>

      {/* Create User Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <h3 className="text-xl mb-3">Create New User</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={isCreating}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isCreating ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>

      {/* Users List */}
      <div className="space-y-2">
        {users?.map((user) => (
          <div key={user.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.email}</p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">{user.role}</span>
            </div>
            <button
              onClick={() => {
                if (confirm(`Delete user ${user.name}?`)) {
                  deleteUser(user.id);
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

```typescript
// src/features/users/components/UserDetail.tsx
import { useUser } from '../hooks/useUsers';

interface UserDetailProps {
  userId: string;
}

export const UserDetail = ({ userId }: UserDetailProps) => {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error loading user: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
```

## Testing with Mock API

For development and testing, you can use a mock API endpoint. Here's how to set it up with environment variables:

```env
# .env.development
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Error Handling Example

```typescript
import { getApiError, isAxiosError } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

const createUser = useMutation({
  mutationFn: (data: CreateUserDto) => userService.createUser(data),
  onError: (error) => {
    const apiError = getApiError(error);
    
    // Generic error message
    console.error('Error:', apiError.message);
    
    // Check if it's an Axios error for more specific handling
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          alert('Invalid user data. Please check your input.');
          break;
        case 409:
          alert('User with this email already exists.');
          break;
        case 500:
          alert('Server error. Please try again later.');
          break;
        default:
          alert('Failed to create user. Please try again.');
      }
    }
  },
});
```

## Benefits of This Approach

1. **Type Safety**: Full TypeScript support throughout the stack
2. **Separation of Concerns**: Services, hooks, and components have distinct responsibilities
3. **Testability**: Each layer can be tested independently
4. **Reusability**: Services can be used in multiple hooks, hooks in multiple components
5. **Caching**: TanStack Query automatically caches data and handles refetching
6. **Optimistic Updates**: Easy to implement optimistic UI updates
7. **Error Handling**: Centralized and consistent error handling

## Next Steps

1. Add loading states and error boundaries to your components
2. Implement optimistic updates for better UX
3. Add pagination and filtering to your queries
4. Set up proper error logging (e.g., Sentry)
5. Add unit tests for services and hooks
