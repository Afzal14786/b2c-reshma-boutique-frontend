import { useState, useEffect, useCallback } from 'react';
import { authApi, userApi } from '../api';
import { User } from '../types';
import { setRefreshTokenFn } from '../api/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTokens = useCallback(async () => {
    try {
      const res = await authApi.refresh();
      const newToken = res.data.accessToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', newToken);
      }
      return newToken;
    } catch {
      return '';
    }
  }, []);

  useEffect(() => {
    setRefreshTokenFn(refreshTokens);

    const loadUser = async () => {
      try {
        const res = await userApi.getProfile();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [refreshTokens]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login({ email, password });
      const { accessToken, user } = res.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
      }
      setUser(user);
      return user;
    },
    []
  );

  const register = useCallback(async (data: any) => {
    const res = await authApi.register(data);
    return res.data;
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    const res = await authApi.verifyOtp({ email, otp });
    return res.data;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    login,
    register,
    verifyOtp,
    logout,
    refreshTokens,
  };
};