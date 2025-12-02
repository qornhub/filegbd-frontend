# 📘 FileGBD — File Management System

FileGBD is a full-stack note-taking application built with **Vue.js (frontend)**, **Node.js + Express (backend)**, and **MySQL (database)**.

It provides:

- User registration & login (JWT-based)
- A clean, minimal black-and-white interface
- Note creation, editing, deletion
- Search and responsive layout
- A sidebar optimized for productivity

---

## 🚀 Features

### 🔹 Frontend (Vue.js + Vite)
- Responsive layout (desktop & mobile)
- Register / Login pages with modern UI
- Notes sidebar with:
  - List of notes (title + created date)
  - Only the notes list area scrolls
  - 3-dot menu for Edit / Delete
  - User avatar using first 2 letters of username
- Notes panel with:
  - Rich display of title and content
  - Word count & reading time
  - “Empty state” welcome screen

### 🔹 Backend (Node.js + Express)
- RESTful API under `/api`
- Authentication routes:
  - `POST /api/register`
  - `POST /api/login`
- Notes routes (protected with JWT middleware):
  - `GET /api/notes`
  - `POST /api/notes`
  - `PUT /api/notes/:id`
  - `DELETE /api/notes/:id`
- Password hashing with **bcryptjs**
- JWT token generation with **jsonwebtoken**
- MySQL database via **mysql2**

---

## 🛠️ Tech Stack

| Layer     | Technology             |
|----------|------------------------|
| Frontend | Vue 3, Vite, Tailwind-style utility classes |
| Backend  | Node.js, Express       |
| Database | MySQL (Railway / local)|
| Deploy   | Vercel (frontend), Railway (backend + DB) |

---

## 📁 Project Structure

```bash
project-root/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   └── Notes.vue
│   │   ├── components/
│   │   │   └── notes/
│   │   │       ├── NotesSidebar.vue
│   │   │       └── NotesPanel.vue
│   │   ├── api.js
│   │   └── router/index.js
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🧰 Local Setup — How to Run

### 1️⃣ Clone the Project
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd project-root
```

### 2️⃣ Database Setup
```sql
CREATE DATABASE notes_db;
SOURCE /path/to/notes.sql;
```

### 3️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=notes_db
DB_PORT=3306

PORT=3000
CORS_ORIGIN=*
JWT_SECRET=SECRET_KEY_123
```

Start backend:
```bash
npm run dev
```

### 4️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create `.env`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

Start frontend:
```bash
npm run dev
```

---

## 🌍 Deployment

### 🚀 Backend on Railway
- Link backend repo
- Add MySQL service
- Set Railway MySQL credentials as env vars
- Import SQL
- Deploy

Example API:
```
https://filegbd-backend-production.up.railway.app/api
```

---

### 🚀 Frontend on Vercel
Add env var:
```
VITE_API_BASE_URL=https://filegbd-backend-production.up.railway.app/api
```

Deploy.

Example:
```
https://filegbd-frontend.vercel.app
```

---

## 🔐 API Summary

### Auth Routes
POST /api/register  
POST /api/login  

### Notes Routes (Require JWT)
GET /api/notes  
POST /api/notes  
PUT /api/notes/:id  
DELETE /api/notes/:id  

---

## 🧩 Development Process (AI Usage)

### 🎨 Example 1 — Sidebar Layout
Prompt: refine sidebar, remove icons, scroll only list.  
AI output: sidebar structure.  
My changes: removed extra UI, fixed padding, ensured only list scrolls.


### 🌐 Example 3 — API Base URL
Prompt: replace hardcoded URLs.  
AI output: axios instance + .env  
My changes: fixed Railway DB errors, updated deployment configs.

---

## 👨‍💻 Author
Nelson Yong Chee Fei  
Bachelor of Computer Science (Software Engineering)  
Universiti Malaysia Sabah (UMS)
