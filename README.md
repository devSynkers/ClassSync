# 📚 classSync – Smart Timetable & Communication System

**classSync** is a real-time, full-stack timetable management platform designed for colleges. It streamlines the communication between faculty and students by enabling class swaps, cancellations, and live updates — all in one unified interface.

---

## 🚀 Features

### 🎓 For Students
- 🗕️ View real-time **daily/weekly calendar**
- 🔔 Get **instant alerts** when classes are canceled or rescheduled
- 📢 Receive **prerequisite notifications** from faculty (e.g., “Bring your laptop”)

### 🧑‍🏫 For Faculty
- 🔄 **Swap lectures** with colleagues (swap requests with optional notes)
- ❌ **Cancel periods** (automatically notifies available staff and students)
- 🗓️ Manage personal **faculty timetable**
- 👥 Access **batch-wise calendars** (e.g., MCAR2024)

### 🛠️ For Admin
- 🧑‍💼 Onboard new faculty/students
- ⚖️ Configure timetable, academic year, and batch settings

---

## 🧱 Tech Stack

| Layer        | Tech                               |
|--------------|------------------------------------|
| Frontend     | React (Vite) + Tailwind CSS + MUI  |
| Backend      | Node.js + Express (Microservices)  |
| Database     | PostgreSQL                         |
| Auth         | JWT / Session-based Auth           |
| Version Ctrl | Git + GitHub (Org: `DevSynkers`)   |

---

## 📂 Monorepo Structure

```
classSync/
│
├── frontend/              # React + Tailwind + MUI
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── ...
│
├── backend/
│   ├── student-api/       # Microservice: student operations
│   ├── faculty-api/       # Microservice: faculty operations
│   └── shared/            # Auth, DB utils, middlewares
│
└── README.md
```

---

## 🥪 Local Setup

### 🔧 Prerequisites:
- Node.js (v18+)
- PostgreSQL
- Git

### ⚙️ Installation

```bash
# 1. Clone the repo
git clone git@github.com:DevSynkers/classSync.git

# 2. Move into the project
cd classSync

# 3. Install frontend dependencies
cd frontend && npm install

# 4. Install backend services
cd ../backend/student-api && npm install
cd ../faculty-api && npm install
```

### 🌐 Run Locally

```bash
# In separate terminals:
cd frontend && npm run dev         # starts Vite frontend
cd backend/student-api && npm run dev
cd backend/faculty-api && npm run dev
```

---

## 📌 Roadmap

- [x] Setup monorepo with GitHub org
- [x] Implement calendar view for students
- [x] Enable real-time swap/cancel logic for faculty
- [ ] Add email/push notifications
- [ ] Admin dashboard
- [ ] Docker support & CI/CD via GitHub Actions

---

## 🧑‍💻 Team

**DevSynkers (GitHub Org)**  
🧪 Hemnath, Sheena, Simona, Raasika, Ryan

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 💬 Feedback & Contributions

Found a bug? Have a feature request?  
Open an issue or start a discussion — let’s sync ideas with classSync.