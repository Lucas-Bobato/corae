import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { CartContext } from '../../../contexts/CartContext';

export function CheckoutTotal() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { subtotal, total } = cartContext;
  const deliveryFee = 15.0; // Conforme definido no CartContext

  return (
    <View className='flex flex-col p-4 bg-white shadow-md rounded-lg'>
      <View className='flex flex-row justify-between mb-4'>
        <Text className='text-lg'>Subtotal</Text>
        <Text className='text-lg'>R$ {subtotal.toFixed(2)}</Text>
      </View>
      <View className='flex flex-row justify-between mb-4'>
        <Text className='text-lg'>Entrega</Text>
        <Text className='text-lg'>R$ {deliveryFee.toFixed(2)}</Text>
      </View>
      <View className='flex flex-row justify-between mb-4'>
        <Text className='text-lg font-bold'>Total</Text>
        <Text className='text-lg font-bold'>R$ {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}