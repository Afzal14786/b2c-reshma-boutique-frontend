import { apiClient } from './client';
import {
  User,
  Address,
  UpdateProfileRequest,
  AddAddressRequest,
  UpdateAddressRequest,
  UpdatePasswordRequest,
} from '../types';

export const userApi = {
  // Profile
  getProfile: () =>
    apiClient.get<{ user: User }>('/users/profile'),

  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.patch<{ user: User }>('/users/profile', data),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiClient.post<{ user: User }>('/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Addresses
  addAddress: (data: AddAddressRequest) =>
    apiClient.post<{ addresses: Address[] }>('/users/profile/addresses', data),

  updateAddress: (addressId: string, data: UpdateAddressRequest) =>
    apiClient.patch<{ addresses: Address[] }>(`/users/profile/addresses/${addressId}`, data),

  deleteAddress: (addressId: string) =>
    apiClient.delete<{ addresses: Address[] }>(`/users/profile/addresses/${addressId}`),

  // Security
  requestPasswordOtp: () =>
    apiClient.post<{ message: string }>('/users/profile/security/password/otp'),

  updatePassword: (data: UpdatePasswordRequest) =>
    apiClient.patch<{ message: string }>('/users/profile/security/password', data),

  // Account deletion / export
  deleteAccount: () =>
    apiClient.delete<{ message: string }>('/users/profile'),

  exportData: () =>
    apiClient.post<{ message: string }>('/users/profile/export'),

  // Wishlist (can be separate but we include here)
  getWishlist: () =>
    apiClient.get<{ wishlist: any }>('/wishlists'), // we'll use wishlistApi separately if needed
};