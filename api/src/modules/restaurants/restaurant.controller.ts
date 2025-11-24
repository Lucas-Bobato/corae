import { Request, Response } from "express";
import * as service from "./restaurant.service";
import { commonValidations } from "@/common/validation/helper.schema";
import { paginationSchema } from "@/common/validation/pagination.schema";

export async function listRestaurants(_req: Request, res: Response) {
  const { skip, take } = paginationSchema.parse(_req.query);
  const restaurants = await service.listRestaurants(skip, take);
  res.json(restaurants);
}

export async function getRestaurant(req: Request, res: Response) {
  const restaurant = await service.getRestaurant(Number(req.params.id));
  res.json(restaurant);
}

export async function createRestaurant(req: Request, res: Response) {
  const restaurant = await service.createRestaurant(req.body);
  res.status(201).json(restaurant);
}

export async function updateRestaurant(req: Request, res: Response) {
  const id = commonValidations.id.parse(req.params.id);

  const restaurant = await service.updateRestaurant(req.body, id);
  res.status(201).json(restaurant);
}
