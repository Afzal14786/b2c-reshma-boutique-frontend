import { User } from './user.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  acceptPrivacyPolicy: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}


export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}