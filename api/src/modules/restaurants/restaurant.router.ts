import { Router } from "express";
// import { asyncHandler } from '../../common/http/asyncHandler';
import * as controller from "./restaurant.controller";

const router = Router();

router.get("/", controller.listRestaurants);
router.get("/:id", controller.getRestaurant);
router.post("/", controller.createRestaurant);
router.patch("/:id", controller.updateRestaurant);

export default router;
