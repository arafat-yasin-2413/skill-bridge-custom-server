import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { tutorController } from "./tutor.controller";

const router = express.Router();
router.get("/all-profile",tutorController.getAllTutorProfiles);
router.post("/create-profile", auth(UserRole.TUTOR), tutorController.createTutorProfile);

export const tutorRoutes = router;
