export type AuthProvider = 'LOCAL' | 'GOOGLE';
export type UserRole = 'ADMIN' | 'USER';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

// =================== Address ===================

export interface Address {
  id: string;                 // MongoDB ObjectId
  street: string;
  city: string;
  state: string;
  pincode: string;            // 6-digit Indian PIN
  label: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
}

// =================== User Preferences ===================

export interface UserPreferences {
  newsletter: boolean;
  smsAlerts: boolean;
  privacyPolicyAcceptedAt?: string; // ISO date
}

// =================== User ===================

export interface User {
  id: string;                        // MongoDB ObjectId
  authProvider: AuthProvider;
  googleId?: string;                 // Only for Google OAuth users
  email: string;
  password?: string;                 // Never sent to client (omitted by backend)
  role: UserRole;

  firstname: string;
  lastname: string;
  phone?: string;                    // 10-digit Indian mobile number
  avatar?: string;                   // Cloudinary URL
  gender?: Gender;
  dob?: string;                      // ISO date (YYYY-MM-DD)

  addresses: Address[];
  wishlist: string[];                // Array of product IDs
  razorpayCustomerId?: string;       // Razorpay vault ID
  loyaltyPoints: number;

  preferences: UserPreferences;
  isEmailVerified: boolean;
  isActive: boolean;                 // Soft-delete flag
  lastLogin?: string;                // ISO date

  createdAt: string;                 // ISO date
  updatedAt: string;                 // ISO date
}

// =================== DTOs (Request Payloads) ===================

// 1. Profile Update
export interface UpdateProfileRequest {
  firstname?: string;
  lastname?: string;
  phone?: string;           // 10-digit Indian format (must match regex)
  gender?: Gender;
  dob?: string;             // ISO date (e.g., "1990-01-01")
}

// 2. Address Management
export interface AddAddressRequest {
  street: string;
  city: string;
  state: string;
  pincode: string;          // exactly 6 digits
  label: 'HOME' | 'WORK' | 'OTHER';
  isDefault?: boolean;      // defaults to false
}

export type UpdateAddressRequest = Partial<AddAddressRequest>;

// 3. Security & Password
export interface UpdatePasswordRequest {
  otp: string;              // 6‑digit OTP (sent to email)
  currentPassword: string;
  newPassword: string;      // min 8 chars, at least one uppercase, one digit, one special char
}

// 4. Account Deletion & Data Export (no extra payload)
// DELETE  /users/profile
// POST   /users/profile/export

// 5. Avatar Upload (multipart/form-data with key "avatar")
// POST   /users/profile/avatar