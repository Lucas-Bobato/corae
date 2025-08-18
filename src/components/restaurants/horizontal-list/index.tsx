import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { RestaurantsProps } from '../list';
import { Ionicons } from '@expo/vector-icons';

interface RestaurantListProps {
  restaurants: RestaurantsProps[];
}

export function RestaurantHorizontalList({ restaurants }: RestaurantListProps) {
  const router = useRouter();

  return (
    <View className="my-4">
      <Text className="text-xl font-bold mb-2 px-4">Restaurantes</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/restaurant/${item.id}`)}
            className="mr-4 w-64 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image source={{ uri: item.image }} className="w-full h-32" />
            <View className="p-3">
              <Text className="text-base font-bold" numberOfLines={1}>{item.name}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={14} color="#FFC700" />
                <Text className="text-xs text-gray-600 ml-1">{item.rating} ({item.reviewsCount})</Text>
              </View>
              <Text className="text-xs text-gray-500 mt-1">{item.mainTag} • {item.distance}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
