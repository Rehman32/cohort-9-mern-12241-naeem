# 📝 Notes App — Full-Stack Web Application

A full-stack Notes Management application that enables users to securely create, edit, and delete rich-text notes. The project is built using **Node.js**, **React.js**, and **MySQL**, and integrates professional-grade features including application logging, exception handling, unit testing, and static code analysis.

---

## 📑 Table of Contents

- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Application Screens](#application-screens)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [SonarQube Integration](#sonarqube-integration)
- [Git Version Control](#git-version-control)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

---

## Technology Stack

| Category            | Technology / Tool                                    |
| ------------------- | ---------------------------------------------------- |
| **Runtime**         | Node.js                                              |
| **Frontend**        | React.js 19 (scaffolded with Vite)                   |
| **Backend**         | Express.js 5                                         |
| **Database**        | MySQL (via Sequelize ORM v6)                         |
| **Authentication**  | JSON Web Tokens (jsonwebtoken), bcryptjs              |
| **Logging**         | Pino Logger, pino-http (request/response logging)    |
| **Backend Testing** | Mocha, Chai, Sinon                                   |
| **Frontend Testing**| Jest, React Testing Library                          |
| **Code Quality**    | SonarQube                                            |
| **Version Control** | Git & GitHub                                         |
| **Dev Tools**       | Nodemon, ESLint, Prettier                            |

---

## Features

### Core Features

| Feature                          | Description                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| **User Authentication**          | Users can sign up, log in, and log out. Passwords are hashed with bcrypt. Sessions use JWT.  |
| **Note CRUD Operations**         | Users can create, read, update, and delete their personal notes.                            |
| **Rich Text Editor**             | Notes support rich text formatting (headings, bold, italic, lists, code blocks) via React Quill. |
| **User-Specific Data Isolation** | Each user can only access and manage their own notes (enforced via JWT middleware).          |
| **Search & Filter**              | Real-time client-side search across note titles and content. Sort by newest, oldest, or title. |
| **User Profile**                 | Dedicated profile page displaying user details with logout functionality.                   |

### Technical Features

| Feature                        | Description                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| **Pino Logger Integration**    | Structured JSON logging for all HTTP requests/responses, application events, and errors.  |
| **Global Exception Handling**  | Centralized Express error-handling middleware. All unhandled errors are caught, logged via Pino, and returned as structured JSON responses. |
| **Unit Testing (Backend)**     | Mocha/Chai/Sinon test suites covering authentication and notes controller logic (9 tests). |
| **Unit Testing (Frontend)**    | Jest + React Testing Library test suites covering Login, Signup, and NoteCard components (8 tests). |
| **SonarQube Configuration**    | Pre-configured `sonar-project.properties` for static code analysis and quality gate enforcement. |
| **Git Version Control**        | Branching strategy used (`naeem-branch` → `main`) with meaningful commit messages per sprint. |

---

## Project Structure

```
Notes App/
│
├── client/                          # ──── FRONTEND (React.js + Vite) ────
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js             # Axios instance with JWT interceptor
│   │   ├── assets/                  # Images and SVGs
│   │   ├── components/
│   │   │   ├── Login.jsx            # Login form component
│   │   │   ├── Login.test.jsx       # Jest tests for Login
│   │   │   ├── Signup.jsx           # Signup form component
│   │   │   ├── Signup.test.jsx      # Jest tests for Signup
│   │   │   ├── Navbar.jsx           # Navigation bar with profile & logout
│   │   │   ├── Navbar.css
│   │   │   ├── NoteCard.jsx         # Individual note card for dashboard
│   │   │   ├── NoteCard.test.jsx    # Jest tests for NoteCard
│   │   │   └── NoteCard.css
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state (login, signup, logout)
│   │   │   └── NotesContext.jsx     # Notes CRUD state management
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Main notes listing page with search & filter
│   │   │   ├── Dashboard.css
│   │   │   ├── NoteEditor.jsx       # Rich text note editor (create/edit)
│   │   │   ├── NoteEditor.css
│   │   │   ├── Profile.jsx          # User profile page
│   │   │   └── Profile.css
│   │   ├── App.jsx                  # Root component with React Router
│   │   ├── App.css                  # Auth page styles
│   │   ├── index.css                # Global styles (dark theme, fonts)
│   │   └── main.jsx                 # Entry point with all providers
│   ├── babel.config.cjs             # Babel config for Jest
│   ├── jest.config.cjs              # Jest configuration
│   ├── jest.setup.js                # Jest polyfills (TextEncoder)
│   ├── vite.config.js               # Vite build configuration
│   └── package.json
│
├── server/                          # ──── BACKEND (Node.js + Express) ────
│   ├── src/
│   │   ├── config/
│   │   │   ├── logger.js            # Pino Logger configuration
│   │   │   └── db.js                # MySQL/Sequelize database connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Signup & Login logic with JWT generation
│   │   │   └── noteController.js    # Notes CRUD logic (get, create, update, delete)
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js    # JWT verification middleware (protects routes)
│   │   │   └── errorHandler.js      # Global exception handling middleware
│   │   ├── models/
│   │   │   ├── User.js              # User Sequelize model (bcrypt hooks)
│   │   │   ├── Note.js              # Note Sequelize model
│   │   │   └── index.js             # Model associations (User hasMany Notes)
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # POST /api/auth/signup, /api/auth/login
│   │   │   └── noteRoutes.js        # CRUD /api/notes (all protected)
│   │   ├── tests/
│   │   │   ├── auth.test.js         # Mocha/Chai tests for auth controller
│   │   │   └── note.test.js         # Mocha/Chai tests for note controller
│   │   ├── app.js                   # Express app setup (middlewares, routes)
│   │   └── server.js                # Server entry point (DB connect + listen)
│   ├── .env                         # Environment variables (not committed)
│   └── package.json
│
├── sonar-project.properties         # SonarQube analysis configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## Application Screens

### Screen 1: Sign Up / Log In

| Component       | Details                                           |
| --------------- | ------------------------------------------------- |
| Sign-up form    | Fields: Username, Email, Password                 |
| Log-in form     | Fields: Email, Password                           |
| Operations      | User registration, authentication, JWT issuance   |
| Post-login      | Redirects to Dashboard on success                 |
| Error handling  | Inline error messages for invalid credentials     |

### Screen 2: Dashboard (List of Notes)

| Component              | Details                                          |
| ---------------------- | ------------------------------------------------ |
| Notes list             | Grid of user-specific note cards                 |
| Search bar             | Real-time search across note titles and content  |
| Sort dropdown          | Sort by Newest, Oldest, or Title A–Z             |
| "New Note" button      | Navigates to the Note Editor                     |
| Empty state            | Friendly message when no notes exist             |
| Operations             | Fetch, display, delete notes                     |

### Screen 3: Note Editor

| Component            | Details                                            |
| -------------------- | -------------------------------------------------- |
| Title input          | Plain text input for the note title                |
| Rich text editor     | React Quill with toolbar (headings, bold, italic, lists, code blocks, links) |
| Save / Cancel buttons| Save persists to backend; Cancel returns to Dashboard |
| Operations           | Create new note or edit existing note              |

### Screen 4: User Profile

| Component       | Details                                             |
| --------------- | --------------------------------------------------- |
| User avatar     | Displays first letter of username                   |
| User details    | Username, Email, User ID                            |
| Logout button   | Clears session and redirects to Login               |
| Back button     | Returns to Dashboard                                |

---

## Database Schema

### Users Table

| Column     | Type         | Constraints                    |
| ---------- | ------------ | ------------------------------ |
| id         | UUID (PK)    | Auto-generated (UUIDv4)        |
| username   | VARCHAR(255) | NOT NULL, UNIQUE               |
| email      | VARCHAR(255) | NOT NULL, UNIQUE, Valid email   |
| password   | VARCHAR(255) | NOT NULL (bcrypt hashed)       |
| createdAt  | DATETIME     | Auto-managed by Sequelize      |
| updatedAt  | DATETIME     | Auto-managed by Sequelize      |

### Notes Table

| Column     | Type         | Constraints                    |
| ---------- | ------------ | ------------------------------ |
| id         | UUID (PK)    | Auto-generated (UUIDv4)        |
| title      | VARCHAR(255) | NOT NULL                       |
| content    | TEXT         | Nullable (stores HTML)         |
| userId     | UUID (FK)    | References Users.id, ON DELETE CASCADE |
| createdAt  | DATETIME     | Auto-managed by Sequelize      |
| updatedAt  | DATETIME     | Auto-managed by Sequelize      |

### Relationship

```
User (1) ──────< (Many) Note
  └── One user can have many notes
  └── Deleting a user cascades to delete all their notes
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint  | Auth | Request Body                                  | Success Response                                 |
| ------ | --------- | ---- | --------------------------------------------- | ------------------------------------------------ |
| POST   | `/signup` | No   | `{ username, email, password }`               | `201` — `{ success, user: { id, username, email }, token }` |
| POST   | `/login`  | No   | `{ email, password }`                         | `200` — `{ success, user: { id, username, email }, token }` |

### Notes Routes (`/api/notes`) — All Protected (Bearer Token Required)

| Method | Endpoint  | Auth   | Request Body           | Success Response                          |
| ------ | --------- | ------ | ---------------------- | ----------------------------------------- |
| GET    | `/`       | Bearer | —                      | `200` — `{ success, notes: [...] }`       |
| POST   | `/`       | Bearer | `{ title, content }`   | `201` — `{ success, note: {...} }`        |
| GET    | `/:id`    | Bearer | —                      | `200` — `{ success, note: {...} }`        |
| PUT    | `/:id`    | Bearer | `{ title, content }`   | `200` — `{ success, note: {...} }`        |
| DELETE | `/:id`    | Bearer | —                      | `200` — `{ success, message }`            |

### Error Responses

All errors follow a consistent structure:
```json
{
  "success": false,
  "message": "Error description",
  "stack": "... (only in development mode)"
}
```

---

## Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- **Node.js** — v18.0 or higher ([Download](https://nodejs.org/))
- **MySQL Server** — v8.0 or higher ([Download](https://dev.mysql.com/downloads/))
- **Git** — ([Download](https://git-scm.com/))
- **MySQL Workbench** (optional) — For visual database management

### 1. Clone the Repository

```bash
git clone https://github.com/Rehman32/cohort-9-mern-12241-naeem.git
cd "Notes App"
```

### 2. Create the MySQL Database

Open MySQL Workbench or the MySQL CLI and run:

```sql
CREATE DATABASE notes_app;
```

### 3. Configure Environment Variables

Navigate to the `server/` directory and create/edit the `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=notes_app
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

> ⚠️ **Important:** Replace `your_mysql_password` with your actual MySQL root password and `your_jwt_secret_key` with a strong secret string.

### 4. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend (open a new terminal):**
```bash
cd client
npm install
```

---

## Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The backend API starts at: **`http://localhost:5000`**

You should see Pino log output confirming:
```
MySQL Database connected successfully.
Database models synced successfully.
Server running on port 5000
```

### Start the Frontend Dev Server

```bash
cd client
npm run dev
```

The React app starts at: **`http://localhost:5173`**

### Usage Flow

1. Open `http://localhost:5173` in your browser.
2. **Sign Up** with a username, email, and password.
3. You will be redirected to the **Dashboard**.
4. Click **"+ New Note"** to create a note using the rich text editor.
5. Edit or delete notes from the Dashboard.
6. Use the **search bar** to find notes by title or content.
7. Click your **username** in the navbar to view your profile.
8. Click **Logout** to end your session.

---

## Running Tests

### Backend Tests (Mocha/Chai/Sinon)

```bash
cd server
npm test
```

**Expected output:**
```
Auth Controller
  Signup
    ✓ should create a new user and return a token
    ✓ should throw an error if user already exists
  Login
    ✓ should login an existing user and return a token
    ✓ should throw an error for invalid credentials

Note Controller
  createNote
    ✓ should create a note for the authenticated user
    ✓ should throw an error if title is missing
  getNotes
    ✓ should get all notes for the authenticated user
  deleteNote
    ✓ should delete an existing note
    ✓ should return 404 if note not found

9 passing
```

### Frontend Tests (Jest/React Testing Library)

```bash
cd client
npm test
```

**Expected output:**
```
PASS src/components/NoteCard.test.jsx
PASS src/components/Login.test.jsx
PASS src/components/Signup.test.jsx

Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
```

### Test Coverage Summary

| Layer    | Framework        | Test File          | Tests | Status |
| -------- | ---------------- | ------------------ | ----- | ------ |
| Backend  | Mocha/Chai/Sinon | `auth.test.js`     | 4     | ✅ Pass |
| Backend  | Mocha/Chai/Sinon | `note.test.js`     | 5     | ✅ Pass |
| Frontend | Jest/RTL         | `Login.test.jsx`   | 2     | ✅ Pass |
| Frontend | Jest/RTL         | `Signup.test.jsx`  | 2     | ✅ Pass |
| Frontend | Jest/RTL         | `NoteCard.test.jsx`| 4     | ✅ Pass |
| **Total**|                  |                    | **17**| ✅ **All Passing** |

---

## SonarQube Integration

A `sonar-project.properties` file is pre-configured at the project root:

```properties
sonar.projectKey=notes-app
sonar.projectName=Notes App
sonar.sources=server,client/src
sonar.tests=server,client/src
sonar.test.inclusions=**/*.test.js,**/*.spec.js
sonar.exclusions=**/node_modules/**,**/dist/**,**/build/**
```

### Running SonarQube Analysis

1. Install and start [SonarQube](https://www.sonarqube.org/downloads/) locally (or use SonarCloud).
2. Install the SonarQube Scanner CLI.
3. Run from the project root:
   ```bash
   sonar-scanner
   ```
4. View results at `http://localhost:9000`.

---

## Git Version Control

This project follows a branching strategy:

- **`main`** — Production-ready code (final submission).
- **`naeem-branch`** — Development branch where all feature work was committed.

### Commit History (Sprint-based)

| Sprint | Commit Message                                                     |
| ------ | ------------------------------------------------------------------ |
| 1      | `chore: initialize full-stack monorepo structure`                  |
| 2      | `feat: setup backend foundation and database integration`          |
| 3      | `feat: implement user authentication and authorization`            |
| 4      | `feat: implement secure notes CRUD operations`                     |
| 5      | `feat: setup frontend routing and authentication UI`               |
| 6      | `feat: implement dashboard and rich text note editor`              |
| 7      | `feat: add user profile, search/filter, and project README`        |

---

## Environment Variables

| Variable       | Description                        | Default              |
| -------------- | ---------------------------------- | -------------------- |
| `PORT`         | Backend server port                | `5000`               |
| `DB_HOST`      | MySQL host                         | `localhost`          |
| `DB_PORT`      | MySQL port                         | `3306`               |
| `DB_USER`      | MySQL username                     | `root`               |
| `DB_PASSWORD`  | MySQL password                     | —                    |
| `DB_NAME`      | MySQL database name                | `notes_app`          |
| `JWT_SECRET`   | Secret key for JWT signing         | —                    |
| `NODE_ENV`     | Environment mode                   | `development`        |

---

## Dependencies

### Backend (`server/package.json`)

| Package        | Purpose                                      |
| -------------- | -------------------------------------------- |
| express        | Web framework for REST API                   |
| sequelize      | ORM for MySQL database operations            |
| mysql2         | MySQL driver for Node.js                     |
| jsonwebtoken   | JWT token generation and verification        |
| bcryptjs       | Password hashing                             |
| pino           | Fast JSON logger                             |
| pino-http      | HTTP request/response logging middleware     |
| cors           | Cross-Origin Resource Sharing                |
| dotenv         | Environment variable management              |
| mocha          | Test framework (dev)                         |
| chai           | Assertion library (dev)                      |
| sinon          | Test mocking/stubbing library (dev)          |
| nodemon        | Auto-restart server on file changes (dev)    |
| eslint         | Code linting (dev)                           |
| prettier       | Code formatting (dev)                        |

### Frontend (`client/package.json`)

| Package             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| react               | UI library                               |
| react-dom           | React DOM rendering                      |
| react-router-dom    | Client-side routing                      |
| axios               | HTTP client for API calls                |
| react-quill-new     | Rich text editor component               |
| jest                 | Testing framework (dev)                  |
| @testing-library/*  | React component testing utilities (dev)  |
| vite                 | Build tool and dev server (dev)          |
| babel-jest           | Jest transformer for JSX (dev)           |

---

## Author

**Naeem** — Cohort 9 MERN Stack  
GitHub: [Rehman32](https://github.com/Rehman32)

---

## License

ISC
