# Form Builder App

A full-stack application that allows users to create forms, submit responses, and view collected answers.

## 🛠 Tech Stack

- Frontend: React, TypeScript, RTK Query, React Router
- Backend: Node.js, Express, GraphQL
- Data storage: In-memory

## 📦 Project Structure

client/ - React frontend  
server/ - GraphQL backend

## ⚙️ Setup & Run

### 1. Clone repository

```Bash
git clone https://github.com/wade1412/form-builder-app.git
cd form-builder-app
```

### 2. Install dependencies

```Bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Run the application

Start both frontend and backend with a single command:

```Bash
npm run dev
```

Frontend: http://localhost:5173
Backend (GraphQL): http://localhost:4000/graphql

## 🚀 Features

- Create dynamic forms with different question types
- Add/remove questions and options
- Submit responses
- View all responses per form

## 🔄 How It Works

Create a form
Open the form via URL
Submit responses
View collected responses

## ⚠️ Notes

- Data is stored in memory (no persistence after server restart)
- Basic validation is implemented
