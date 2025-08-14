import { View, Text } from 'react-native';

export function CheckoutTotal() {
  return (
    <View className='flex flex-col p-4 bg-white shadow-md rounded-lg'>
      <View className='flex flex-row justify-between mb-4'>
        <Text className='text-lg'>Subtotal</Text>
        <Text className='text-lg'>R$ 100,00</Text>
      </View>
      <View className='flex flex-row justify-between mb-4'>
        <Text className='text-lg'>Entrega</Text>
        <Text className='text-lg'>R$ 15,00</Text>
      </View>
      <View className='flex flex-row justify-between mb-4'>
        <Text className='text-lg'>Total</Text>
        <Text className='text-lg'>R$ 115,00</Text>
      </View>
    </View>
  );
}