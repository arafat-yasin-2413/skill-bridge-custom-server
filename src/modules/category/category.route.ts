import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { categoryControllers } from "./category.controller";


const router = express.Router();

router.post("/create", auth(UserRole.ADMIN), categoryControllers.createCategory);

export const categoryRoutes = router;