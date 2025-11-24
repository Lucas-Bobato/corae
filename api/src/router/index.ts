import restaurantsRouter from "@/modules/restaurants/restaurant.router";
import reviewsRouter from "@/modules/reviews/reviews.router";
import usersRouter from "@/modules/users/users.router";
import { Router } from "express";

const router = Router();

router.use("/restaurants", restaurantsRouter);
router.use("/users", usersRouter);
router.use("/reviews", reviewsRouter);

export default router;
