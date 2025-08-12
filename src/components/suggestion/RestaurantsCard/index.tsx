import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface RestaurantsProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewsCount: string;
  isVerified: boolean;
  isFavorite: boolean;
  categories: string[];
  distance: string;
  status: string;
  waitTime: string;
}

export function RestaurantCard(props: RestaurantsProps) {
  return (
    <Pressable className="w-full flex-row items-center mb-5">
      <Image
        source={{ uri: props.image }}
        className="w-20 h-20 rounded-lg mr-4"
      />

      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800 mb-1">
          {props.name}
        </Text>
        
        <View className="flex-row items-center">
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text className="text-sm text-gray-700 font-semibold mx-1">
            {props.rating}
          </Text>
          <Text className="text-sm text-gray-500">• {props.reviewsCount}</Text>
        </View>
      </View>

      <View>
        <Ionicons
          name={props.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={props.isFavorite ? '#E53935' : '#757575'}
        />
      </View>
    </Pressable>
  );
}