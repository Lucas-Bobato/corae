import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Header } from "../../components/header";
import { RestaurantsProps } from "../../components/restaurants/list";
import { useReviews, Review } from "../../contexts/ReviewsContext";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../services/api";

const ratingOptions = [1, 2, 3, 4, 5];

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const diffInMs = Date.now() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  if (diffInMinutes < 1) return "agora mesmo";
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "ontem";
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  return date.toLocaleDateString();
}

function ContactCard({ info }: { info: string }) {
  if (!info) return null;

  let iconName: keyof typeof Ionicons.glyphMap = "call";
  let text = info;
  let action = () => Linking.openURL(`tel:${info}`);

  if (info.includes("@")) {
    if (info.toLowerCase().includes("instagram")) {
      iconName = "logo-instagram";
      text = info.replace(/instagram:?\s?/i, "");
      action = () => Linking.openURL(`https://instagram.com/${text.replace("@", "")}`);
    } else {
      iconName = "mail";
      action = () => Linking.openURL(`mailto:${info}`);
    }
  } else if (info.toLowerCase().includes("instagram")) {
    iconName = "logo-instagram";
    text = info.replace(/instagram:?\s?/i, "");
    action = () => Linking.openURL(`https://instagram.com/${text.replace("@", "")}`);
  }

  return (
    <TouchableOpacity
      onPress={action}
      className="bg-white/80 backdrop-blur rounded-2xl px-4 py-3 mb-2 border border-gray-100"
      activeOpacity={0.85}
    >
      <View className="flex-row items-center">
        <Ionicons name={iconName} size={20} color="#7D9C4A" />
        <Text className="text-base text-gray-800 ml-3 flex-1" numberOfLines={1} ellipsizeMode="tail">
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { getReviewsByRestaurant, getAverageRating, addReview } = useReviews();

  const [restaurant, setRestaurant] = useState<RestaurantsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    
    async function loadRestaurant() {
      setLoading(true);
      try {
        const restaurantData = await api.getRestaurant(Number(id));
        if (!restaurantData) {
          throw new Error("Restaurante não encontrado");
        }
        // Adapta os dados da API para o formato esperado
        setRestaurant({
          id: String(restaurantData.id),
          name: restaurantData.name,
          address: restaurantData.location,
          phone: "",
          contact: "",
        });
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados. Verifique se o backend está rodando.");
      } finally {
        setLoading(false);
      }
    }
    
    loadRestaurant();
  }, [id]);

  const reviews = useMemo<Review[]>(
    () => (restaurant ? getReviewsByRestaurant(Number(restaurant.id)) : []),
    [restaurant, getReviewsByRestaurant],
  );
  const averageRating = useMemo(() => (restaurant ? getAverageRating(Number(restaurant.id)) : 0), [restaurant, getAverageRating]);

  const handleAddReview = async () => {
    if (!restaurant) return;
    if (!user) {
      Alert.alert("Login necessário", "Faça login para avaliar este restaurante.");
      router.push("/auth/login" as any);
      return;
    }
    if (!rating) {
      Alert.alert("Avalie o restaurante", "Selecione uma nota de 1 a 5 estrelas.");
      return;
    }

    try {
      await addReview({
        restaurantId: Number(restaurant.id),
        userId: user.id,
        userName: user.name || "Cliente",
        rating,
        comment: comment.trim() || "Sem comentários",
      });

      setRating(0);
      setComment("");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro", error.message || "Não foi possível salvar a avaliação. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7D9C4A" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !restaurant) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="restaurant" size={56} color="#7D9C4A" />
          <Text className="text-center text-gray-600 mt-4">{error ?? "Restaurante não encontrado."}</Text>
          <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-[#7D9C4A] py-3 px-6 rounded-full">
            <Text className="text-white font-semibold">Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7F1" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F1" />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => router.back()} className="p-1" activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text className="font-semibold text-lg text-gray-900" numberOfLines={1} ellipsizeMode="tail">
            {restaurant.name}
          </Text>
        }
        rightComponent={<View className="w-6" />}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 72 }}>
        <View className="relative">
          <Image source={{ uri: `https://picsum.photos/seed/${restaurant.name}/800` }} className="w-full h-56" />
          <View className="absolute bottom-0 left-4 right-4 translate-y-1/2 bg-white rounded-3xl shadow-lg p-5 flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-semibold text-gray-900">{averageRating.toFixed(1)}</Text>
              <Text className="text-sm text-gray-500">Média de avaliações</Text>
            </View>
            <View className="flex-row items-center">
              {ratingOptions.map((value) => (
                <Ionicons
                  key={`avg-${value}`}
                  name={value <= Math.round(averageRating) ? "star" : "star-outline"}
                  size={20}
                  color="#F59E0B"
                  style={{ marginRight: value === ratingOptions[ratingOptions.length - 1] ? 0 : 4 }}
                />
              ))}
            </View>
          </View>
        </View>

        <View className="px-5 mt-16 space-y-6">
          <View className="bg-white rounded-3xl p-5 shadow-sm">
            <Text className="text-2xl font-semibold text-gray-900 mb-4">{restaurant.name}</Text>
            <View className="flex-row items-start mb-4">
              <View className="bg-[#EAF3D7] rounded-full p-3">
                <Ionicons name="location-sharp" size={22} color="#7D9C4A" />
              </View>
              <Text className="text-base text-gray-700 ml-3 flex-1 leading-6">{restaurant.address}</Text>
            </View>
            <ContactCard info={restaurant.phone} />
            <ContactCard info={restaurant.contact} />
          </View>

          <View className="bg-white rounded-3xl p-5 shadow-sm">
            <Text className="text-xl font-semibold text-gray-900 mb-4">Avalie este lugar</Text>
            <View className="flex-row justify-between mb-4">
              {ratingOptions.map((value) => (
                <TouchableOpacity key={value} onPress={() => setRating(value)} activeOpacity={0.8}>
                  <Ionicons
                    name={value <= rating ? "star" : "star-outline"}
                    size={32}
                    color={value <= rating ? "#F59E0B" : "#D1D5DB"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View className="bg-gray-100 rounded-2xl px-4 py-3 mb-4">
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Conte sua experiência com o restaurante"
                placeholderTextColor="#9CA3AF"
                multiline
                className="text-base text-gray-800"
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity onPress={handleAddReview} className="bg-[#7D9C4A] rounded-full py-3 items-center" activeOpacity={0.85}>
              <Text className="text-white font-semibold">Enviar avaliação</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-3xl p-5 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold text-gray-900">Avaliações recentes</Text>
              <Text className="text-sm text-gray-500">{reviews.length} avaliações</Text>
            </View>
            {reviews.length === 0 ? (
              <View className="items-center py-6">
                <Ionicons name="chatbubble-ellipses-outline" size={36} color="#D1D5DB" />
                <Text className="text-gray-500 mt-3 text-center">
                  Ainda não há avaliações. Seja o primeiro a compartilhar sua experiência!
                </Text>
              </View>
            ) : (
              reviews.map((review: Review) => (
                <View key={review.id} className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-base font-semibold text-gray-900">{review.userName}</Text>
                    <Text className="text-xs text-gray-400">{formatRelativeTime(review.createdAt)}</Text>
                  </View>
                  <View className="flex-row mb-2">
                    {ratingOptions.map((value) => (
                      <Ionicons
                        key={`${review.id}-${value}`}
                        name={value <= review.rating ? "star" : "star-outline"}
                        size={18}
                        color="#F59E0B"
                      />
                    ))}
                  </View>
                  <Text className="text-sm text-gray-700 leading-5">{review.comment}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
