import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Header } from "../components/header";
import { RestaurantCard, RestaurantsProps } from "../components/restaurants/list";
import { useReviews } from "../contexts/ReviewsContext";
import db from "../../db.json";

export default function RestaurantsScreen() {
  const router = useRouter();
  const { getAverageRating, getReviewsByRestaurant } = useReviews();
  const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantsProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { totalReviews, averageCommunityRating } = useMemo(() => {
    if (restaurants.length === 0) {
      return { totalReviews: 0, averageCommunityRating: 0 };
    }

    let reviewSum = 0;
    let ratingAccumulator = 0;
    let ratedRestaurants = 0;

    restaurants.forEach((restaurant) => {
      const reviewsForRestaurant = getReviewsByRestaurant(restaurant.id);
      reviewSum += reviewsForRestaurant.length;
      const restaurantAverage = getAverageRating(restaurant.id);
      if (reviewsForRestaurant.length > 0) {
        ratingAccumulator += restaurantAverage;
        ratedRestaurants += 1;
      }
    });

    const average = ratedRestaurants > 0 ? ratingAccumulator / ratedRestaurants : 0;

    return {
      totalReviews: reviewSum,
      averageCommunityRating: Math.round(average * 10) / 10,
    };
  }, [restaurants, getReviewsByRestaurant, getAverageRating]);

  useEffect(() => {
    try {
      const fetchedRestaurants = db.restaurants as RestaurantsProps[];
      setRestaurants(fetchedRestaurants);
      setFilteredRestaurants(fetchedRestaurants);
    } catch (err) {
      setError("Não foi possível carregar a lista de restaurantes. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery, restaurants]);

  const renderHeader = () => (
    <View className="px-4 pb-4">
      <View className="bg-[#EAF3D7] rounded-3xl p-5 mb-4">
        <Text className="text-xs uppercase tracking-widest text-[#7D9C4A] font-semibold">
          Bem-vindo ao Corae
        </Text>
        <Text className="text-2xl font-bold text-gray-900 mt-2">Encontre sabores sem glúten perto de você</Text>
        <Text className="text-sm text-gray-600 mt-2">
          Descubra restaurantes confiáveis, veja as avaliações da comunidade e compartilhe suas experiências.
        </Text>
        <View className="flex-row mt-4 bg-white/80 rounded-2xl p-4">
          <View className="flex-1">
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Restaurantes</Text>
            <Text className="text-lg font-semibold text-gray-900 mt-1">{restaurants.length}</Text>
          </View>
          <View className="flex-1 border-l border-gray-200 pl-4">
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Avaliações</Text>
            <Text className="text-lg font-semibold text-gray-900 mt-1">{totalReviews}</Text>
          </View>
          <View className="flex-1 border-l border-gray-200 pl-4">
            <Text className="text-xs text-gray-500 uppercase tracking-wide">Nota média</Text>
            <Text className="text-lg font-semibold text-gray-900 mt-1">{averageCommunityRating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-100">
        <Ionicons name="search" size={20} color="#7D9C4A" />
        <TextInput
          className="flex-1 ml-3 text-base text-gray-700"
          placeholder="Buscar por nome do restaurante..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7F1" }}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7D9C4A" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7F1" }}>
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="alert-circle" size={42} color="#F97316" />
          <Text className="text-center mt-4 text-gray-600">{error}</Text>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              setError(null);
              setRestaurants([]);
              setFilteredRestaurants([]);
              setTimeout(() => {
                setRestaurants(db.restaurants as RestaurantsProps[]);
                setFilteredRestaurants(db.restaurants as RestaurantsProps[]);
                setLoading(false);
              }, 400);
            }}
            className="mt-6 bg-[#7D9C4A] px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7F1" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F1" />
      <Header
        leftComponent={<View className="w-8" />}
        centerComponent={<Text className="font-semibold text-lg text-gray-900">Restaurantes</Text>}
        rightComponent={
          <TouchableOpacity onPress={() => router.push("/profile" as any)} activeOpacity={0.7}>
            <Ionicons name="person-circle-outline" size={30} color="#7D9C4A" />
          </TouchableOpacity>
        }
      />

      {filteredRestaurants.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="restaurant-outline" size={42} color="#9CA3AF" />
          <Text className="text-center text-gray-600 mt-4">
            Nenhum restaurante encontrado com o nome "{searchQuery}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => {
            const averageRating = getAverageRating(item.id);
            const reviewCount = getReviewsByRestaurant(item.id).length;
            return (
              <TouchableOpacity
                onPress={() => router.push(`/restaurant/${item.id}` as any)}
                activeOpacity={0.82}
                className="px-4"
              >
                <RestaurantCard {...item} averageRating={averageRating} reviewCount={reviewCount} />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
