import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div>
            <div className="navbar-brand" style={{ marginBottom: '0.75rem' }}>
              <span>🎟️</span>
              <span>EventHub</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '380px', lineHeight: 1.6 }}>
              A modern event discovery and registration platform powered by React, Redux Toolkit,
              and the Ticketmaster Discovery API.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <Link to="/" style={{ transition: 'color 0.2s' }}>Home</Link>
              <Link to="/events" style={{ transition: 'color 0.2s' }}>Explore Events</Link>
              <Link to="/my-events" style={{ transition: 'color 0.2s' }}>My Registered Events</Link>
              <Link to="/login" style={{ transition: 'color 0.2s' }}>Login / Register</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              API & Resources
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <a
                href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Ticketmaster Discovery API <ExternalLink size={14} />
              </a>
              <a
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Redux Toolkit Docs <ExternalLink size={14} />
              </a>
              <a
                href="https://reactrouter.com/"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                React Router v6 <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} EventHub. Web Programming Assignment 2 — Instructor: Mahhek Tahir.
          </div>
          <div>
            Data dynamically fetched from Ticketmaster Discovery API v2.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
