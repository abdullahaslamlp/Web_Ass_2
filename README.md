# 🎟️ EventHub - Event Management System

**Course:** Web Programming — Assignment 2  
**Instructor:** Mahhek Tahir  
**GitHub Repository:** [https://github.com/abdullahaslamlp/Web_Ass_2](https://github.com/abdullahaslamlp/Web_Ass_2)  

A comprehensive, production-ready Event Management System built with **React.js**, **Redux Toolkit**, **React Router v6**, and the **Ticketmaster Discovery API v2**.

---

## 📌 Project Objective
Develop a React application that enables users to:
1. **Explore Events:** Browse upcoming live events across diverse classifications (Music, Sports, Arts & Theatre, Film, Miscellaneous) using the Ticketmaster Discovery API.
2. **Search & Filter:** Perform live keyword queries, filter by category segments, sort chronologically or alphabetically, and paginate through results.
3. **Inspect Event Details:** Review high-resolution visual media, venue information (address, city, postal code), dates, times, price ranges, and ticketing status.
4. **Register for Events:** Authenticated users can register for events with immediate UI confirmation, duplicate registration prevention, and cancellation capabilities.
5. **My Events Dashboard:** Manage registrations partitioned into **Upcoming Events** ($\ge$ today) and **Past / Completed Events** ($<$ today) with an accessible cancellation modal.
6. **Frontend Authentication Simulation:** User registration, login, session state, and persistence powered by Redux Toolkit and `localStorage`.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Functional UI components, Hooks (`useEffect`, `useState`, `useMemo`, `useParams`, `useLocation`) |
| **Redux Toolkit (`@reduxjs/toolkit`)** | Predictable state container (`configureStore`, `createSlice`, `createAsyncThunk`) |
| **React Redux (`react-redux`)** | Redux hooks integration (`useSelector`, `useDispatch`, `Provider`) |
| **React Router v6 (`react-router-dom`)** | Declarative client-side routing, protected routes (`Navigate`, `NavLink`, `useNavigate`) |
| **Ticketmaster Discovery API v2** | Dynamic events exploration, search, venues, classifications, and details |
| **Lucide React (`lucide-react`)** | Modern, responsive SVG icons |
| **Vite** | Next-generation fast frontend tooling and production bundler |

---

## 🏗️ Architecture & Redux Store Design

The application utilizes a modular, feature-oriented structure:

```text
src/
├── app/
│   └── store.js                      # Central Redux store configuration
├── components/
│   ├── common/
│   │   ├── Navbar.jsx                # Responsive header with session state & mobile drawer
│   │   ├── Footer.jsx                # Footer with API attributions & quick links
│   │   ├── ProtectedRoute.jsx        # Route guard redirecting guests to /login
│   │   ├── LoadingSkeleton.jsx       # Shimmer loading cards
│   │   └── Modal.jsx                 # Confirmation modal for registration cancellation
│   └── events/
│       ├── EventCard.jsx             # Reusable card with images, tags, price & registration pill
│       ├── EventFilters.jsx          # Live search, category pills, and sort controls
│       └── Pagination.jsx            # Dynamic pagination with page bounds
├── features/
│   ├── auth/
│   │   └── authSlice.js              # Registration, login, logout, & localStorage persistence
│   ├── events/
│   │   └── eventsSlice.js            # Async thunks (fetchEvents, fetchEventById), filters & pagination
│   └── registrations/
│       └── registrationsSlice.js     # User-event registrations, duplicate check, & cancellation
├── pages/
│   ├── HomePage.jsx                  # Hero showcase, category shortcuts, featured highlights
│   ├── EventsPage.jsx                # Event directory with real-time filters & pagination
│   ├── EventDetailsPage.jsx          # Comprehensive event overview & registration action
│   ├── LoginPage.jsx                 # Simulated login form with 1-click Demo auto-fill
│   ├── RegisterPage.jsx              # User registration with email/password validation
│   ├── MyEventsPage.jsx              # Dashboard: Upcoming vs Completed events with metrics
│   └── NotFoundPage.jsx              # Accessible 404 page with navigation redirects
├── services/
│   ├── ticketmasterApi.js            # Ticketmaster Discovery API client with error & rate-limit handling
│   └── mockData.js                   # Realistic fallback dataset for resilient offline execution
├── styles/
│   └── index.css                     # Complete design system, animations, & responsive rules
├── App.jsx                           # Route declarations & main application layout
└── main.jsx                          # Redux Provider, BrowserRouter, and DOM mount
```

---

## 🗄️ Redux Toolkit Slices

### 1. `authSlice` (`src/features/auth/authSlice.js`)
- **State:** `user`, `isAuthenticated`, `loading`, `error`
- **Actions:** `loginUser`, `registerUser`, `logout`, `clearAuthError`
- **Persistence:** Synchronizes current user session with `eventhub_current_user` and user registry with `eventhub_users` in `localStorage`.
- **Pre-seeded Demo:** Includes a default account (`demo@eventhub.com` / `password123`) with a one-click auto-fill button on the login screen.

### 2. `eventsSlice` (`src/features/events/eventsSlice.js`)
- **State:** `events`, `featuredEvents`, `selectedEvent`, `loading`, `detailsLoading`, `error`, `dataSource`, `filters`
- **Thunks:**
  - `fetchEvents(params)`: Queries `/events.json` with keyword, category, sort, and pagination.
  - `fetchFeaturedEvents()`: Queries high-priority events for the homepage hero carousel.
  - `fetchEventById(id)`: Queries `/events/{id}.json` for full venue, pricing, and event data.
- **Resilience:** If the API key is absent, invalid, or reaches Ticketmaster's 2 req/sec or 5,000 req/day quota (HTTP 429), it automatically provides a seamless fallback with a status notice.

### 3. `registrationsSlice` (`src/features/registrations/registrationsSlice.js`)
- **State:** `registrations` (array of registration items associated with `userEmail`), `lastFeedback`
- **Actions:**
  - `registerForEvent({ user, event })`: Verifies that the user is authenticated and prevents duplicate registration for the same event ID.
  - `cancelRegistration({ userEmail, eventId })`: Removes the registered event.
  - `clearRegistrationFeedback()`: Clears temporary alert notifications.
- **Persistence:** Stored in `localStorage` (`eventhub_registrations`) so registrations remain intact across page reloads.

---

## 🗺️ React Router Navigation Map

| Path | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Public | Hero showcase, category filters, and featured events |
| `/events` | `EventsPage` | Public | Live event explorer with keyword search, category pills, sort & pagination |
| `/events/:id` | `EventDetailsPage` | Public | Deep dive with venue details, pricing, and one-click registration |
| `/login` | `LoginPage` | Public | User authentication with demo account quick-fill |
| `/register` | `RegisterPage` | Public | Account creation with form validation |
| `/my-events` | `MyEventsPage` | **Protected** | Personal registered events separated into Upcoming vs Completed |
| `*` | `NotFoundPage` | Public | Friendly 404 page with redirect actions |

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/abdullahaslamlp/Web_Ass_2.git
cd Web_Ass_2
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and add your Ticketmaster Consumer API Key:
```env
VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
```
> *Note: If no API key is provided, the application automatically runs in Interactive Simulation Mode using the curated dataset in `mockData.js`, so you can immediately explore, test, and grade every single feature without any setup barriers!*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📜 Meaningful Development History (Git Workflow)

As required by Assignment Section 9, development was executed and committed progressively in distinct phases:

1. `3b28bdf` — **Initial Setup:** Initial React project setup with Vite, Redux Toolkit, and React Router dependencies
2. `2090780` — **Phase 1:** `feat: implement Redux authentication slice, layout, and auth pages`
3. `e42e149` — **Phase 2:** `feat: add Ticketmaster Discovery API integration and events Redux slice`
4. `a3b8d58` — **Phase 3:** `feat: build responsive event exploration and multi-criteria filter UI`
5. `a09370e` — **Phase 4:** `feat: implement event details view and event registration system`
6. `f7d3497` — **Phase 5:** `feat: create My Events dashboard with upcoming and past event management`
7. `Phase 6` — **Final Polish:** `docs: add NotFound page, update README and finalize submission verification`

---

## 👨‍💻 Author
- **Developer:** Abdullah Aslam
- **Repository:** [https://github.com/abdullahaslamlp/Web_Ass_2](https://github.com/abdullahaslamlp/Web_Ass_2)
