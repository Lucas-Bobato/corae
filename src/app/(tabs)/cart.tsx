import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
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

export default function CheckoutScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Pedido realizado!',
        'Seu pedido foi confirmado e está sendo preparado.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/pedidos')
          }
        ]
      );
    }, 2000);
  };

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
          <Text className="font-bold text-xl text-black">Carrinho</Text>
        }
        rightComponent={
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="#666" />
          </TouchableOpacity>
        }
      />
      <CartList
        ListHeaderComponent={
          <>
            <SectionTitle title="Resumo do Pedido" />
          </>
        }
        ListFooterComponent={
          <>
            <SectionTitle title="Endereço de Entrega" />
            <AddressInfo />
            <SectionTitle title="Método de Pagamento" />
            <PaymentMethodComponent />
            <SectionTitle title="Total" />
            <CheckoutTotal />
          </>
        }
      />

      <CheckoutButton
        onPress={handlePlaceOrder}
        loading={loading}
      />

      <Footer />
    </SafeAreaView>
  );
}