import { User } from './user.types';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RegistrationApiPayload {
  email: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  password: string;
  confirmPassword: string;
  termsAccepted?: boolean;
}

export interface LoginApiPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    role: string;
    token: string;
  };
}

