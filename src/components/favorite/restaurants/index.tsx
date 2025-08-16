import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { RestaurantsProps, RestaurantCard } from '../../restaurants/list';

export function FavoriteRestaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('http://10.1.1.20:3000/restaurants');
        const data: RestaurantsProps[] = await response.json();
        setRestaurants(data);
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

      return (
        <FlatList
          data={restaurants.filter(item => item.isFavorite === true)}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <RestaurantCard {...item} />}
        />
      );
    }

    return (
      <View className='px-4 flex flex-col'>
        {renderContent()}
      </View>
    );
  }