import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { useRouter } from 'expo-router';

export default function Cart() {
  const router = useRouter();

  return (
  <SafeAreaView className="w-full flex-1 pt-4 mb-auto">

      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back("/")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
            <Text className="font-bold text-xl text-black">Carrinho</Text>
        }
        rightComponent={
            <Ionicons name="heart" size={24} color="transparent" />
        }
      />

      <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}>
        <Text className="font-bold text-lg">Carrinho de Compras</Text>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}