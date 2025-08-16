import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isPrimary: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    street: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zip: '01234-567',
    isPrimary: true,
  },
  {
    id: '2',
    street: 'Avenida Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zip: '01310-100',
    isPrimary: false,
  },
];

export default function AddressScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);

  const renderAddress = ({ item }: { item: Address }) => (
    <View className="p-4 border-b border-gray-200">
      <Text className="font-bold text-lg">{item.street}</Text>
      <Text className="text-gray-600">{`${item.city}, ${item.state} - ${item.zip}`}</Text>
      {item.isPrimary && (
        <View className="mt-2 bg-green-100 self-start px-2 py-1 rounded">
          <Text className="text-green-800 text-xs font-bold">Principal</Text>
        </View>
      )}
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
          <Text className="font-bold text-xl text-black">Meus Endereços</Text>
        }
        rightComponent={
          <TouchableOpacity onPress={() => { router.push("/addAddress") }}>
            <Ionicons name="add" size={28} color="#7D9C4A" />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddress}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500">Nenhum endereço cadastrado.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
