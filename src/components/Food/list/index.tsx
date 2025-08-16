import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodProps } from '../card';

export function FoodListItem(props: FoodProps) {
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
          <Text className="text-sm text-[#7D9C4A] font-semibold mx-1">
            {props.rating}
          </Text>
          <Ionicons name="star" size={16} color="#7D9C4A" />
          <Text className="text-sm text-black/50">• {props.reviewsCount}</Text>
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