# EventHub - Event Management System

A modern React-based Event Management System developed with **React.js**, **Redux Toolkit**, **React Router**, and the **Ticketmaster Discovery API**.

## Project Objective
Allow users to:
1. Explore upcoming events across various classifications (Music, Sports, Arts & Theatre, Film, etc.).
2. Search, filter, and inspect detailed event pages with real-time venue, date/time, and pricing data.
3. Authenticate securely (registration, login, logout) with session state persisted in Local Storage.
4. Register for events, manage registrations, prevent duplicates, and review past vs upcoming events on a personalized dashboard.

## Tech Stack
- **Frontend Library:** React 18
- **State Management:** Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)
- **Client-Side Routing:** React Router v6 (`react-router-dom`)
- **External API:** Ticketmaster Discovery API v2
- **Build Tool:** Vite

## Project Architecture
```text
src/
├── app/                  # Redux store configuration
├── components/           # Reusable UI components (Navbar, Footer, ProtectedRoute, EventCard)
├── features/
│   ├── auth/             # Authentication slice & auth components
│   ├── events/           # Events slice & API integrations
│   └── registrations/    # Event registrations slice
├── pages/                # Page route views (Home, Events, Details, Login, Register, MyEvents)
├── services/             # Ticketmaster API client & mock fallbacks
└── styles/               # Styling and global CSS variables
```

## Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd event-management-system
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```
Add your Ticketmaster API key:
```env
VITE_TICKETMASTER_API_KEY=YOUR_API_KEY
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.
