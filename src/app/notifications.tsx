import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';

const mockNotifications = [
  {
    id: '1',
    title: 'Pedido em andamento!',
    message: 'Seu pedido da Cantina da Nona já está a caminho.',
    date: '2024-07-21T10:00:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Promoção especial!',
    message: 'Use o cupom FOME10 e ganhe 10% de desconto no Burger Bliss.',
    date: '2024-07-20T15:30:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Pedido entregue',
    message: 'Seu pedido do SushiYama foi entregue. Bom apetite!',
    date: '2024-07-19T12:00:00Z',
    read: true,
  },
];

const NotificationItem = ({ item }: { item: typeof mockNotifications[0] }) => (
  <View className={`p-4 border-b border-gray-200 ${!item.read ? 'bg-blue-50' : 'bg-white'}`}>
    <Text className="font-bold text-base">{item.title}</Text>
    <Text className="text-gray-600 my-1">{item.message}</Text>
    <Text className="text-gray-400 text-xs">{new Date(item.date).toLocaleString('pt-BR')}</Text>
  </View>
);

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="w-full flex-1 pt-4 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text className="font-bold text-xl text-black">Notificações</Text>
        }
      />
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-10">
                <Text className="text-gray-500">Nenhuma notificação.</Text>
            </View>
        }
      />
    </SafeAreaView>
  );
}
