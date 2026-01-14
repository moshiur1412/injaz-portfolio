# Injaz (إنجاز)

**Injaz** is a modern, production‑oriented developer portfolio showcasing real‑world applications built with **Laravel** and **React**. The project demonstrates secure authentication, real‑time communication, scalable API design, and clean architecture.

---

## 🚀 Tech Stack

**Backend**
- Laravel (latest)
- Laravel Sanctum (SPA authentication)
- Laravel Passport (OAuth2 for public/external APIs)
- MySQL / PostgreSQL
- Redis (cache & queues)
- WebSockets (Reverb / Pusher)

**Frontend**
- React (Vite)
- Axios
- Tailwind CSS

---

## ✨ Core Features

### 🔐 Authentication & Security
- SPA authentication using **Sanctum**
- OAuth2 authentication using **Passport**
- Role & permission based access control
- API rate limiting and request validation

### 📁 Project & Task Management
- Full CRUD for projects and tasks
- Policy‑based authorization
- Pagination, filtering, and search
- Soft deletes and activity tracking

### 💬 Real‑Time Communication
- One‑to‑one and group chat
- Online/offline user presence
- Typing indicators
- Real‑time notifications

### 🎙️ Voice Messaging
- Audio recording from frontend
- Secure upload and storage
- Playback inside chat

### ⚙️ Performance & Scalability
- Background jobs and queues
- Event‑driven architecture
- Caching for frequently accessed data
- Optimized API responses using Resources

### 🧱 Clean Architecture
- Modular folder structure
- Service & repository layers
- Thin controllers, reusable business logic

---

## 🏗️ Architecture Overview

```
React (SPA)
  │
  ├── Sanctum (Cookie Auth)
  │    └── /api/internal/*
  │
  └── Passport (OAuth2)
       └── /api/v1/public/*
```

- **Sanctum** handles internal SPA authentication
- **Passport** secures public and third‑party APIs using OAuth2

---

## 📦 Repository Structure

```
app/
 ├── Modules/
 ├── Services/
 ├── Repositories/
 ├── Events/
 ├── Jobs/
 ├── Policies/
 └── Notifications/
```

This structure ensures scalability, maintainability, and testability.

---

## 🧪 Testing (Optional / In Progress)
- Feature tests for APIs
- Authentication & authorization tests
- Queue and job testing

---

## 📌 Why Injaz?

> *Injaz* means **achievement** — this project represents my hands‑on experience building production‑ready systems using Laravel and React.

It is designed not as a demo, but as a **real‑world SaaS‑style application**.

---

## 🎤 Interview Summary (Short)

> “Injaz is my professional Laravel and React portfolio showcasing real‑time communication, OAuth authentication using Passport, SPA security with Sanctum, and clean, scalable architecture.”

---

## 📄 License
This project is for portfolio and learning purposes.
