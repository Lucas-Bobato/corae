import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function Footer() {
  const router = useRouter();

  return (
    <View className="bg-white pt-4 pb-4 px-2 flex flex-row">
      <View className="flex-1 flex-row justify-around items-center">
        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={24} color="#7D9C4A" />
          <Text className="font-bold text-xs mt-1" style={{ color: "#7D9C4A" }}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/restaurants')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#7D9C4A" />
          <Text className="font-bold text-xs mt-1" style={{ color: "#7D9C4A" }}>Restaurantes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/favorite')}
        >
          <Ionicons name="heart-outline" size={24} color="#7D9C4A" />
          <Text className="font-bold text-xs mt-1" style={{ color: "#7D9C4A" }}>Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/pedidos')}
        >
          <Ionicons name="receipt-outline" size={24} color="#7D9C4A" />
          <Text className="font-bold text-xs mt-1" style={{ color: "#7D9C4A" }}>Pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className='items-center'
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={24} color="#7D9C4A" />
          <Text className="font-bold text-xs mt-1" style={{ color: "#7D9C4A" }}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}