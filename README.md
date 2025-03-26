# Task Management Backend (task-management-be)

## Overview
The **Task Management Backend** is a Node.js and Express-based API server that provides authentication and user profile management features. It supports user sign-up, login, authentication using JWT, and profile retrieval.

## Features
- User authentication (Sign Up, Login, Logout)
- Password hashing using bcrypt
- JWT-based authentication
- Secure cookie-based token storage
- Middleware for protected routes

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcrypt (for password hashing)
- JSON Web Tokens (JWT)
- Cookies for session management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/task-management-be.git
   cd task-management-be
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication Routes

#### 1. **Sign Up**
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailID": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User signup successful",
  "user": { ...userDetails }
}
```

---

#### 2. **Login**
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "emailID": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User login successful",
  "user": { ...userDetails }
}
```

---

#### 3. **Logout**
**Endpoint:** `POST /api/auth/logout`

**Response:**
```json
"Logout successful"
```

---

### Profile Routes

#### 4. **Get User Profile** (Protected Route)
**Endpoint:** `GET /api/profile`

**Headers:**
```json
{
  "Authorization": "Bearer <your_token>"
}
```

**Response:**
```json
{
  "message": "User sent successfully",
  "user": { ...userDetails }
}
```

## Project Structure
```
├── models
│   ├── user.js
├── routes
│   ├── auth.js
│   ├── profile.js
├── middlewares
│   ├── auth.js
├── utils
│   ├── validation.js
├── server.js
└── package.json
```

## Running the Project
1. Ensure MongoDB is running locally or provide a connection string.
2. Start the server using `npm start`.
3. Use Postman, Curl, or an API testing tool to test the endpoints.

## License
This project is open-source and available under the MIT License.

