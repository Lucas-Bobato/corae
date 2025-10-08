import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Review = {
  id: string;
  restaurantId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

type ReviewsContextType = {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  getReviewsByRestaurant: (restaurantId: string) => Review[];
  getAverageRating: (restaurantId: string) => number;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const initialReviews: Review[] = [
  {
    id: "1",
    restaurantId: "1",
    userName: "Marina",
    rating: 4.5,
    comment: "Ótimas opções sem glúten, atendimento rápido e atencioso!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    restaurantId: "3",
    userName: "Eduardo",
    rating: 5,
    comment: "Melhor café da cidade, recomendo o bolo de chocolate.",
    createdAt: new Date().toISOString(),
  },
];

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (reviewData: Omit<Review, "id" | "createdAt">) => {
    setReviews((prev) => [
      {
        id: Math.random().toString(36).slice(2),
        createdAt: new Date().toISOString(),
        ...reviewData,
      },
      ...prev,
    ]);
  };

  const value = useMemo(() => {
    const getReviewsByRestaurant = (restaurantId: string) =>
      reviews.filter((review) => review.restaurantId === restaurantId);

    const getAverageRating = (restaurantId: string) => {
      const restaurantReviews = getReviewsByRestaurant(restaurantId);
      if (restaurantReviews.length === 0) return 0;
      const total = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
      return Math.round((total / restaurantReviews.length) * 10) / 10;
    };

    return {
      reviews,
      addReview,
      getReviewsByRestaurant,
      getAverageRating,
    };
  }, [reviews]);

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews deve ser usado dentro de ReviewsProvider");
  }
  return context;
}
