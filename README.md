# Task Manager API - Assignment

## 📌 Overview
This project is a Task Manager API built using Node.js and Express.  
The goal of this assignment is to test, debug, and understand an existing API.

---

## 🚀 Features
- Create a task
- Get all tasks
- Update a task
- Delete a task
- Mark task as completed

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| POST   | /tasks | Create task |
| GET    | /tasks | Get all tasks |
| PATCH  | /tasks/:id/complete | Mark task as completed |
| PUT    | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## 🧪 Testing
Testing is done using:
- Jest
- Supertest

### Covered Test Cases:
- Create task (valid input)
- Validation (missing/empty title)
- Get all tasks
- Handle unexpected fields
- Mark task as completed
- Update task
- Delete task

---

## 🐛 Bugs / Observations
- Status uses `"done"` instead of `"completed"`
- Extra fields are accepted without validation
- Limited validation in update API

---

## ▶️ How to Run

### Install dependencies
```
npm install
```

### Run server
```
npm start
```

### Run tests
```
npm test
```

---

## 📂 Tech Stack
- Node.js
- Express.js
- Jest
- Supertest

---

## 👤 Author
Aymaan Sayyed