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
   npm run dev 
   ```



## Project Structure
```
├── models
│   ├── user.js
├── routes
│   ├── auth.js
|   ├── auth.js
│   ├── profile.js
├── middlewares
│   ├── auth.js
|   ├── adimAuth.js
├── utils
│   ├── validation.js
├── server.js
└── package.json
```

## Running the Project
1. Ensure MongoDB is running locally or provide a connection string.
2. Start the server using `npm run dev`.
3. Use Postman, Curl, or an API testing tool to test the endpoints.

## License
This project is open-source and available under the MIT License.

