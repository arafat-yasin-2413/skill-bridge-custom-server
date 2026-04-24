import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();
router.post("/register", authController.createUser);
router.post("/login", authController.userLogin);

export const authRoutes = router;
