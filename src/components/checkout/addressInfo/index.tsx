import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface AddressProps {
  leftComponent?: ReactNode;
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
}

export function AddressInfo({ leftComponent, centerComponent, rightComponent }: AddressProps) {
  const router = useRouter();
  return (
    <View className="px-4 py-4 border-y border-gray-100">
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => router.push('/address')}
      >
        <View className="flex-row items-center flex-1">
          <SimpleLineIcons name="location-pin" size={20} color="#000" />
          <View className='flex-col'>
            <Text className="ml-3 text-black text-md">Endereço</Text>
            <Text className="ml-3 text-gray-600 text-sm">Rua Exemplo 123, Univille - Joinville</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}