import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function HeaderFavorite() {
  return (
    <View className='flex flex-row w-full justify-between items-center px-4 py-2 bg-white'>
      <Ionicons name="arrow-back" size={24} color="black" />
      <Text className="font-bold text-lg" style={{ color: "black" }}>Favoritos</Text>
      <Ionicons name="person-outline" size={24} color="transparent" />
    </View>
  );
}