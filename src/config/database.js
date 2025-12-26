const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'social_media',
  port: parseInt(process.env.DB_PORT) || 5432,
};

// Only include password if it's explicitly set in .env
// If DB_PASSWORD is not set, omit it (works for trust/no-password auth)
// If DB_PASSWORD is set to empty string, use empty string
if (process.env.DB_PASSWORD !== undefined && process.env.DB_PASSWORD !== null) {
  dbConfig.password = String(process.env.DB_PASSWORD);
  console.log('Password:', dbConfig.password);
}

const pool = new Pool(dbConfig);

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

