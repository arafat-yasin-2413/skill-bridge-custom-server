import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();
router.post("/register", authController.createUser);

export const authRoutes = router;
