import { View, Text, Pressable } from 'react-native';
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
    <Pressable className="w-full bg-white rounded-lg border border-gray-200 p-4 mb-4 flex-row items-center">
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {props.name}
        </Text>
        <View className="flex-row items-center mb-1">
          <Ionicons name="location-outline" size={16} color="#4B5563" />
          <Text className="text-sm text-gray-600 ml-2 flex-1" numberOfLines={1} ellipsizeMode="tail">
            {props.address}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="call-outline" size={16} color="#4B5563" />
          <Text className="text-sm text-gray-600 ml-2">{props.phone}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#7D9C4A" />
    </Pressable>
  );
}