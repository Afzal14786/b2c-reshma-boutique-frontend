import { apiClient } from './client';
import {
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest,
  GoogleLoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  User,
} from '../types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  verifyOtp: (data: VerifyOtpRequest) =>
    apiClient.post<AuthResponse>('/auth/verify-otp', data),

  googleLogin: (data: GoogleLoginRequest) =>
    apiClient.post<AuthResponse>('/auth/google', data),

  refresh: () => apiClient.get<{ accessToken: string }>('/auth/refresh'),

  logout: () => apiClient.get('/auth/logout'),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post('/auth/reset-password', data),
};