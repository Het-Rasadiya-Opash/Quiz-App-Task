# Quiz App

A full-stack quiz application built with React, Node.js, Express, and MongoDB. Supports role-based access for admins and users, timed quizzes, server-side scoring, and a leaderboard.

---

## Tech Stack

**Frontend**
- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser

---

## Project Structure

```
Quiz-App-Task/
├── Backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers
│   ├── middlewares/    # Auth & role middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   └── app.js          # Entry point
└── Frontend/
    └── src/
        ├── components/ # Reusable UI components
        ├── features/   # Redux slices
        ├── pages/      # Page components
        └── utils/      # Axios instance
```

---

## Features

### Authentication
- Register and login with email and password
- Passwords hashed with bcryptjs
- JWT stored in `httpOnly` cookie
- Auth state persisted on page refresh via `GET /api/user`
- Protected routes redirect unauthenticated users to `/login`
- Public routes redirect authenticated users to `/`

### Roles
| Role  | Permissions |
|-------|-------------|
| admin | Create, edit, delete quizzes and questions |
| user  | View quizzes, attempt quizzes, view leaderboard |

### Quiz Management (Admin)
- Create a quiz with a title and optional time limit (seconds)
- Edit or delete existing quizzes
- Add questions with 4 options and a correct answer index

### Taking a Quiz (User)
- Browse all available quizzes on the home page
- Click **Start Quiz** to begin — creates an attempt on the server
- Questions are returned **without** the correct answer
- Select one option per question
- Countdown timer shown if the quiz has a time limit
- Timer turns red and pulses when ≤ 10 seconds remaining
- Quiz **auto-submits** when the timer reaches zero
- Scoring is done **server-side** — the frontend never sees correct answers

### Leaderboard
- Shown immediately after submitting
- Top 10 attempts ranked by score (descending)
- Tie-broken by time taken (ascending)

---

## API Endpoints

### User
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/user/register` | Public | Register |
| POST | `/api/user/login` | Public | Login |
| POST | `/api/user/logout` | Public | Logout |
| GET | `/api/user` | Auth | Get current user |

### Quiz
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/quiz` | Public | Get all quizzes |
| GET | `/api/quiz/:quizId` | Public | Get quiz by ID |
| POST | `/api/quiz/create` | Admin | Create quiz |
| POST | `/api/quiz/edit/:quizId` | Admin | Edit quiz |
| DELETE | `/api/quiz/delete/:quizId` | Admin | Delete quiz |
| POST | `/api/quiz/:quizId/start` | Auth | Start attempt |
| GET | `/api/quiz/:quizId/leaderboard` | Auth | Get leaderboard |

### Question
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/question/:quizId` | Public | Get questions by quiz |
| POST | `/api/question/create/:quizId` | Admin | Create question |
| PUT | `/api/question/edit/:questionId` | Admin | Edit question |
| DELETE | `/api/question/delete/:questionId` | Admin | Delete question |

### Attempt
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/attempts/:attemptId/submit` | Auth | Submit attempt |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_ENDPOINT=http://localhost:3000/api
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `PORT` | Backend | Server port |
| `MONGO_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret key for JWT signing |
| `VITE_API_ENDPOINT` | Frontend | Backend API base URL |
