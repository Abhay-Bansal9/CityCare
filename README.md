# 🏙️ CityCare - Smart Civic Complaint Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing civic complaints. Citizens can file complaints about civic issues, track their status, and administrators can manage and resolve them.

## ✨ Features

### For Citizens
- **Register/Login** with secure JWT authentication
- **File Complaints** with categories: Garbage, Pothole, Streetlight, Water Supply, Other
- **Track Status** of complaints in real-time (Registered → In Progress → Resolved)
- **View Details** including resolution remarks and assigned departments

### For Admins
- **Dashboard** with complaint statistics
- **View All Complaints** with filters by status and category
- **Manage Complaints** — update status, assign departments, add resolution remarks

## 🛠️ Tech Stack

| Layer      | Technology                                       |
|------------|--------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS v4, React Router v7 |
| Backend    | Node.js, Express.js                              |
| Database   | MongoDB with Mongoose                            |
| Auth       | JWT (JSON Web Tokens), bcryptjs                  |

---

## 📦 Project Structure

```
citycare/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, GetMe
│   │   ├── complaintController.js # File, List, View complaints
│   │   └── adminController.js    # Admin: manage complaints, stats
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification, admin check
│   │   └── errorMiddleware.js    # Global error handler
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   └── Complaint.js          # Complaint schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   ├── complaintRoutes.js    # /api/complaints/*
│   │   └── adminRoutes.js        # /api/admin/*
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js          # Axios instance with JWT interceptor
│   │   ├── components/           # Navbar, Footer, ComplaintCard, StatusBadge, ProtectedRoute
│   │   ├── context/AuthContext.jsx # Auth state management
│   │   ├── pages/                # Home, Login, Register, Dashboard, FileComplaint, etc.
│   │   │   └── admin/            # AdminDashboard, AllComplaints, ManageComplaint
│   │   ├── App.jsx               # Routes configuration
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Tailwind + custom styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) — [Download](https://www.mongodb.com/try/download/community)
- **Git** — [Download](https://git-scm.com/)

### Step 1: Start MongoDB

Make sure MongoDB is running on your machine:

**Windows (if installed as a service):**
```bash
# MongoDB should be running automatically as a service.
# If not, start it from Services or run:
net start MongoDB
```

**Windows (manual start):**
```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
mongod --dbpath /data/db
```

Verify MongoDB is running by connecting:
```bash
mongosh
# You should see the MongoDB shell prompt
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 4: Configure Environment Variables

The backend `.env` file is already configured with defaults:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/citycare
JWT_SECRET=citycare_secret_key_2024
JWT_EXPIRE=7d
```

> **Note:** For production, change `JWT_SECRET` to a long random string and update `MONGO_URI` to your production MongoDB URI.

### Step 5: Run the Backend

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Step 6: Run the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE ready
➜  Local:   http://localhost:5173/
```

### Step 7: Open the App

Visit **http://localhost:5173** in your browser.

---

## 👤 Creating Users

### Register as a Citizen
1. Go to http://localhost:5173/register
2. Fill in: Name, Email, Password
3. Select Role: **Citizen**
4. Click "Create Account"

### Register as an Admin
1. Go to http://localhost:5173/register
2. Fill in: Name, Email, Password
3. Select Role: **Admin**
4. Click "Create Account"

### Quick Test Accounts

Register these accounts to test both roles:

| Role    | Email              | Password  |
|---------|--------------------|-----------|
| Citizen | citizen@test.com   | 123456    |
| Admin   | admin@test.com     | 123456    |

---

## 🔌 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint    | Access  | Description           |
|--------|-------------|---------|-----------------------|
| POST   | `/register` | Public  | Register a new user   |
| POST   | `/login`    | Public  | Login & get JWT token |
| GET    | `/me`       | Private | Get current user info |

### Complaints (`/api/complaints`)
| Method | Endpoint | Access  | Description                  |
|--------|----------|---------|------------------------------|
| POST   | `/`      | Citizen | File a new complaint         |
| GET    | `/my`    | Citizen | Get citizen's own complaints |
| GET    | `/:id`   | Private | Get complaint by ID          |

### Admin (`/api/admin`)
| Method | Endpoint          | Access | Description                |
|--------|-------------------|--------|----------------------------|
| GET    | `/complaints`     | Admin  | Get all complaints         |
| PUT    | `/complaints/:id` | Admin  | Update complaint status    |
| GET    | `/stats`          | Admin  | Get dashboard statistics   |

---

## 🎨 Color Coding

| Status      | Color  |
|-------------|--------|
| Registered  | 🟡 Amber  |
| In Progress | 🔵 Blue   |
| Resolved    | 🟢 Green  |

---

## 📄 License

This project is for educational/demo purposes.
