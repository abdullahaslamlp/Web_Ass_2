import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Placeholder views for subsequent parts
const HomePlaceholder = () => (
  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
    <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
      Welcome to EventHub
    </h1>
    <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 2rem' }}>
      Discover, explore, and register for premier concerts, sporting events, theatre, and arts.
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <a href="/events" className="btn btn-primary">
        Explore Events
      </a>
      <a href="/register" className="btn btn-outline">
        Create Account
      </a>
    </div>
  </div>
);

const EventsPlaceholder = () => (
  <div style={{ padding: '2rem 0' }}>
    <h2>Events Explorer</h2>
    <p style={{ color: 'var(--text-muted)' }}>Ticketmaster API integration initializing in next phase.</p>
  </div>
);

const MyEventsPlaceholder = () => (
  <div style={{ padding: '2rem 0' }}>
    <h2>My Registered Events</h2>
    <p style={{ color: 'var(--text-muted)' }}>Registration dashboard initializing in upcoming phase.</p>
  </div>
);

const NotFoundPlaceholder = () => (
  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>404 - Page Not Found</h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>The page you requested does not exist.</p>
    <a href="/" className="btn btn-primary">Back to Home</a>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePlaceholder />} />
          <Route path="/events" element={<EventsPlaceholder />} />
          <Route path="/events/:id" element={<EventsPlaceholder />} />
          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                <MyEventsPlaceholder />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPlaceholder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
