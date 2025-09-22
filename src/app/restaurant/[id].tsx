import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StatusBar, ActivityIndicator, View, Image, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from './../../components/header';
import { RestaurantsProps } from './../../components/restaurants/list';
import db from './../../../db.json';

const renderContactInfo = (info: string) => {
    if (!info) return null;

    let iconName: any = 'call';
    let text = info;
    let action = () => Linking.openURL(`tel:${info}`);

    if (info.includes('@')) {
      if (info.includes('instagram')) {
        iconName = 'logo-instagram';
        text = info.replace('Instagram ', '');
        action = () => Linking.openURL(`https://instagram.com/${text.replace('@', '')}`);
      } else if (info.includes('gmail.com')) {
        iconName = 'mail';
        text = info;
        action = () => Linking.openURL(`mailto:${info}`);
      }
    } else if (info.toLowerCase().includes('instagram')) {
      iconName = 'logo-instagram';
      text = info.replace('instagram: ', '');
      action = () => Linking.openURL(`https://instagram.com/${text.replace('@', '')}`);
    }

    return (
      <TouchableOpacity onPress={action}>
        <View className="flex-row items-center">
          <Ionicons name={iconName} size={20} color="#4B5563" />
          <Text className="text-base text-gray-700 ml-3">{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [restaurant, setRestaurant] = useState<RestaurantsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetchData() {
      if (!id) return;
      setLoading(true);
      try {
        const restaurantData = db.restaurants.find((r: RestaurantsProps) => r.id === id);
        if (restaurantData) {
          setRestaurant(restaurantData);
        } else {
          throw new Error('Restaurante não encontrado');
        }
      } catch (err) {
        setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7D9C4A" />
      </View>
    );
  }

  if (error || !restaurant) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-4 bg-white">
        <Text className="text-center text-gray-500">{error}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-[#7D9C4A] py-2 px-4 rounded">
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="w-full flex-1 pt-4 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text className="font-bold text-xl text-black" numberOfLines={1} ellipsizeMode="tail">
            {restaurant.name}
          </Text>
        }
        rightComponent={<View className="w-6" />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: `https://picsum.photos/seed/${restaurant.name}/400` }}
          className="w-full h-56"
        />
        <View className="p-5">
          <Text className="text-3xl font-bold text-gray-900">{restaurant.name}</Text>

          <View className="mt-4 space-y-3">
            <View className="flex-row items-start">
              <Ionicons name="location-sharp" size={24} color="#4B5563" className="mt-1" />
              <Text className="text-base text-gray-700 ml-3 flex-1">{restaurant.address}</Text>
            </View>
            {renderContactInfo(restaurant.phone)}
            {renderContactInfo(restaurant.contact)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
