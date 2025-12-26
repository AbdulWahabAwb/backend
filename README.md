# Social Media Backend API

A RESTful API built with Node.js, Express, PostgreSQL, and JWT authentication.

## Features

- ✅ User Signup and Login (JWT-based)
- ✅ Token-protected routes
- ✅ Create and Get Posts
- ✅ Comment on Posts
- ✅ Home Feed (Protected)

## Tech Stack

- **Backend**: Node.js + Express
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Password Hashing**: bcryptjs

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=social_media
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Create PostgreSQL Database

```sql
CREATE DATABASE social_media;
```

### 4. Run the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will automatically create the necessary database tables on startup.

## API Endpoints

### 🔐 Authentication

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Abdul Wahab",
  "email": "wahab@gmail.com",
  "password": "123456"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "wahab@gmail.com",
  "password": "123456"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "Abdul Wahab"
  }
}
```

### 🏠 Home Feed (Protected)

#### Get All Posts
```
GET /api/home
Authorization: Bearer <token>
```

### 📝 Posts

#### Create Post (Protected)
```
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "This is my first post",
  "image": "image_url_optional"
}
```

#### Get All Posts
```
GET /api/posts
```

#### Get Single Post
```
GET /api/posts/:postId
```

### 💬 Comments

#### Add Comment on Post (Protected)
```
POST /api/posts/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Nice post!"
}
```

#### Get Comments of a Post
```
GET /api/posts/:postId/comments
```

## Project Structure

```
src/
├── controllers/
│   ├── auth.controller.js
│   ├── post.controller.js
│   └── comment.controller.js
├── routes/
│   ├── auth.routes.js
│   └── post.routes.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── config/
│   └── database.js
├── app.js
└── server.js
```

## Database Schema

### Users
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- password (VARCHAR)
- created_at (TIMESTAMP)

### Posts
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER FOREIGN KEY)
- content (TEXT)
- image (VARCHAR)
- created_at (TIMESTAMP)

### Comments
- id (SERIAL PRIMARY KEY)
- post_id (INTEGER FOREIGN KEY)
- user_id (INTEGER FOREIGN KEY)
- text (TEXT)
- created_at (TIMESTAMP)

## Authentication Flow

1. **Signup**: User registers → password is hashed → user saved in DB
2. **Login**: User logs in → server generates JWT token
3. **Protected Routes**: User sends token in `Authorization: Bearer <JWT_TOKEN>` header

## Notes

- All protected routes require the JWT token in the Authorization header
- JWT tokens expire after 24 hours
- Passwords are hashed using bcryptjs before storing
- Database tables are automatically created on server start


