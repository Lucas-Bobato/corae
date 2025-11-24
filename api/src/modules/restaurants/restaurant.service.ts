import * as repo from "./restaurant.repo";

export function listRestaurants(skip?: number, take?: number) {
  return repo.list(skip, take);
}

export function getRestaurant(id: number) {
  return repo.byId(id);
}

export function createRestaurant(data: { name: string; location: string }) {
  return repo.create(data);
}

export function updateRestaurant(data: { name: string; location: string }, id: number) {
  return repo.update(data, id);
}
