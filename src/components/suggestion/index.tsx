import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { FoodCard, FoodProps } from '../food/card';

export function Suggestion() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const response = await fetch('http://10.1.1.7:3000/foods');
        const data: FoodProps[] = await response.json();
        setFoods(data);
      } catch (err) {
        setError('Erro ao carregar alimentos');
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
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
        data={foods.filter(item => item.status === 'Aberto')}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <FoodCard {...item} />}
      />
    );
  }

  return (
    <View className='px-4 flex flex-col'>
      <Text className='font-bold text-xl color-gray mb-4'>Recomendados para você</Text>
      {renderContent()}
    </View>
  );
}