# Product Management System

The Product Management System is a full-stack web application developed using React.js, Node.js, Express.js, and MySQL. It allows users to securely manage products with JWT authentication, role-based authorization, image upload, and CRUD operations.

# Features

# Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

# Product Management

- Add Product
- View Product
- Update Product
- Delete Product
- Search Products
- Upload Product Image

# Role-Based Access

- **Admin**
  - View all products
  - Add products
  - Edit any product
  - Delete any product
  - admin mail suraj@gmail.com
  - pass-123456
- **User**
  - View all products
  - Edit/Delete only their own products

====================\*==============================

Technologies Used

Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

Backend

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- Multer
- dotenv
- CORS

====================\*==============================

Setup Instructions

Step 1: Clone Repository

bash
git clone https://github.com/PavanGhadage/mernstack/tree/main/React/Task

====================\*==============================

##Step 2: Install Backend Dependencies

cd backend

npm install

====================\*==============================

##Step 3: Install Frontend Dependencies

cd ../frontend

npm install

====================\*==============================

## Step 4: Configure MySQL Database

Open MySQL Workbench and execute the SQL script provided in `database.sql`.

Or manually create a database named:

sql
CREATE DATABASE interview_crud;

Import the `database.sql` file into MySQL Workbench.

====================\*==============================

Step 5: Configure Environment Variables

Inside the backend folder create a `.env` file.

Example:

env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Pavan@1234
DB_NAME=interview_crud

JWT_SECRET=InterviewSecret123

====================\*==============================

Step 6: Start Backend Server

cd backend

npm run dev

Backend runs on:

http://localhost:5000

====================\*==============================

Step 7: Start Frontend

cd frontend

npm run dev

Frontend runs on:

http://localhost:5173

# API Endpoints

## Authentication

/api/auth/login for login POST
/api/auth/register for rgister POST

====================\*==============================

## Products

GET | /api/products | Get All Products
GET | /api/products/:id | Get Product By ID
POST | /api/products | Add Product
PUT | /api/products/:id | Update Product
DELETE | /api/products/:id | Delete Product

====================\*==============================

## Default Roles

- **Admin:** Full access to product management.
- **User:** Can view all products and edit/delete only their own products.

====================\*==============================

## Notes

- Ensure MySQL Server is running before starting the backend.
- Configure the `.env` file with your local database credentials.
- Product images are stored in the `backend/uploads` directory.

---
