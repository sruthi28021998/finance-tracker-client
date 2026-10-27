# Finance Tracker (Client)

A responsive web app to track income and expenses, view spending charts and manage a budget over time.

**Live demo:** https://finance-tracker-client-sigma-one.vercel.app
**Backend repo:** https://github.com/sruthi28021998/finance-tracker-server

## Screenshots

| Login | Dashboard | Mobile |
|---|---|---|
- [Login page](./screenshots/login.png)
- [Dashboard](./screenshots/dashboard.png)
- [Mobile view](./screenshots/mobile.png)

## Features
- Secure registration and login with JWT
- Protected routes with automatic logout when the session expires
- Add and delete income and expense transactions
- Filter by type, category and date range
- Pie chart (spending by category) and bar chart (monthly income vs expenses)
- Income, expense and balance summary cards that update live
- Toast notifications, loading indicators and form validation
- Responsive layout for mobile, tablet and desktop

## Tech stack
React (Vite), Tailwind CSS, React Router, Context API, Axios, Recharts, react-hot-toast

## Getting started
```bash
git clone https://github.com/sruthi28021998/finance-tracker-client.git
cd finance-tracker-client
npm install
npm run dev
```
The app runs at http://localhost:5173. For local development it sends API requests to `/api`, which Vite proxies to http://localhost:5000, so start the backend first.

## Environment variables
Create a `.env` file for production builds:
```
VITE_API_URL=https://<your-render-app>.onrender.com/api
```

## Project structure
```
src/
├── api/          Axios instance with auth token
├── components/   Navbar, StatsCards, Charts, Filters, TransactionForm, TransactionList, ProtectedRoute
├── context/      AuthContext
├── pages/        AuthPage, Dashboard
└── utils/        Formatting helpers and categories
```

## Deployment
Deployed on Vercel. Set `VITE_API_URL` (type: Config) to the backend URL ending in `/api`, then redeploy. `vercel.json` rewrites all routes to `index.html` so page refreshes work.

## Note
The backend runs on a free Render instance, so the first request after a period of inactivity can take about a minute.