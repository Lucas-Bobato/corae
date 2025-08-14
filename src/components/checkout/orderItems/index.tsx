import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

interface CartItemProps {
  id: string;
  nome: string;
  preco: string;
  imagem: { uri: string };
}

interface CartListProps {
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
}

const QuantityStepper = () => {
  const [quantity, setQuantity] = useState(1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const increment = () => setQuantity(prev => prev + 1);

  return (
    <View className="flex-row items-center bg-neutral-200 rounded-full px-2 py-1">
      <TouchableOpacity onPress={decrement}>
        <Text className="text-neutral-600 font-bold text-lg px-1">-</Text>
      </TouchableOpacity>
      <Text className="text-neutral-800 font-bold text-base mx-2">{quantity}</Text>
      <TouchableOpacity onPress={increment}>
        <Text className="text-neutral-600 font-bold text-lg px-1">+</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductItem = ({ item }: { item: CartItemProps }) => {
  return (
    <View className="flex-row items-center justify-between bg-white p-3 mx-4 my-1.5 rounded-xl shadow-sm">
      <View className="flex-row items-center flex-1 mr-2">
        <Image
          source={item.imagem}
          className="w-16 h-16 rounded-lg bg-gray-100"
          resizeMode="cover"
        />
        <Text className="ml-4 text-base font-medium text-gray-800 flex-shrink" numberOfLines={2}>{item.nome}</Text>
      </View>
      <View className="flex-row items-center space-x-3">
        <QuantityStepper />
        <Text className="text-base font-semibold text-gray-900 w-20 text-right">
          R${item.preco.replace(',', '.')}
        </Text>
      </View>
    </View>
  );
};

const CartList = ({ ListHeaderComponent, ListFooterComponent }: CartListProps) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const response = await fetch('http://10.1.1.7:3000/foods');
        const data = await response.json();

        const formattedData = data.map((food: any) => ({
          id: food.id,
          nome: food.name,
          preco: food.price,
          imagem: { uri: food.image },
        }));

        setCartItems(formattedData);
      } catch (err) {
        setError('Erro ao carregar os alimentos. Verifique sua conexão e a API.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7D9C4A" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg text-center px-4">{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      renderItem={({ item }) => <ProductItem item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export { CartList };