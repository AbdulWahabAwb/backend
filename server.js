require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Initialize database tables
async function initializeDatabase() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // // Create comments table
    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS comments (
    //     id SERIAL PRIMARY KEY,
    //     post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    //     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    //     text TEXT NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //   )
    // `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

startServer();

