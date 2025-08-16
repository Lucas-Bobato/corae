import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

interface Order {
  id: string;
  date: string;
  status: 'Entregue' | 'Em andamento' | 'Cancelado';
  total: string;
  restaurantName: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    date: '20/07/2024',
    status: 'Entregue',
    total: 'R$ 45,80',
    restaurantName: 'Cantina da Nona',
  },
  {
    id: '2',
    date: '18/07/2024',
    status: 'Cancelado',
    total: 'R$ 28,50',
    restaurantName: 'Burger Bliss',
  },
  {
    id: '3',
    date: '15/07/2024',
    status: 'Entregue',
    total: 'R$ 65,00',
    restaurantName: 'SushiYama',
  },
];

export default function PedidosScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Entregue':
        return 'text-green-600';
      case 'Em andamento':
        return 'text-blue-600';
      case 'Cancelado':
        return 'text-red-600';
    }
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">{item.restaurantName}</Text>
        <Text className={`font-bold ${getStatusColor(item.status)}`}>{item.status}</Text>
      </View>
      <Text className="text-gray-600 mt-1">Pedido em {item.date}</Text>
      <Text className="text-gray-800 font-bold mt-2">Total: {item.total}</Text>
      <TouchableOpacity className="mt-3 self-start">
        <Text className="text-[#7D9C4A] font-bold">Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );

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