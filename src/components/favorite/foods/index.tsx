import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FoodProps } from '../../food/card';
import { FoodListItem } from '../../food/list';
import { useRouter } from 'expo-router';
import db from '../../../../db.json';

export function FavoriteFoods() {
  const router = useRouter();
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetchFoods() {
      try {
        setFoods(db.foods);
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

      const favoriteFoods = foods.filter(item => item.isFavorite);

      if (favoriteFoods.length === 0) {
        return <Text className='text-center mt-5 px-5 text-gray-500'>Você ainda não tem comidas favoritas.</Text>;
      }

      return (
        <FlatList
          data={favoriteFoods}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/food/${item.id}`)}>
              <FoodListItem {...item} />
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