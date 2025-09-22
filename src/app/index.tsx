import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/header';
import { RestaurantCard, RestaurantsProps } from '../components/restaurants/list';
import db from '../../db.json';

export default function RestaurantsScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantsProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetchRestaurants() {
      try {
        const fetchedRestaurants = db.restaurants as RestaurantsProps[];
        setRestaurants(fetchedRestaurants);
        setFilteredRestaurants(fetchedRestaurants);
      } catch (err) {
        setError('Não foi possível carregar a lista de restaurantes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery, restaurants]);

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

    if (filteredRestaurants.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center mt-5 px-5 text-gray-500">
            Nenhum restaurante encontrado com o nome "{searchQuery}".
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredRestaurants}
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
      <View className="px-4 mt-4">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#7D9C4A" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-700"
            placeholder="Buscar por nome do restaurante..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
}
