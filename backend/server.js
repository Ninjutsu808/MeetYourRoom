import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import swipeRoutes from './routes/swipeRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/swipe', swipeRoutes);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Meet Your Roommate API' });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
