# Postman Testing Guide

## 🔐 Authentication Endpoints Testing

### Prerequisites
- Make sure your server is running: `npm start`
- Server should be running on `http://localhost:3000` (or your configured PORT)

---

## 1️⃣ SIGNUP (Create New User)

### Endpoint Details:
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/signup`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "name": "Abdul Wahab",
  "email": "wahab@gmail.com",
  "password": "123456"
}
```

### Step-by-Step in Postman:

1. **Create New Request**
   - Click "New" → "HTTP Request"
   - Name it: "Signup"

2. **Set Method**
   - Select `POST` from dropdown

3. **Enter URL**
   - `http://localhost:3000/api/auth/signup`

4. **Set Headers**
   - Go to "Headers" tab
   - Add header:
     - Key: `Content-Type`
     - Value: `application/json`

5. **Set Body**
   - Go to "Body" tab
   - Select "raw"
   - Select "JSON" from dropdown (next to raw)
   - Paste the JSON body:
   ```json
   {
     "name": "Abdul Wahab",
     "email": "wahab@gmail.com",
     "password": "123456"
   }
   ```

6. **Send Request**
   - Click "Send" button
   - You should see a response like:
   ```json
   {
     "message": "User created successfully",
     "user": {
       "id": 1,
       "name": "Abdul Wahab",
       "email": "wahab@gmail.com"
     }
   }
   ```
   - Status: `201 Created`

---

## 2️⃣ LOGIN (Get JWT Token)

### Endpoint Details:
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/login`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "wahab@gmail.com",
  "password": "123456"
}
```

### Step-by-Step in Postman:

1. **Create New Request**
   - Click "New" → "HTTP Request"
   - Name it: "Login"

2. **Set Method**
   - Select `POST` from dropdown

3. **Enter URL**
   - `http://localhost:3000/api/auth/login`

4. **Set Headers**
   - Go to "Headers" tab
   - Add header:
     - Key: `Content-Type`
     - Value: `application/json`

5. **Set Body**
   - Go to "Body" tab
   - Select "raw"
   - Select "JSON" from dropdown
   - Paste the JSON body:
   ```json
   {
     "email": "wahab@gmail.com",
     "password": "123456"
   }
   ```

6. **Send Request**
   - Click "Send" button
   - You should see a response like:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5...",
     "user": {
       "id": 1,
       "name": "Abdul Wahab"
     }
   }
   ```
   - Status: `200 OK`

7. **⚠️ IMPORTANT: Copy the Token**
   - Copy the entire `token` value from the response
   - You'll need this for protected routes

---

## 3️⃣ TESTING PROTECTED ROUTES (Using the Token)

### Example: Get Home Feed

1. **Create New Request**
   - Click "New" → "HTTP Request"
   - Name it: "Get Home Feed"

2. **Set Method**
   - Select `GET` from dropdown

3. **Enter URL**
   - `http://localhost:3000/api/home`

4. **Set Headers** ⚠️ IMPORTANT
   - Go to "Headers" tab
   - Add header:
     - Key: `Authorization`
     - Value: `Bearer <paste_your_token_here>`
   
   Example:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5...
   ```

5. **Send Request**
   - Click "Send"
   - Should return posts array

---

## 📝 Quick Reference

### Signup
```
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

### Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

### Protected Route (Example)
```
GET http://localhost:3000/api/home
Authorization: Bearer <your_jwt_token>
```

---

## 🐛 Common Issues

1. **"No token provided"**
   - Make sure you added `Authorization` header
   - Format must be: `Bearer <token>` (with space after Bearer)

2. **"Invalid token"**
   - Token might have expired (24h)
   - Token format is wrong
   - Login again to get a new token

3. **"User already exists"**
   - Email is already registered
   - Use a different email or delete the user from database

4. **"Invalid credentials"**
   - Wrong email or password
   - Check the email and password match

5. **Connection Error**
   - Make sure server is running (`npm start`)
   - Check the PORT in your `.env` file


