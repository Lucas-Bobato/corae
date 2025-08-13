import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function Footer() {
  const router = useRouter();

  return (
    <View className="bg-white pt-4 pb-4 px-4 flex flex-row">
      <View className="flex-1 flex-row justify-between items-center">
        <TouchableOpacity
          className='items-center pl-5'
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={16} color="#adc472" />
          <Text className="font-bold text-sm" style={{ color: "#adc472" }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/favorite')}
        >
          <Ionicons name="heart-outline" size={16} color="#adc472" />
          <Text className="font-bold text-sm" style={{ color: "#adc472" }}>Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/pedidos')}
        >
          <Ionicons name="receipt-outline" size={16} color="#adc472" />
          <Text className="font-bold text-sm" style={{ color: "#adc472" }}>Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className='items-center pr-5'
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={16} color="#adc472" />
          <Text className="font-bold text-sm" style={{ color: "#adc472" }}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}