import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '../../components/header';
import { FoodListItem } from '../../components/food/list';
import { FoodProps } from '../../components/food/card';
import { RestaurantsProps } from '../../components/restaurants/list';

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [restaurant, setRestaurant] = useState<RestaurantsProps | null>(null);
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const restaurantResponse = await fetch(`http://10.1.1.20:3000/restaurants/${id}`);
        if (!restaurantResponse.ok) throw new Error('Erro ao buscar detalhes do restaurante');
        const restaurantData: RestaurantsProps = await restaurantResponse.json();
        setRestaurant(restaurantData);

        const foodsResponse = await fetch(`http://10.1.1.20:3000/foods?restaurantId=${id}`);
        if (!foodsResponse.ok) throw new Error('Erro ao buscar comidas do restaurante');
        const foodsData: FoodProps[] = await foodsResponse.json();
        setFoods(foodsData);

      } catch (err) {
        setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7D9C4A" />
      </View>
    );
  }

  if (error || !restaurant) {
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
            {restaurant.name}
          </Text>
        }
        rightComponent={
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#7D9C4A" />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/food/${item.id}`)}
            className="px-4"
          >
            <FoodListItem {...item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View className="p-4">
            <Image
              source={{ uri: restaurant.image }}
              className="w-full h-48 rounded-lg"
            />
            <Text className="text-2xl font-bold mt-4">{restaurant.name}</Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="star" size={16} color="#7D9C4A" />
              <Text className="text-sm text-[#7D9C4A] font-semibold mx-1">
                {restaurant.rating}
              </Text>
              <Text className="text-sm text-black/50">({restaurant.reviewsCount})</Text>
            </View>
            <Text className="text-lg font-bold mt-6 mb-2">Cardápio</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
