import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-3xl font-bold mb-8">Criar conta</Text>
        <TextInput
          className="h-12 w-full border border-gray-300 rounded-lg px-4 mb-4"
          placeholder="Nome de usuário"
          autoCapitalize="none"
        />
        <TextInput
          className="h-12 w-full border border-gray-300 rounded-lg px-4 mb-4"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="h-12 w-full border border-gray-300 rounded-lg px-4 mb-4"
          placeholder="Senha"
          secureTextEntry
        />
        <TouchableOpacity
          className="bg-[#7D9C4A] h-12 w-full rounded-lg items-center justify-center"
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text className="text-white text-lg font-bold">Criar conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push('/login')}
        >
          <Text className="text-center">
            Já tem uma conta? <Text className="font-bold">Entre</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
