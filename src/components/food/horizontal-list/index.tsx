import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FoodProps } from '../card';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../../contexts/CartContext';

interface FoodListProps {
  foods: FoodProps[];
}

export function FoodHorizontalList({ foods }: FoodListProps) {
  const router = useRouter();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = (food: FoodProps) => {
    addToCart(food);
    Alert.alert('Adicionado!', `${food.name} foi adicionado ao seu carrinho.`);
  };

  return (
    <View className="my-4">
      <Text className="text-xl font-bold mb-2 px-4">Recomendado para você</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        renderItem={({ item }) => (
          <View className="mr-4 w-56 bg-white rounded-lg shadow-lg overflow-hidden">
            <TouchableOpacity onPress={() => router.push(`/food/${item.id}`)}>
              <Image source={{ uri: item.image }} className="w-full h-28" />
              <View className="p-3">
                <Text className="text-sm font-bold" numberOfLines={1}>{item.name}</Text>
                <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>{item.description}</Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row justify-between items-center p-3 border-t border-gray-100">
              <Text className="text-base font-bold text-[#7D9C4A]">R$ {item.price}</Text>
              <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                className="bg-[#7D9C4A] p-2 rounded-full"
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
