# Task Management Backend (task-management-be)

## Overview
The **Task Management Backend** is a Node.js and Express-based microservice that provides a REST API for managing user tasks. It supports authentication, role-based access control, and CRUD operations for tasks. The backend is designed to work with a frontend application and interacts with a database to store user and task information.


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
   PORT=your_port_no
   ```
4. Start the server:
   ```sh
   npm run dev 
   ```



## Folder Structure
```
├── config
│   ├── database.js         # Database connection
├── middlewares
│   ├── auth.js            # Authentication middleware
│   ├── adminAuth.js       # Admin role-based middleware
├── models
│   ├── user.js            # User model
│   ├── task.js            # Task model
├── routes
│   ├── auth.js            # Authentication routes
│   ├── profile.js         # User profile routes
│   ├── task.js            # Task management routes
├── utils
│   ├── validation.js      # Input validation functions
├── .gitignore
├── app.js                 # Entry point
├── package.json
├── README.md
```

## Running the Project
1. Ensure MongoDB is running locally or provide a connection string.
2. Start the server using `npm run dev`.
3. Use Postman, Curl, or an API testing tool to test the endpoints.

## License
This project is open-source and available under the MIT License.



