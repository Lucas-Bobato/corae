import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import * as api from "../services/api";

export type Review = {
  id: number;
  restaurantId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ReviewsContextType = {
  reviews: Review[];
  loading: boolean;
  addReview: (review: { restaurantId: number; userId: number; userName: string; rating: number; comment: string }) => Promise<void>;
  getReviewsByRestaurant: (restaurantId: number) => Review[];
  getAverageRating: (restaurantId: number) => number;
  refreshReviews: () => Promise<void>;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await api.getReviews();
      
      // Transforma os dados da API para o formato do contexto
      const transformedReviews: Review[] = data.map((review) => ({
        id: review.id,
        restaurantId: review.restaurantId,
        userId: review.userId,
        userName: review.user?.name || "Usuário",
        rating: review.rating,
        comment: review.content,
        createdAt: review.createdAt,
      }));
      
      setReviews(transformedReviews);
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData: { 
    restaurantId: number; 
    userId: number; 
    userName: string; 
    rating: number; 
    comment: string;
  }) => {
    try {
      const newReview = await api.createReview({
        content: reviewData.comment,
        rating: reviewData.rating,
        userId: reviewData.userId,
        restaurantId: reviewData.restaurantId,
      });

      // Adiciona o novo review ao estado local
      const transformedReview: Review = {
        id: newReview.id,
        restaurantId: newReview.restaurantId,
        userId: newReview.userId,
        userName: reviewData.userName,
        rating: newReview.rating,
        comment: newReview.content,
        createdAt: newReview.createdAt,
      };

      setReviews((prev) => [transformedReview, ...prev]);
    } catch (error) {
      console.error("Erro ao adicionar review:", error);
      throw error;
    }
  };

  const refreshReviews = async () => {
    await loadReviews();
  };

  const value = useMemo(() => {
    const getReviewsByRestaurant = (restaurantId: number) =>
      reviews.filter((review) => review.restaurantId === restaurantId);

    const getAverageRating = (restaurantId: number) => {
      const restaurantReviews = getReviewsByRestaurant(restaurantId);
      if (restaurantReviews.length === 0) return 0;
      const total = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
      return Math.round((total / restaurantReviews.length) * 10) / 10;
    };

    return {
      reviews,
      loading,
      addReview,
      getReviewsByRestaurant,
      getAverageRating,
      refreshReviews,
    };
  }, [reviews, loading]);

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews deve ser usado dentro de ReviewsProvider");
  }
  return context;
}
