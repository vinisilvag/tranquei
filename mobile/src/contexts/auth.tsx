import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  active: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = !!data?.token;

  useEffect(() => {
    async function loadStoragedData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@tranquei:token',
        '@tranquei:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setIsLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = async (credentials: SignInCredentials): Promise<void> => {
    const response = await api.post('/session', credentials);

    const { token, user } = response.data;

    setData({
      token,
      user,
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    await AsyncStorage.setItem('@tranquei:user', JSON.stringify(user));
    await AsyncStorage.setItem('@tranquei:token', token);
  };

  const signOut = async (): Promise<void> => {
    await AsyncStorage.clear().then(() => {
      setData({} as AuthState);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: data.user, isLoading, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
