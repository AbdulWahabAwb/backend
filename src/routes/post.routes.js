const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create post (protected)
router.post('/', authMiddleware, postController.createPost);

// Get all posts (public)
router.get('/', postController.getAllPosts);

// Get single post by id (public)
router.get('/:postId', postController.getPostById);

// Get current user's posts (protected)
router.get('/user/my-posts', authMiddleware, postController.getUserPosts);

module.exports = router;

