import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface PaymentMethod {
  label: string;
  icon: string;
}

interface PaymentMethodProps {
  onPress?: () => void;
}

export function PaymentMethodComponent({ onPress }: PaymentMethodProps) {
  const router = useRouter();

  return (
    <View className="px-4 py-4 border-y border-gray-100">
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => router.push('/paymentMethods')}
      >
        <View className="flex-row items-center flex-1">
          <FontAwesome name="cc-visa" size={20} color="#000" />
          <View className='flex-col'>
            <Text className="ml-3 text-black text-md">Crédito</Text>
            <Text className="ml-3 text-gray-600 text-sm">Visa 1234</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}