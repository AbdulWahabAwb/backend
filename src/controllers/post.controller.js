const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const user_id = req.user.userId; // From auth middleware

    // Validate input
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Create post
    const post = await Post.create({
      user_id,
      content: content.trim(),
      image: image || null
    });

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post by id error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user_id = req.user.userId; // From auth middleware
    const posts = await Post.findByUserId(user_id);
    res.json({ posts });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

