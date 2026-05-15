# Smart Expense Tracker

A production-style MERN expense tracker with JWT authentication, modular Express APIs, MongoDB/Mongoose models, React/Vite frontend, Tailwind styling, Chart.js analytics, budget alerts, dynamic spending suggestions, and PDF monthly reports.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS, Context API, Axios, Chart.js, react-chartjs-2
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, PDFKit
- Auth: JWT in an HTTP-only cookie plus Authorization header fallback for the React client

## Project Structure

```text
expense-tracker/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       │   ├── charts/
│       │   ├── dashboard/
│       │   ├── expenses/
│       │   ├── income/
│       │   ├── layout/
│       │   └── ui/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       └── utils/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── reports/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/
└── package.json
```

## Environment Variables

Server: `server/.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/smart-expense-tracker
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
COOKIE_SECURE=false
```

Client: `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

For production, set a strong `JWT_SECRET`, set `COOKIE_SECURE=true` behind HTTPS, and point `CLIENT_URL`/`VITE_API_URL` to deployed URLs.

## MongoDB Setup

Install MongoDB locally or create a MongoDB Atlas cluster. For local development, start MongoDB and keep:

```env
MONGO_URI=mongodb://127.0.0.1:27017/smart-expense-tracker
```

For Atlas, replace `MONGO_URI` with the connection string from your Atlas dashboard.

## Installation

From the project root:

```bash
npm install
npm run install:all
```

Seed demo data:

```bash
npm run seed
```

Demo login:

```text
Email: demo@example.com
Password: password123
```

## Run The App

Run frontend and backend together:

```bash
npm run dev
```

Or run separately:

```bash
npm run server
npm run client
```

Frontend: `http://localhost:5173`

Backend health check: `http://localhost:5000/api/health`

## API Endpoints

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/auth/logout`

Expenses:

- `GET /api/expenses`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`

Income:

- `GET /api/income`
- `POST /api/income`
- `PUT /api/income/:id`
- `DELETE /api/income/:id`

Budget:

- `GET /api/budget`
- `POST /api/budget`

Analytics:

- `GET /api/analytics/monthly`
- `GET /api/analytics/categories`
- `GET /api/analytics/summary`

Reports:

- `GET /api/reports/monthly`

## Notes

- Private APIs are protected by `protect` middleware.
- Passwords are hashed with bcrypt before persistence.
- Monthly reports are generated server-side with PDFKit.
- Spending suggestions are generated dynamically from current and previous month transaction patterns.
