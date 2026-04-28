import express from 'express';
import { userController } from './user.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.get("/all", userController.getAllUser);

export const userRoutes = router;
