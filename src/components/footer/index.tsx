import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Footer() {
  return (
    <View className="bg-white pt-4 pb-4 px-4 flex flex-row">
        <View className="flex-1 flex-row justify-between items-center">
          <Pressable className='items-center pl-5'>
            <Ionicons name="home-outline" size={16} color="#624e33" />
            <Text className="font-bold text-sm" style={{ color: "#624e33" }}>Home</Text>
          </Pressable>
          <Pressable className='items-center'>
            <Ionicons name="heart-outline" size={16} color="#624e33" />
            <Text className="font-bold text-sm" style={{ color: "#624e33" }}>Favoritos</Text>
          </Pressable>
          <Pressable className='items-center'>
            <Ionicons name="receipt-outline" size={16} color="#624e33" />
            <Text className="font-bold text-sm" style={{ color: "#624e33" }}>Pedidos</Text>
          </Pressable>
          <Pressable className='items-center pr-5'>
            <Ionicons name="person-outline" size={16} color="#624e33" />
            <Text className="font-bold text-sm" style={{ color: "#624e33" }}>Perfil</Text>
          </Pressable>
        </View>
    </View>
  );
}