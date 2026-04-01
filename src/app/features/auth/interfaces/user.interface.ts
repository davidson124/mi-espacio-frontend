export interface User {
  _id: string;
  urlimage?: string;
  role: 'admin' | 'architect' | 'user';
  name: string;
  lastName: string;
  telephone?: string;
  cellphoneNumber?: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
