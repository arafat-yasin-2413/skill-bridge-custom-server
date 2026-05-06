import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.route';
import { userRoutes } from './modules/user/user.route';
import { categoryRoutes } from './modules/category/category.route';
import { notFound } from './middlewares/notFound';
import { tutorRoutes } from './modules/tutor/tutor.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

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

