import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventDetailsPage from './pages/EventDetailsPage';
import MyEventsPage from './pages/MyEventsPage';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                <MyEventsPage />
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
