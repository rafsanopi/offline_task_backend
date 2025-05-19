# 📝 Task Manager Backend

This is the backend server for the **Task Manager Flutter Application**, designed to handle task creation, updates, deletions, and user management. It is built using **Node.js**, **TypeScript**, and containerized using **Docker** for efficient deployment and scalability.

---

## ⚙️ Tech Stack

- **Node.js** – Runtime environment
- **TypeScript** – Static typing and improved developer experience
- **Express.js** – Lightweight web framework
- **MongoDB** – NoSQL database for storing user and task data
- **Docker** – Containerization for development and deployment
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication via JSON Web Tokens
- **Dotenv** – Environment configuration

---

## 📁 Project Structure

├── src/
│ ├── controllers/ # Route logic
│ ├── models/ # Mongoose models
│ ├── routes/ # API endpoints
│ ├── middlewares/ # Authentication & error handlers
│ ├── utils/ # Utility functions
│ ├── config/ # DB and app config
│ └── index.ts # Entry point
├── .env
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json



---

## 🚀 Features

- ✅ User authentication (register/login/logout)
- ✅ JWT-based secure session management
- ✅ CRUD operations for tasks (create, read, update, delete)
- ✅ RESTful API structure
- ✅ API response standardization
- ✅ Dockerized for consistent deployment
- ✅ Environment-based configuration support

---

## 🔧 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/) (local or Docker)

### Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend

Run with Docker
docker-compose up --build
