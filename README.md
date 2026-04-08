# 🚀 Career Mesh

Career Mesh is a full-stack professional networking platform that enables users to connect, share posts, and build meaningful professional relationships. Built with modern technologies, it provides a scalable and secure backend with a responsive frontend experience.

---

## 📌 About
Career Mesh allows users to create profiles, send connection requests, interact with posts, and manage their network. The backend is powered by Node.js and Express, while the frontend uses Next.js for a fast and modern UI.

---

## ✨ Features

- 🔐 Authentication (JWT-based login/register/logout)
- 👤 User profiles & resume management
- 🤝 Connection requests & network system
- 📝 Post creation with media upload
- 💬 Comment system on posts
- ❤️ Like functionality
- 📂 File upload handling (Multer)
- ⚡ Background jobs with BullMQ & Redis
- 📧 Email services (Nodemailer)

---

##  Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Sequelize ORM)
- Redis + BullMQ
- JWT Authentication
- Multer (file uploads)

### Frontend
- Next.js
- React
- Zustand (state management)

### Other Tools
- Cloud Vision & Video Intelligence APIs
- PDF generation (PDFKit / React-PDF)

---

## 📁 Project Structure

backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middlewares/
│ ├── services/
│ └── utils/
└── server.js

frontend/
├── app/
├── layout/
├── components/
└── store/

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/career-mesh.git
cd career-mesh
## 2️⃣ Setup Backend
cd backend
npm install

Create a .env file:

PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:3000

Run backend:

npm run dev
3️⃣ Setup Frontend
cd frontend
npm install
npm run dev
🔌 API Endpoints (Sample)
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
Profile
GET /api/profile/me
PUT /api/profile/me
Posts
GET /api/post
POST /api/post
DELETE /api/post/:postId
Connections
POST /api/connections/request/:receiverId
GET /api/connections/list
🚀 Scripts
Backend
npm run dev     # Development
npm start       # Start with nodemon
npm run prd     # Production (pm2)
Frontend
npm run dev
npm run build
npm run start
🔒 Security
Password hashing using bcrypt
JWT-based authentication
Protected routes with middleware
CORS configuration for secure communication

📈 Future Improvements
Real-time chat system
Notifications
Job posting module
Advanced search & filtering
AI-powered recommendations
🤝 Contributing

Contributions are welcome!

Fork the repo
Create a new branch
Make your changes
Submit a pull request
📄 License

This project is licensed under the ISC License.

💡 Author

Developed by [Muhammad Usman]
