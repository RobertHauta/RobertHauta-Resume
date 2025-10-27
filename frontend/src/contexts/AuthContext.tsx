import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '../types/auth';
import { apiClient } from '../services/api';
import { notifications } from '@mantine/notifications';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const currentUser = await apiClient.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          apiClient.clearToken();
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ username: email, password });
      apiClient.setToken(response.access_token);
      setToken(response.access_token);

      const currentUser = await apiClient.getCurrentUser();
      setUser(currentUser);

      notifications.show({
        title: 'Success',
        message: 'Logged in successfully!',
        color: 'green',
      });
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.detail || 'Failed to login',
        color: 'red',
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, fullName?: string) => {
    try {
      await apiClient.register({ email, password, full_name: fullName });

      notifications.show({
        title: 'Success',
        message: 'Account created! Please login.',
        color: 'green',
      });

      // Auto-login after registration
      await login(email, password);
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.detail || 'Failed to register',
        color: 'red',
      });
      throw error;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setToken(null);
    setUser(null);
    notifications.show({
      title: 'Success',
      message: 'Logged out successfully',
      color: 'blue',
    });
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};