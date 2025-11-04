import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Use PORT from environment (required for Railway, Render, etc.) or default to 3001
const PORT = process.env.PORT || 3001;

// Configure CORS to allow requests from GitHub Pages and localhost
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative local port
    /^https:\/\/.*\.github\.io$/, // All GitHub Pages domains
  ],
  credentials: true
}));
app.use(express.json());

// In-memory storage for attendance (shared across all users)
// In production, you'd use a database
let attendanceData = {};

// Attendance Routes (no /api prefix since Vite proxy handles it)
app.get('/attendance', (req, res) => {
  res.json({
    success: true,
    data: attendanceData
  });
});

app.get('/attendance/:personId', (req, res) => {
  const { personId } = req.params;
  const count = attendanceData[personId] || 0;
  
  res.json({
    success: true,
    data: {
      personId,
      count
    }
  });
});

app.post('/attendance/:personId/increment', (req, res) => {
  const { personId } = req.params;
  const currentCount = attendanceData[personId] || 0;
  attendanceData[personId] = currentCount + 1;
  
  res.json({
    success: true,
    data: {
      personId,
      count: attendanceData[personId]
    }
  });
});

app.post('/attendance/:personId/decrement', (req, res) => {
  const { personId } = req.params;
  const currentCount = attendanceData[personId] || 0;
  if (currentCount > 0) {
    attendanceData[personId] = currentCount - 1;
  } else {
    attendanceData[personId] = 0;
  }
  
  res.json({
    success: true,
    data: {
      personId,
      count: attendanceData[personId]
    }
  });
});

app.post('/attendance/:personId/reset', (req, res) => {
  const { personId } = req.params;
  delete attendanceData[personId];
  
  res.json({
    success: true,
    message: 'Attendance reset successfully'
  });
});

// People routes (if needed, adjust based on your existing backend)
app.get('/people', (req, res) => {
  // This should connect to your existing people data source
  res.json({
    success: true,
    data: []
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.PORT) {
    console.log(`Backend is accessible at: ${process.env.RAILWAY_PUBLIC_DOMAIN || process.env.RENDER_EXTERNAL_URL || 'http://localhost:' + PORT}`);
  }
});
