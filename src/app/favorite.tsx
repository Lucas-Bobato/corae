import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { TabsFavorite } from '../components/favorite';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Favorite() {
  const router = useRouter();

  return (
    <SafeAreaView className="w-full flex-1 pt-4 mb-auto">
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back("/")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
            <Text className="font-bold text-xl text-black">Favoritos</Text>
        }
        rightComponent={
            <Ionicons name="heart" size={24} color="transparent" />
        }
      />
      <View className="bg-white flex-1">

        <TabsFavorite />

      </View>

      <Footer />
      
    </SafeAreaView>
  );
}