import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, Image, View, Text, Pressable, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Banner } from "../../components/banner";
import { Header } from "../../components/header";
import { Search } from "../../components/search";
import { Footer } from "../../components/footer";
import { useRouter } from 'expo-router';
import { RestaurantHorizontalList } from '../../components/restaurants/horizontal-list';
import { FoodHorizontalList } from '../../components/food/horizontal-list';
import { RestaurantsProps } from '../../components/restaurants/list';
import { FoodProps } from '../../components/food/card';
import db from '../../../db.json';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isPrimary: boolean;
}

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [primaryAddress, setPrimaryAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      try {
        setRestaurants(db.restaurants);
        setFoods(db.foods.sort(() => 0.5 - Math.random()).slice(0, 5));
        const user = db.users[0];
        const primaryAddr = user.addresses.find(addr => addr.isPrimary) || user.addresses[0];
        setPrimaryAddress(primaryAddr);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white pt-4">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <Image
            source={require('../../assets/images/logo-corae-no-text.png')}
            className="h-12 w-24"
            resizeMode="contain"
          />
        }
        centerComponent={
          <Pressable onPress={() => router.push('/address')} className="items-center">
            <Text className="text-center text-gray-500 text-xs">Entregar em</Text>
            <View className="flex-row items-center gap-1">
              <Text className="font-bold text-sm" numberOfLines={1}>{primaryAddress?.street || 'Selecione um endereço'}</Text>
              <Ionicons name="chevron-down" size={16} color="#7D9C4A" />
            </View>
          </Pressable>
        }
        rightComponent={
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.push('/notifications')}>
              <Ionicons name="notifications-outline" size={24} color="#7D9C4A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/cart')}>
              <Feather name="shopping-cart" size={24} color="#7D9C4A" />
            </TouchableOpacity>
          </View>
        }
      />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7D9C4A" />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Search />
          <Banner />
          <RestaurantHorizontalList restaurants={restaurants} />
          <FoodHorizontalList foods={foods} />
        </ScrollView>
      )}
      <Footer />
    </SafeAreaView>
  );
}
