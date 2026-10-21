import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectCurrentUser, selectIsAuthenticated } from '../../features/auth/authSlice';
import { Calendar, User, LogOut, LogIn, UserPlus, Menu, X, Compass, Ticket } from 'lucide-react';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const registrations = useSelector((state) => state.registrations.registrations || []);

  const userRegistrationsCount = user
    ? registrations.filter((r) => r.userEmail === user.email).length
    : 0;

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <span>🎟️</span>
          <span>EventHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links nav-links-desktop">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Compass size={18} />
            Explore Events
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/my-events"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Ticket size={18} />
              My Events
              {userRegistrationsCount > 0 && (
                <span className="nav-badge">{userRegistrationsCount}</span>
              )}
            </NavLink>
          )}
        </nav>

        {/* Desktop Auth Controls */}
        <div className="nav-auth nav-links-desktop">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div className="user-trigger" title={user.email}>
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                title="Log out"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                <LogIn size={16} />
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            <Compass size={18} />
            Explore Events
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/my-events"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobile}
            >
              <Ticket size={18} />
              My Events ({userRegistrationsCount})
            </NavLink>
          )}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <span>{user.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({user.email})</span>
                </div>
                <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMobile}>
                  <LogIn size={16} /> Sign In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobile}>
                  <UserPlus size={16} /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
