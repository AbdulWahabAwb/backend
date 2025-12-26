const pool = require('../config/database');

class Post {
    static async create({ user_id, content, image }) {
        const query = `
            INSERT INTO posts (user_id, content, image)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, content, image, created_at
        `;
    const result = await pool.query(query, [user_id, content, image || null]);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT p.id, p.user_id, p.content, p.image, p.created_at,
             u.name as user_name, u.email as user_email
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT p.id, p.user_id, p.content, p.image, p.created_at,
             u.name as user_name, u.email as user_email
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const query = `
      SELECT p.id, p.user_id, p.content, p.image, p.created_at,
             u.name as user_name, u.email as user_email
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }
}

module.exports = Post;

