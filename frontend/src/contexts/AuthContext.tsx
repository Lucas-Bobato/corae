import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "../services/api";

type User = {
  id: number;
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

const USER_STORAGE_KEY = "@corae:user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega usuário do AsyncStorage ao iniciar
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert("Erro", "Informe e-mail e senha.");
      throw new Error("Email e senha são obrigatórios");
    }

    try {
      const response = await api.login(email, password);
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
      };
      
      setUser(userData);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error: any) {
      console.error("Erro no login:", error);
      const errorMessage = error.message || "Não foi possível fazer login. Verifique suas credenciais.";
      Alert.alert("Erro no Login", errorMessage);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      throw new Error("Todos os campos são obrigatórios");
    }

    try {
      const response = await api.register(name, email, password);
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
      };
      
      setUser(userData);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error: any) {
      console.error("Erro no registro:", error);
      const errorMessage = error.message || "Não foi possível criar a conta.";
      Alert.alert("Erro no Cadastro", errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
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
