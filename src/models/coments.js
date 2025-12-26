const pool = require('../config/database');

class Comment {
    static async create({ post_id, user_id, text }) {
        const query = `
            INSERT INTO comments (post_id, user_id, text)
            VALUES ($1, $2, $3)
            RETURNING id, post_id, user_id, text, created_at
        `;
        const result = await pool.query(query, [post_id, user_id, text]);
        return result.rows[0];
    }

    static async findAll() {
        const query = `SELECT * FROM comments`;
        const result = await pool.query(query);
        return result.rows;
    }
    static async findById(id) {
        const query = `SELECT * FROM comments WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
    static async findByPostId(post_id) {
        const query = `SELECT * FROM comments WHERE post_id = $1`;
        const result = await pool.query(query, [post_id]);
        return result.rows;
    }
    static async findByUserId(user_id) {
        const query = `SELECT * FROM comments WHERE user_id = $1`;
        const result = await pool.query(query, [user_id]);
        return result.rows;
    }
}

module.exports = Comment;