import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '5rem 1.5rem',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Compass size={36} />
      </div>

      <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          Back to Home
        </Link>
        <Link to="/events" className="btn btn-outline">
          <Compass size={16} />
          Explore Events
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
