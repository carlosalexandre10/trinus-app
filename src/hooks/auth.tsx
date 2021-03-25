import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface UserAuth {
  id: string;
  nome: string;
}

interface AuthState {
  token: string;
  usuario: UserAuth;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  dados: AuthState;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Trinus:token');
    const usuario = localStorage.getItem('@Trinus:usuario');

    if (token && usuario) {
      return { token, usuario: JSON.parse(usuario) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('logar', {
      email,
      senha,
    });

    const { token, usuario } = response.data;

    localStorage.setItem('@Trinus:token', token.token);
    localStorage.setItem('@Trinus:usuario', JSON.stringify(usuario));

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Trinus:token');
    localStorage.removeItem('@Trinus:usuario');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ dados: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('O hook useAuth deve ser utilizado com AuthProvider');
  }

  return context;
};
