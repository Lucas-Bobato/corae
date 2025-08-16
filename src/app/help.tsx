import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, View, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Header } from '../components/header';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: 'Como faço para alterar meu endereço de entrega?',
    answer: 'Você pode alterar seu endereço de entrega na seção "Meus Endereços" do seu perfil. O novo endereço será usado para os próximos pedidos.',
  },
  {
    question: 'Qual é o tempo médio de entrega?',
    answer: 'O tempo de entrega varia de acordo com o restaurante e sua localização. Você pode ver uma estimativa de tempo na página de cada restaurante.',
  },
  {
    question: 'Como posso cancelar um pedido?',
    answer: 'Se o restaurante ainda não aceitou seu pedido, você pode cancelá-lo diretamente na página de detalhes do pedido. Após a aceitação, entre em contato com o suporte.',
  },
  {
    question: 'Quais métodos de pagamento são aceitos?',
    answer: 'Aceitamos cartões de crédito e débito das principais bandeiras. Você pode gerenciar seus métodos de pagamento no seu perfil.',
  },
];

const FaqItem = ({ item }: { item: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View className="border-b border-gray-200 py-4">
      <TouchableOpacity onPress={toggleOpen} className="flex-row justify-between items-center">
        <Text className="font-bold text-base flex-1 pr-4">{item.question}</Text>
        <Ionicons name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color="#333" />
      </TouchableOpacity>
      {isOpen && (
        <View className="mt-3">
          <Text className="text-gray-600">{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function HelpScreen() {
  const router = useRouter();

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
          <Text className="font-bold text-xl text-black">Ajuda e Suporte</Text>
        }
      />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold mb-4">Perguntas Frequentes</Text>
        {faqs.map((faq, index) => (
          <FaqItem key={index} item={faq} />
        ))}
      </ScrollView>
      <View className="p-4 border-t border-gray-200 bg-white">
        <TouchableOpacity
          onPress={() => { /* Redirecionar para o chat de suporte */ }}
          className="bg-[#7D9C4A] p-4 rounded-lg items-center flex-row justify-center"
        >
          <Ionicons name="chatbubbles-outline" size={22} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Falar com o Suporte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
