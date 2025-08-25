# 🛒 Mini Orders API

A production-like REST API for a tiny e-commerce/service app built with **Node.js (TypeScript)**.  
It supports **JWT authentication, role-based access control, product management, and order processing** with PostgreSQL persistence.  

This project is part of a technical assignment.

---

## 🚀 Features

- **Authentication**
  - User registration & login
  - JWT access + refresh token flow
  - Role-based access: `admin`, `customer`

- **Users**
  - Admin and Customer roles
  - Secure password hashing

- **Products**
  - Create, update, delete (Admin only)
  - Public product listing with search + pagination
  - Individual product details

- **Orders**
  - Customers can place orders with multiple items
  - Server calculates prices & validates stock
  - Admin can manage order status (`PENDING`, `PAID`, `CANCELLED`, `FULFILLED`)

- **Validation**
  - Request validation using `class-validator` (NestJS) or `zod/yup` (Express)

- **Database**
  - PostgreSQL with Prisma ORM (or TypeORM for NestJS)
  - All monetary values stored in **fils** (integer) to avoid floating-point errors

- **Testing**
  - Jest + Supertest for unit & integration tests

- **Tooling**
  - ESLint + Prettier for clean code
  - Husky pre-commit hooks
  - CI with GitHub Actions (lint + test)

---

## 🏗️ Tech Stack

- **Runtime**: Node.js 18+ (TypeScript)
- **Framework**: NestJS (preferred) or Express
- **ORM**: Prisma (or TypeORM)
- **Database**: PostgreSQL
- **Auth**: JWT (Access + Refresh tokens)
- **Validation**: class-validator (Nest) / zod/yup (Express)
- **Tests**: Jest + Supertest
- **CI/CD**: GitHub Actions
- **Lint/Format**: ESLint, Prettier, Husky

---

## 📦 Installation
```bash
git clone https://github.com/ujjwalkoundal/MiniiOrder.git
cd MiniiOrder
npm install

## env file
PORT=3000
SALT_ROUNDS=10
DB_NAME="mini_orders"
DB_USER="postgres"
DB_PASS="toor"
DB_HOST="localhost"

## to run app
npm run dev
```

🔑 API Endpoints
Auth

POST /auth/register – Register new user

POST /auth/login – Login (returns tokens)

POST /auth/refresh – Refresh tokens

POST /auth/me – Get profile (secured)

Products

POST /products – Create product (admin only)

GET /products – List products with pagination + search

GET /products/:id – Get product by ID

PATCH /products/:id – Update product (admin only)

DELETE /products/:id – Delete product (admin only)

Orders

POST /orders – Place new order (customer)

GET /orders – Get user’s orders (admin sees all)

GET /orders/:id – Get order details

PATCH /orders/:id/status – Update order status (admin only)


📂 Project Structure
```bash
src/
│── config/        # Configuration (env, db, etc.)
│── controllers/   # Controllers (request handling)
│── middleware/    # Auth, validation, logging
│── models/        # Database models/entities
│── routes/        # API routes
│── utils/         # Helper utilities
│── app.ts         # App bootstrap
│── server.ts      # Server entry point
```

👤 Roles & Permissions
Role	Permissions

Customer ->	Register, Login, View Products, Place Orders

Admin ->	Manage Products, View/Update All Orders
