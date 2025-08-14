import { ScrollView, SafeAreaView, Image, View, Text, Pressable, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Banner } from "../components/banner";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Suggestion } from "../components/suggestion";
import { Footer } from "../components/footer";
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();;

  return (
  <SafeAreaView className="w-full flex-1 pt-4 mb-auto">
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <Image
            source={require('../assets/images/logo-corae-no-text.png')}
            className="h-12 w-24"
            resizeMode="contain"
          />
        }
        centerComponent={
          <View>
            <Text className="text-center text-gray-500 text-xs">Entregar em</Text>
            <Pressable className="flex-row items-center gap-1">
              <Text className="font-bold text-sm">R. Lorem Ipsum, 123</Text>
              <Ionicons name="chevron-down" size={16} color="#7D9C4A" />
            </Pressable>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Feather name="shopping-cart" size={24} color="#7D9C4A" />
          </TouchableOpacity>
        }
      />
      <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}>

        <Search />

        <Banner />

        <Suggestion />

      </ScrollView>
      <Footer />
    </SafeAreaView>

  );
}
