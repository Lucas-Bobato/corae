import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { FoodProps, FoodCard } from '../../suggestion/FoodCard';

export function FavoriteFoods() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const response = await fetch('http://10.1.1.28:3000/foods');
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
          data={foods.filter(item => item.isFavorite === true)}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FoodCard {...item} />}
        />
      );
    }

    return (
      <View className='px-4 flex flex-col'>
        {renderContent()}
      </View>
    );
  }