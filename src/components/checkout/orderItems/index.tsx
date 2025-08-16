import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../../contexts/CartContext';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartListProps {
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
}

const QuantityStepper = ({ quantity, onDecrement, onIncrement }: { quantity: number, onDecrement: () => void, onIncrement: () => void }) => {
  return (
    <View className="flex-row items-center bg-neutral-200 rounded-full px-2 py-1">
      <TouchableOpacity onPress={onDecrement}>
        <Text className="text-neutral-600 font-bold text-lg px-1">-</Text>
      </TouchableOpacity>
      <Text className="text-neutral-800 font-bold text-base mx-2">{quantity}</Text>
      <TouchableOpacity onPress={onIncrement}>
        <Text className="text-neutral-600 font-bold text-lg px-1">+</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductItem = ({ item, onUpdateQuantity, onRemove }: { item: CartItem, onUpdateQuantity: (id: string, q: number) => void, onRemove: (id: string) => void }) => {
  const totalItemPrice = (parseFloat(item.price) * item.quantity).toFixed(2);

  return (
    <View className="flex-row items-center justify-between bg-white p-3 mx-4 my-1.5 rounded-xl shadow-sm">
      <View className="flex-row items-center flex-1 mr-2">
        <Image
          source={{ uri: item.image }}
          className="w-16 h-16 rounded-lg bg-gray-100"
          resizeMode="cover"
        />
        <View className="ml-4 flex-1">
          <Text className="text-base font-medium text-gray-800 flex-shrink" numberOfLines={2}>{item.name}</Text>
          <Text className="text-sm text-gray-500">R$ {item.price}</Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-3">
        <QuantityStepper
          quantity={item.quantity}
          onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
          onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
        />
        <Text className="text-base font-semibold text-gray-900 w-20 text-right">
          R$ {totalItemPrice}
        </Text>
        <TouchableOpacity onPress={() => onRemove(item.id)} className="pl-2">
          <Ionicons name="trash-bin-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartList = ({ ListHeaderComponent, ListFooterComponent }: CartListProps) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Erro ao carregar o carrinho.</Text>
      </View>
    );
  }

  const { cart, loading, updateQuantity, removeFromCart } = cartContext;

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7D9C4A" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-10">
        {ListHeaderComponent}
        <Text className="text-gray-500 text-lg mt-8">Seu carrinho está vazio.</Text>
        {ListFooterComponent}
      </View>
    );
  }

  return (
    <FlatList
      data={cart}
      renderItem={({ item }) => <ProductItem item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export { CartList };