import { Router } from "express";
import * as controller from "./users.controller";

const router = Router();

router.get("/", controller.listUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.createUser);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
