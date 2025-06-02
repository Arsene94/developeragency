export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  last_login: string;
  created_at: string;
  updated_at: string;
}
