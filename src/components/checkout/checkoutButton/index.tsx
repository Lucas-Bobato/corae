import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface CheckoutButtonProps {
  loading?: boolean;
  onPress: () => void;
}

export function CheckoutButton({ onPress, loading }: CheckoutButtonProps) {
  return (
    <View className="p-4 bg-white">
      <TouchableOpacity
        className={`py-4 px-6 rounded-lg ${
          loading ? 'bg-gray-300' : 'bg-[#7D9C4A]'
        }`}
        onPress={onPress}
      >
        <Text className="text-white font-bold text-center text-lg">
          {loading ? 'Processando...' : 'Realizar pedido'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}