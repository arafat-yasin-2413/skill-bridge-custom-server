import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { authRoutes } from './app/modules/auth/auth.route';
import { userRoutes } from './app/modules/user/user.route';
import { categoryRoutes } from './app/modules/category/category.route';
import { tutorRoutes } from './app/modules/tutor/tutor.route';
import { notFound } from './app/middlewares/notFound';

const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

// application routes
// app.use('/api/v1', router);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/tutors", tutorRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

app.use(notFound);

export default app;

