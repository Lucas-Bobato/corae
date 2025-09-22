import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface RestaurantsProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  contact: string;
}

export function RestaurantCard(props: RestaurantsProps) {
  return (
    <Pressable className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-5">
      <Image
        source={{ uri: `https://picsum.photos/seed/${props.name}/400` }}
        className="w-full h-32"
      />
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          {props.name}
        </Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="location-outline" size={16} color="#4B5563" />
          <Text className="text-sm text-gray-600 ml-2 flex-1">{props.address}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="call-outline" size={16} color="#4B5563" />
          <Text className="text-sm text-gray-600 ml-2">{props.phone}</Text>
        </View>
      </View>
    </Pressable>
  );
}