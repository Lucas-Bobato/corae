import { View, Text, Image, ImageBackground, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface FoodProps {
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
  layout?: 'card' | 'list';
}

// Função card como padrão
export function FoodCard({ layout = 'card', ...props }: FoodProps) {

  // Card Favoritos

  if (layout === 'list') {
    return (
      <Pressable className="w-full flex-row items-center mb-5">
        <Image
          source={{ uri: props.image }}
          className="w-20 h-20 rounded-lg mr-4 overflow-hidden justify-between p-1"
        />
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-800 mb-1" numberOfLines={1}>
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


  // Card da home

  return (
    <View className='w-64 bg-white rounded-lg border border-gray-200 mr-4 shadow-sm'>
      <ImageBackground
        source={{ uri: props.image }}
        className='w-full h-32 justify-between'
        imageStyle={{ borderRadius: 8 }}
      >
        <View className='flex-row justify-between p-2'>
          {props.isVerified && (
            <View className='flex-row items-center bg-green-600 px-2 py-1 rounded-full'>
              <Ionicons name="checkmark-circle" size={14} color="#FFF" />
              <Text className='text-white text-xs font-bold ml-1'>Verificado</Text>
            </View>
          )}
          <Ionicons
            name={props.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={props.isFavorite ? '#E51D37' : '#FFF'}
            className='text-shadow'
          />
        </View>
      </ImageBackground>
      <View className='p-3'>
        <Text className='font-bold text-lg'>{props.name}</Text>
        <View className='flex-row items-center'>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text className='ml-1'>{props.rating}</Text>
          <Text className='ml-2 text-gray-500'>{props.reviewsCount}</Text>
        </View>
        <Text className='text-gray-600 text-xs'>
          {props.distance} • {props.waitTime}
        </Text>
      </View>
    </View>
  );
}