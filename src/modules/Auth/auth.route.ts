import express from "express";
import { authController, googleCallback } from "./auth.controller";

const router = express.Router();
router.post("/register", authController.createUser);
router.post("/login", authController.userLogin);
router.post("/google", googleCallback);

export const authRoutes = router;
