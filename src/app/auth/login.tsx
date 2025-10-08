import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import "nativewind";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
    router.replace("/");
  };

  return (
    <SafeAreaView className="w-full flex-1 pt-4 mb-auto">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-3xl font-bold mb-8">Login</Text>
        <TextInput
          className="h-12 w-full border border-gray-300 rounded-lg px-4 mb-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="h-12 w-full border border-gray-300 rounded-lg px-4 mb-4"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-[#7D9C4A] h-12 w-full rounded-lg items-center justify-center"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-bold">Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push('./register')}
        >
          <Text className="text-primary text-center">
            Não tem uma conta? <Text className="font-bold">Crie uma</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
