# 🏆 Leaderboard App

A full-stack leaderboard application where users can be added, claim points, and view their ranking history.  
Built with **MERN stack** and deployed on **Render (backend)** + **Vercel (frontend)**.

---

## 🚀 Features
- Add new users to the leaderboard
- Claim points for any user
- Automatic ranking updates (sorted by points)
- View claim history of each user
- Responsive UI with Tailwind CSS
- Deployed live on cloud

---

## 🛠️ Tech Stack
**Frontend:** React, Axios, Tailwind CSS  
**Backend:** Node.js, Express.js, Mongoose  
**Database:** MongoDB Atlas  
**Deployment:** Render (API) + Vercel (UI)

---

## 📂 Project Folder Structure

```bash
├── 📂 frontend/                # React + Vite + Tailwind frontend
│   ├── 📂 components/          # UI components
│   │   ├── 📂 HistoryList/
│   │   │   ├── HistoryList.jsx
│   │   │   └── index.js
│   │   ├── 📂 Leaderboard/
│   │   │   ├── LeaderboardTable.jsx
│   │   │   └── index.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── 📂 backend/                 # Node.js + Express + MongoDB backend
│   ├── 📂 models/              # Database schemas
│   │   ├── User.js
│   │   └── History.js
│   │
│   ├── 📂 routes/              # API routes
│   │   └── userRoutes.js
│   │
│   ├── server.js               # Entry point for backend
│   └── .env                    # Environment variables (Mongo URI, PORT)
│
├── 📂 public/                  # Static assets
│   └── favicon.ico
│
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 📦 Installation

**Clone the repository**
   ```bash
   git clone https://github.com/yourusername/leaderboard-app.git
   cd leaderboard-app
   ```
   ### 1. Backend Setup
   ```bash
   cd backend
   npm install
   ```
   ### Run Locally
   ```bash
   cd backend
   npm install
   ```
   ### 2. Frontend Setup
   ```bash
   cd frontend
   npm install
   ```
   ### Run Locally
   ```bash
   npm run dev
   ```
---
## 🌍 Deployment
- **Backend**: [Render](https://render.com)  
- **Frontend**: [Vercel](https://vercel.com)  

## 👨‍💻 Author
- **[Nikhil Pandey](https://github.com/pandeynikhilone)**
