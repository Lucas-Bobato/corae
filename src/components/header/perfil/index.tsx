import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function HeaderPerfil() {
  const router = useRouter();

  return (
    <View className='flex flex-row w-full justify-between items-center px-4 py-2 bg-white'>
      <Pressable onPress={() => router.push('/home')}>
      <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text className="font-bold text-lg" style={{ color: "black" }}>Perfil</Text>
      <Ionicons name="person-outline" size={24} color="transparent" />
    </View>
  );
}