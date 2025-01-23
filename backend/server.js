import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.get('/', (req, res) => res.send('Server is ready'));

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
