import { Router } from "express";
import * as controller from "./reviews.controller";

const router = Router();

router.get("/", controller.listReviews);
router.get("/:id", controller.getReview);
router.post("/", controller.createReview);
router.delete("/:id", controller.deleteReview);

export default router;