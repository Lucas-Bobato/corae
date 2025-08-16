import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import db from '../../../db.json';

// Define os tipos de acordo com o db.json
interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  date: string;
  status: 'Entregue' | 'Em andamento' | 'Cancelado';
  total: string;
}

const getRestaurantInfo = (restaurantId: string) => {
  return db.restaurants.find(r => r.id === restaurantId);
};

export default function PedidosScreen() {
  const router = useRouter();
  const orders: Order[] = db.orders
    .filter(order => order.userId === '1') // Assume o ID 1 para o usuário
    .map(order => ({
      ...order,
      status: order.status as Order['status'],
    }));

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Entregue':
        return 'text-green-600 bg-green-100';
      case 'Em andamento':
        return 'text-blue-600 bg-blue-100';
      case 'Cancelado':
        return 'text-red-600 bg-red-100';
    }
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const restaurant = getRestaurantInfo(item.restaurantId);
    return (
      <TouchableOpacity onPress={() => router.push(`/order/${item.id}`)} className="bg-white rounded-xl shadow-sm mx-4 my-2 p-4">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center flex-1">
            {restaurant?.image && (
              <Image source={{ uri: restaurant.image }} className="w-12 h-12 rounded-full mr-3" />
            )}
            <View className="flex-1">
              <Text className="font-bold text-lg" numberOfLines={1}>{restaurant?.name || 'Restaurante não encontrado'}</Text>
              <Text className="text-gray-500 text-sm">Pedido em {new Date(item.date).toLocaleDateString('pt-BR')}</Text>
            </View>
          </View>
          <View className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
            <Text className={`font-bold text-xs`}>{item.status}</Text>
          </View>
        </View>
        <View className="border-t border-gray-100 pt-3">
            <Text className="text-gray-800 font-bold text-base text-right">Total: R$ {item.total}</Text>
        </View>
      </TouchableOpacity>
    )
  };

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
          <Text className="font-bold text-xl text-black">Meus Pedidos</Text>
        }
      />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500">Nenhum pedido realizado.</Text>
          </View>
        }
      />
      <Footer />
    </SafeAreaView>
  );
}