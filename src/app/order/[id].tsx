import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, FlatList, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/header';
import { CartContext } from '../../contexts/CartContext';
import db from '../../../db.json';

// Define os tipos de acordo como db.json
interface OrderItem {
  foodId: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  date: string;
  status: string;
  total: string;
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface Food {
    id: string;
    name: string;
    image: string;
    description: string;
    price: string;
    category: string;
}

const getFoodDetails = (foodId: string): Food | undefined => {
    for (const restaurant of db.restaurants) {
        const food = restaurant.menu.find(item => item.id === foodId);
        if (food) {
            return food;
        }
    }
    return undefined;
};


export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (id) {
      const foundOrder = db.orders.find(o => o.id === id);
      setOrder(foundOrder || null);
    }
    setLoading(false);
  }, [id]);

  const handleReorder = () => {
    if (!order || !cartContext) return;

    order.items.forEach(item => {
        const foodDetails = getFoodDetails(item.foodId);
        if(foodDetails) {
            for (let i = 0; i < item.quantity; i++) {
                cartContext.addToCart(foodDetails);
            }
        }
    });

    Alert.alert("Itens adicionados", "Os itens do pedido foram adicionados ao seu carrinho.", [
        { text: "OK", onPress: () => router.push('/cart') }
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#7D9C4A" className="flex-1" />;
  }

  if (!order) {
    return (
      <SafeAreaView className="w-full flex-1 pt-4 bg-gray-50">
        <Header centerComponent={<Text className="font-bold text-xl">Pedido não encontrado</Text>} />
        <View className="flex-1 justify-center items-center">
          <Text>O pedido que você está procurando não foi encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderOrderItem = ({ item }: { item: OrderItem }) => {
    const foodDetails = getFoodDetails(item.foodId);
    if(!foodDetails) return null;

    return (
        <View className="flex-row items-center bg-white p-3 my-1.5 rounded-lg shadow-sm">
            <Image source={{ uri: foodDetails.image }} className="w-12 h-12 rounded-md" />
            <View className="flex-1 ml-3">
                <Text className="font-bold text-base">{foodDetails.name}</Text>
                <Text className="text-gray-600">Quantidade: {item.quantity}</Text>
            </View>
            <Text className="font-semibold text-base">R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}</Text>
        </View>
    )
  }

  return (
    <SafeAreaView className="w-full flex-1 pt-4 mb-auto">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text className="font-bold text-xl text-black">Detalhes do Pedido</Text>
        }
      />
      <FlatList
        data={order.items}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.foodId}
        ListHeaderComponent={
            <>
                <View className="p-4 bg-white rounded-lg shadow-sm m-4">
                    <Text className="text-lg font-bold mb-2">Pedido #{order.id}</Text>
                    <Text className="text-gray-600 mb-1">Data: {new Date(order.date).toLocaleDateString('pt-BR')}</Text>
                    <Text className="text-gray-600 mb-1">Status: {order.status}</Text>
                    <Text className="text-gray-800 font-bold text-lg mt-2">Total: R$ {order.total}</Text>
                </View>
                <View className="p-4 bg-white rounded-lg shadow-sm m-4">
                    <Text className="text-lg font-bold mb-2">Endereço de Entrega</Text>
                    <Text>{order.deliveryAddress.street}</Text>
                    <Text>{order.deliveryAddress.city}, {order.deliveryAddress.state}</Text>
                    <Text>{order.deliveryAddress.zip}</Text>
                </View>
                <Text className="text-lg font-bold p-4">Itens</Text>
            </>
        }
        ListFooterComponent={
            <TouchableOpacity
                onPress={handleReorder}
                className="bg-[#7D9C4A] p-4 rounded-lg items-center m-4"
            >
                <Text className="text-white font-bold text-lg">Adicionar itens ao carrinho</Text>
            </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}
