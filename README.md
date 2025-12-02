📘 FileGBD — Notes Management App

A full-stack note-taking system built with Vue.js, Node.js (Express), and MySQL, featuring authentication, CRUD notes, and responsive UI.

🚀 Features
Frontend (Vue.js)

User registration & login

Fully responsive UI

Create, edit, delete notes

Search notes

Clean, modern sidebar + editor design

Persistent login (localStorage token)

Backend (Node.js + Express)

REST API

JWT Authentication

MySQL Database (Users + Notes)

Secure password hashing (bcrypt)

CORS enabled for deployment

Database (MySQL)

users table

notes table

Foreign key relationship

🛠️ Tech Stack
Layer	Technology
Frontend	Vue.js + Vite
Backend	Node.js (Express)
Database	MySQL
Deployment	Vercel (Frontend), Railway (Backend + DB)
📁 Project Structure
project-root/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md

📦 Installation & Setup (Local Development)

This guide shows how to run the entire app locally.

🗄️ 1. Clone the Repository
git clone https://github.com/<your-username>/<your-repo>.git
cd project-root

🛠️ 2. Backend Setup

Go into the backend folder:

cd backend

Install dependencies:
npm install

Create a .env file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=notes_db
DB_PORT=3306
JWT_SECRET=SECRET_KEY_123
PORT=3000

Start backend:
npm run dev


The backend will run on:

http://localhost:3000

🧰 3. Database Setup

Create database:

CREATE DATABASE notes_db;


Import the SQL file:

source notes_fixed.sql;


Tables created:

users

notes

🌐 4. Frontend Setup

Go into the frontend folder:

cd ../frontend


Install dependencies:

npm install


Create .env:

VITE_API_BASE_URL=http://localhost:3000/api


Run development server:

npm run dev


The frontend will run on:

http://localhost:5173

🌍 Deployment Guide
🚀 Frontend (Vue) — Vercel

Push frontend to GitHub

Go to Vercel → New Project

Select your repo

Add Environment Variable:

VITE_API_BASE_URL=https://<your-railway-backend>.railway.app/api


Deploy

🚀 Backend (Node.js) — Railway

Create new Railway project

Deploy your backend GitHub repo

Add environment variables:

DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_PORT=...
JWT_SECRET=SECRET_KEY_123
PORT=3000


Connect MySQL plugin

Import your SQL

Deploy backend

Your backend URL becomes:

https://filegbd-backend-production.up.railway.app

🔐 Authentication Flow

User registers

Password is hashed using bcrypt

Login returns JWT token

Frontend stores token in localStorage

All note requests require Authorization header:

Authorization: Bearer <token>

📝 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/register	Register user
POST	/api/login	Login user
Notes
Method	Endpoint	Description
GET	/api/notes	Fetch notes
POST	/api/notes	Create note
PUT	/api/notes/:id	Update note
DELETE	/api/notes/:id	Delete note
🧪 Testing

Test backend with Postman or Thunder Client:

Example login payload:

{
  "email": "demo@example.com",
  "password": "password"
}

😊 Credits

Developed by Nelson Yong Chee Fei
UMS — Bachelor of Computer Science (Software Engineering)
