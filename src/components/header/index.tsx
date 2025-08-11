import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export function Header() {
  return (
    <View className="bg-white pt-4 pb-2 px-1 shadow-sm">
      <View className="w-full flex-row justify-between items-center mb-4">
        <Image
          source={require('../../assets/images/logo-corae.png')}
          className="h-12 w-24"
        />

        <View>
          <Text className="text-center text-gray-500 text-xs">Entregar em</Text>
          <Pressable className="flex-row items-center gap-1">
            <Text className="font-bold text-sm">R. Lorem Ipsum, 123</Text>
            <Ionicons name="chevron-down" size={16} color="#624e33" />
          </Pressable>
        </View>

        <View/>

        <Pressable>
          <Feather name="shopping-cart" size={24} color="#624e33" />
        </Pressable>
      </View>
    </View>
  );
}