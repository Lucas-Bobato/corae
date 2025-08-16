import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '../../components/header';
import { FoodProps } from '../../components/food/card';

export default function FoodDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [food, setFood] = useState<FoodProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchFood() {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`http://10.1.1.20:3000/foods/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes da comida');
        }
        const data: FoodProps = await response.json();
        setFood(data);
      } catch (err) {
        setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchFood();
  }, [id]);

  const handleAddToCart = () => {
    router.push('/cart');
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7D9C4A" />
      </View>
    );
  }

  if (error || !food) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-4 bg-white">
        <Text className="text-center text-gray-500">{error}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-[#7D9C4A] py-2 px-4 rounded">
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="w-full flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text className="font-bold text-xl text-black" numberOfLines={1} ellipsizeMode="tail">
            {food.name}
          </Text>
        }
        rightComponent={
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#7D9C4A" />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: food.image }} className="w-full h-64" />
        <View className="p-4">
          <Text className="text-2xl font-bold">{food.name}</Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={16} color="#7D9C4A" />
            <Text className="text-sm text-[#7D9C4A] font-semibold mx-1">
              {food.rating}
            </Text>
            <Text className="text-sm text-black/50">{food.reviewsCount}</Text>
          </View>
          <Text className="text-gray-600 mt-4 text-base">
            {/* PlaceHolder pq ainda não tem descrição no db de teste (SUBSTITUIR DEPOIS) */}
            Uma deliciosa e refrescante salada Caesar, com alface romana, croutons, queijo parmesão e um molho especial.
          </Text>
          <View className="flex-row justify-between items-center mt-6">
            <Text className="text-3xl font-bold text-[#7D9C4A]">
              R$ {food.price}
            </Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity onPress={decrementQuantity} className="p-2 bg-gray-200 rounded-full">
                <Ionicons name="remove" size={20} color="black" />
              </TouchableOpacity>
              <Text className="text-xl font-bold">{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity} className="p-2 bg-gray-200 rounded-full">
                <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-[#7D9C4A] h-12 rounded-lg items-center justify-center"
        >
          <Text className="text-white text-lg font-bold">Adicionar à Sacola</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
