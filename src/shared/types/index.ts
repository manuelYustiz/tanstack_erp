// Shared types across the application
export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User" | "Manager";
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
