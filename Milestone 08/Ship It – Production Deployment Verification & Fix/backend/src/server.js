import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Bug: CORS only allows http://localhost:5173
// This will block the deployed Vercel frontend from making requests!
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use('/health', healthRoutes);
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
