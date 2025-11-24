import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/header";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/auth/login" as any);
  };

  if (!user) {
    router.replace("/auth/login" as any);
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7F1" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F1" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
        }
        centerComponent={<Text className="font-semibold text-lg text-gray-900">Meu perfil</Text>}
        rightComponent={<View className="w-6" />}
      />
      <View className="flex-1 px-6 pt-6">
        <View className="bg-white rounded-3xl p-6 shadow-sm items-center">
          <View className="w-20 h-20 rounded-full bg-[#EAF3D7] items-center justify-center">
            <Text className="text-2xl font-semibold text-[#7D9C4A]">{initials}</Text>
          </View>
          <Text className="text-xl font-semibold text-gray-900 mt-4">{user.name}</Text>
          <Text className="text-sm text-gray-500 mt-1">{user.email}</Text>

          <View className="w-full mt-6 space-y-3">
            <View className="flex-row items-center justify-between bg-gray-100 rounded-2xl px-4 py-3">
              <View className="flex-row items-center">
                <View className="bg-white rounded-full p-2 mr-3">
                  <Ionicons name="star" size={18} color="#F59E0B" />
                </View>
                <Text className="text-sm text-gray-700">Avaliações enviadas</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
            <View className="flex-row items-center justify-between bg-gray-100 rounded-2xl px-4 py-3">
              <View className="flex-row items-center">
                <View className="bg-white rounded-full p-2 mr-3">
                  <Ionicons name="heart" size={18} color="#EF4444" />
                </View>
                <Text className="text-sm text-gray-700">Favoritos (em breve)</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </View>

          <TouchableOpacity onPress={handleLogout} className="bg-[#7D9C4A] rounded-full items-center justify-center py-3 px-10 mt-8" activeOpacity={0.85}>
            <Text className="text-white font-semibold">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}