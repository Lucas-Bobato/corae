import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { RestaurantCard, RestaurantProps } from './RestaurantCard';

export function Suggestion() {
  const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('http://10.1.1.35:3000/restaurants');
        const data: RestaurantProps[] = await response.json();
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
        data={restaurants.filter(item => item.status === 'Aberto')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard {...item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='px-4'
      />
    );
  }

  return (
    <View className='px-4'>
      <Text className='font-bold text-xl color-gray mb-4 pt-8'>Sugestões para você</Text>
      {renderContent()}
    </View>
  );
}