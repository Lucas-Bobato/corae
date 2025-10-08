import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface RestaurantsProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  contact: string;
}

interface RestaurantCardProps extends RestaurantsProps {
  averageRating?: number;
  reviewCount?: number;
}

export function RestaurantCard({
  name,
  address,
  phone,
  averageRating = 0,
  reviewCount = 0,
}: RestaurantCardProps) {
  return (
    <Pressable className="w-full bg-white rounded-3xl px-5 py-4 mb-4 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-semibold text-gray-900" numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>
          <View className="flex-row items-start mt-3">
            <View className="bg-[#EAF3D7] rounded-full p-2">
              <Ionicons name="location-outline" size={16} color="#7D9C4A" />
            </View>
            <Text className="text-sm text-gray-600 ml-2 flex-1" numberOfLines={2} ellipsizeMode="tail">
              {address}
            </Text>
          </View>
          {!!phone && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="call-outline" size={16} color="#7D9C4A" />
              <Text className="text-sm text-gray-600 ml-2" numberOfLines={1} ellipsizeMode="tail">
                {phone}
              </Text>
            </View>
          )}
        </View>
        <View className="items-end">
          <View className="flex-row items-center bg-[#FDF6E7] rounded-full px-3 py-1">
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text className="ml-1 text-sm font-semibold text-[#B45309]">
              {averageRating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-xs text-gray-400 mt-1">{reviewCount} avaliações</Text>
          <View className="mt-4 bg-[#EAF3D7] rounded-full p-2">
            <Ionicons name="chevron-forward" size={16} color="#7D9C4A" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}