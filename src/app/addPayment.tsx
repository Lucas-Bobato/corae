import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StatusBar, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';

export default function AddPaymentScreen() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  /*
   * Manipula o evento de salvar um método de pagamento.
   * Esta função verifica se todos os campos obrigatórios (número do cartão, data de validade e CVV)
   * estão preenchidos. Caso algum campo esteja vazio, exibe um alerta de erro solicitando o preenchimento.
   * Em um aplicativo real, recomenda-se tokenizar os dados do cartão e salvá-los de forma segura,
   * evitando armazenar informações sensíveis diretamente.
   * Ao salvar com sucesso, exibe um alerta de confirmação e retorna para a tela anterior.
   */
  const handleSavePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    console.log('Saving payment method:', { cardNumber, expiryDate, cvv });
    Alert.alert('Sucesso', 'Método de pagamento salvo com sucesso!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

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
          <Text className="font-bold text-xl text-black">Adicionar Pagamento</Text>
        }
      />
      <View className="p-4">
        <TextInput
          placeholder="Número do Cartão"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TextInput
          placeholder="Data de Validade (MM/AA)"
          value={expiryDate}
          onChangeText={setExpiryDate}
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TextInput
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          secureTextEntry
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TouchableOpacity
          onPress={handleSavePayment}
          className="bg-[#7D9C4A] p-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold text-lg">Salvar Cartão</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
