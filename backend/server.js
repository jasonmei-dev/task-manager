import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskListRoutes from './routes/taskListRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { routeNotFound, errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', userRoutes, taskListRoutes, taskRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
