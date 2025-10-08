import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Simula carregamento inicial (poderia ser persistência com AsyncStorage/SecureStore)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock simples de login
    if (!email || !password) {
      Alert.alert("Erro", "Informe e-mail e senha.");
      return;
    }
    // Em produção, chame sua API aqui
    setUser({ id: "1", name: email.split("@")[0] || "Usuário", email });
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    // Em produção, chame sua API aqui
    setUser({ id: "1", name, email });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
