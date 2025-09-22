import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';
import { RestaurantCard, RestaurantsProps } from '../components/restaurants/list';
import db from '../../db.json';

export default function RestaurantsScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetchRestaurants() {
      try {
        setRestaurants(db.restaurants as RestaurantsProps[]);
      } catch (err) {
        setError('Não foi possível carregar a lista de restaurantes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  function renderContent() {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7D9C4A" />
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center mt-5 px-5 text-gray-500">{error}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/restaurant/${item.id}`)}>
            <RestaurantCard {...item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <SafeAreaView className="w-full flex-1 pt-4 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={<View className="w-6" />}
        centerComponent={
          <Text className="font-bold text-xl text-black">Restaurantes</Text>
        }
        rightComponent={<View className="w-6" />}
      />
      {renderContent()}
    </SafeAreaView>
  );
}
