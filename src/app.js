const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const authMiddleware = require('./middleware/auth.middleware');
const Post = require('./models/Post');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Home feed route (protected)
app.get('/api/home', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts });
  } catch (error) {
    console.error('Home feed error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;

