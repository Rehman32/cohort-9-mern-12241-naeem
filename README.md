# Notes App

A full-stack web application that allows users to create, edit, and delete notes with a rich text editor. Built with Node.js, React.js, and MySQL.

## Technology Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React.js (Vite), React Router       |
| Backend    | Node.js, Express.js                 |
| Database   | MySQL (Sequelize ORM)               |
| Auth       | JWT (jsonwebtoken), bcryptjs        |
| Logging    | Pino Logger, pino-http              |
| Testing    | Mocha/Chai/Sinon (Backend), Jest/RTL (Frontend) |
| Code Quality | SonarQube                         |

## Features

- **User Authentication** — Sign up, log in, log out with JWT tokens.
- **Note Management** — Create, read, update, and delete personal notes.
- **Rich Text Editor** — Format notes with headings, bold, italic, lists, code blocks, and more (React Quill).
- **Search & Filter** — Search notes by title or content, sort by date or title.
- **User Profile** — View account details and manage session.
- **Application Logging** — Pino Logger for requests, errors, and user activity.
- **Global Error Handling** — Centralized middleware catches and logs all errors.
- **Unit Testing** — Backend (Mocha/Chai) and Frontend (Jest/RTL) test suites.

## Project Structure

```
Notes App/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios instance with interceptors
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # AuthContext, NotesContext
│   │   ├── pages/          # Dashboard, NoteEditor, Profile
│   │   ├── App.jsx         # Root component with routing
│   │   └── main.jsx        # Entry point with providers
│   ├── jest.config.cjs
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Logger, Database config
│   │   ├── controllers/    # Auth, Note controllers
│   │   ├── middlewares/     # Auth, Error handling middleware
│   │   ├── models/         # Sequelize models (User, Note)
│   │   ├── routes/         # Express routes
│   │   ├── tests/          # Mocha/Chai unit tests
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── .env
│   └── package.json
├── sonar-project.properties
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Rehman32/cohort-9-mern-12241-naeem.git
cd "Notes App"
```

### 2. Setup MySQL Database

```sql
CREATE DATABASE notes_app;
```

### 3. Configure Environment Variables

Edit `server/.env` with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notes_app
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 4. Install Dependencies & Run

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend (in a new terminal):**
```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend API on `http://localhost:5000`.

## Running Tests

**Backend tests (Mocha/Chai):**
```bash
cd server
npm test
```

**Frontend tests (Jest):**
```bash
cd client
npm test
```

## API Endpoints

### Auth
| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/api/auth/signup` | Register a user   |
| POST   | `/api/auth/login`  | Login a user      |

### Notes (Protected)
| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | `/api/notes`       | Get all user notes     |
| POST   | `/api/notes`       | Create a new note      |
| GET    | `/api/notes/:id`   | Get a single note      |
| PUT    | `/api/notes/:id`   | Update a note          |
| DELETE | `/api/notes/:id`   | Delete a note          |

## License

ISC
