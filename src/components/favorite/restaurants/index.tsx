import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RestaurantsProps, RestaurantCard } from '../../restaurants/list';
import { useRouter } from 'expo-router';
import db from '../../../../db.json';

export function FavoriteRestaurants() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetchRestaurants() {
      try {
        setRestaurants(db.restaurants);
      } catch (err) {
        setError('Erro ao carregar restaurantes');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  function renderContent() {
      if (loading) {
        return <ActivityIndicator size="large" color="#333" />;
      }
      if (error) {
        return <Text className='text-center mt-5 px-5 text-gray-500'>{error}</Text>;
      }

      const favoriteRestaurants = restaurants.filter(item => item.isFavorite);

      if (favoriteRestaurants.length === 0) {
        return <Text className='text-center mt-5 px-5 text-gray-500'>Você ainda não tem restaurantes favoritos.</Text>;
      }

      return (
        <FlatList
          data={favoriteRestaurants}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/restaurant/${item.id}`)}>
              <RestaurantCard {...item} />
            </TouchableOpacity>
          )}
        />
      );
    }

    return (
      <View className='flex-1'>
        {renderContent()}
      </View>
    );
  }