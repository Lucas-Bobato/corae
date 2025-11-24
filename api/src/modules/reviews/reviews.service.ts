import * as repo from "./reviews.repo";

export function listReviews(skip?: number, take?: number) {
  return repo.list(skip, take);
}

export function getReview(id: number) {
  return repo.byId(id);
}

export function createReview(data: {
  content: string;
  rating: number;
  userId: number;
  restaurantId: number;
}) {
  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return repo.create(data);
}

export function deleteReview(id: number) {
  return repo.deleteReview(id);
}