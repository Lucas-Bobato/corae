import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StatusBar, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';

export default function AddAddressScreen() {
  const router = useRouter();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleSaveAddress = () => {
    if (!street || !city || !state || !zip) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    // No aplicativo final, este endereço será salvo em um backend ou gerenciado por um sistema de estado global (como Redux ou Context API).
    console.log('Saving address:', { street, city, state, zip });
    Alert.alert('Sucesso', 'Endereço salvo com sucesso!', [
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
          <Text className="font-bold text-xl text-black">Adicionar Endereço</Text>
        }
      />
      <View className="p-4">
        <TextInput
          placeholder="Rua, Número"
          value={street}
          onChangeText={setStreet}
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TextInput
          placeholder="Cidade"
          value={city}
          onChangeText={setCity}
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TextInput
          placeholder="Estado (ex: SP)"
          value={state}
          onChangeText={setState}
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TextInput
          placeholder="CEP"
          value={zip}
          onChangeText={setZip}
          keyboardType="numeric"
          className="bg-white p-4 rounded-lg mb-4 text-base"
        />
        <TouchableOpacity
          onPress={handleSaveAddress}
          className="bg-[#7D9C4A] p-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold text-lg">Salvar Endereço</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
