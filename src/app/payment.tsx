import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  isPrimary: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    brand: 'Visa',
    last4: '1234',
    isPrimary: true,
  },
  {
    id: '2',
    brand: 'Mastercard',
    last4: '5678',
    isPrimary: false,
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);

  const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => (
    <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
      <View>
        <Text className="font-bold text-lg">{item.brand} **** {item.last4}</Text>
        {item.isPrimary && (
          <View className="mt-2 bg-green-100 self-start px-2 py-1 rounded">
            <Text className="text-green-800 text-xs font-bold">Principal</Text>
          </View>
        )}
      </View>
      <Ionicons name="card" size={32} color="#333" />
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
          <Text className="font-bold text-xl text-black">Pagamentos</Text>
        }
        rightComponent={
          <TouchableOpacity onPress={() => { router.push("/addPayment") }}>
            <Ionicons name="add" size={28} color="#7D9C4A" />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentMethod}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500">Nenhum método de pagamento cadastrado.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
