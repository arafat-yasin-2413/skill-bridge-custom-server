import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { tutorController } from "./tutor.controller";

const router = express.Router();
router.get("/",tutorController.getAllTutorProfiles);
router.get("/:id", tutorController.getSingleTutorProfile);
router.post("/create-profile", auth(UserRole.TUTOR), tutorController.createTutorProfile);

export const tutorRoutes = router;
