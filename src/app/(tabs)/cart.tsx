import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert, StatusBar, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { PaymentMethodComponent } from '../../components/checkout/paymentMethod';
import { CheckoutButton } from '../../components/checkout/checkoutButton';
import { SectionTitle } from '../../components/profile/settingsTitle';
import { AddressInfo } from '../../components/checkout/addressInfo';
import { CheckoutTotal } from '../../components/checkout/checkoutTotal';
import { CartList } from '../../components/checkout/orderItems';
import { CartContext } from '../../contexts/CartContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { cart, clearCart } = cartContext;
  const isCartEmpty = cart.length === 0;

  const handlePlaceOrder = async () => {
    if (isCartEmpty) {
      Alert.alert('Carrinho Vazio', 'Adicione itens ao seu carrinho antes de fazer um pedido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Pedido realizado!',
        'Seu pedido foi confirmado e está sendo preparado.',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              router.push('/pedidos');
            },
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-4">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={<Text className="font-bold text-xl text-black">Carrinho</Text>}
        rightComponent={
          <TouchableOpacity onPress={clearCart} disabled={isCartEmpty}>
            <Ionicons name="trash-outline" size={24} color={isCartEmpty ? '#ccc' : '#666'} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Resumo do Pedido" />
        {isCartEmpty ? (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-center text-gray-500">Seu carrinho está vazio.</Text>
            <TouchableOpacity onPress={() => router.push('/home')} className="mt-4 bg-[#7D9C4A] py-2 px-4 rounded">
              <Text className="text-white font-bold">Ver restaurantes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CartList />
        )}

        <View className="mt-4">
          <SectionTitle title="Endereço de Entrega" />
          <AddressInfo />
          <SectionTitle title="Método de Pagamento" />
          <PaymentMethodComponent />
          <SectionTitle title="Total" />
          <CheckoutTotal />
        </View>
      </ScrollView>

      <CheckoutButton onPress={handlePlaceOrder} loading={loading} />
      <Footer />
    </SafeAreaView>
  );
}