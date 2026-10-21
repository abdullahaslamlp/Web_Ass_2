import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeaturedEvents,
  selectFeaturedEvents,
  setClassification,
  setKeyword,
  fetchEvents,
} from '../features/events/eventsSlice';
import EventCard from '../components/events/EventCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import {
  Compass,
  Search,
  Sparkles,
  ShieldCheck,
  CalendarCheck2,
  TrendingUp,
  ArrowRight,
  Music,
  Trophy,
  Theater,
  Film,
} from 'lucide-react';

const CATEGORY_SHORTCUTS = [
  { name: 'Music', icon: Music, color: '#818cf8' },
  { name: 'Sports', icon: Trophy, color: '#34d399' },
  { name: 'Arts & Theatre', icon: Theater, color: '#fbbf24' },
  { name: 'Film', icon: Film, color: '#f87171' },
];

export const HomePage = () => {
  const [heroSearch, setHeroSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const featuredEvents = useSelector(selectFeaturedEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFeaturedEvents())
      .unwrap()
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      dispatch(setKeyword(heroSearch.trim()));
      dispatch(fetchEvents({ keyword: heroSearch.trim(), page: 0 }));
      navigate('/events');
    } else {
      navigate('/events');
    }
  };

  const handleCategoryClick = (categoryName) => {
    dispatch(setClassification(categoryName));
    dispatch(fetchEvents({ classificationName: categoryName, page: 0 }));
    navigate('/events');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={14} style={{ color: '#fbbf24' }} />
            Powered by Ticketmaster Discovery API
          </div>

          <h1 className="hero-title">
            Discover Unforgettable Live Experiences
          </h1>
          <p className="hero-subtitle">
            Explore world-class concerts, high-stakes sports showdowns, Broadway theatre,
            and exclusive film premieres — all in one unified platform.
          </p>

          {/* Quick Search */}
          <form onSubmit={handleHeroSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: '520px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search artists, venues, sports teams..."
                className="form-input"
                style={{ paddingLeft: '2.75rem', height: '48px', fontSize: '0.95rem' }}
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 1.5rem' }}>
              Explore Now
            </button>
          </form>

          {/* Category Quick Filters */}
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.84rem', color: '#c7d2fe', fontWeight: 500 }}>
              Quick browse:
            </span>
            {CATEGORY_SHORTCUTS.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => handleCategoryClick(cat.name)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              >
                <cat.icon size={14} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <TrendingUp size={16} />
              Featured Highlights
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>
              Upcoming Premier Events
            </h2>
          </div>
          <Link to="/events" className="btn btn-outline btn-sm">
            View All Events
            <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={4} />
        ) : (
          <div className="events-grid">
            {featuredEvents.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Feature Highlights Grid */}
      <section
        style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Built for Seamless Event Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Full implementation of React, Redux Toolkit, React Router, and Ticketmaster Discovery API.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Compass size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-Time Discovery</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Query live event dates, venues, categories, and seating arrangements directly from Ticketmaster's Discovery API v2.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Simulated Authentication</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Register and log in with complete session persistence in Local Storage managed gracefully through Redux Toolkit slices.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CalendarCheck2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>My Events Dashboard</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Register for events with duplicate prevention, view registrations categorized into upcoming vs completed, and manage cancellations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
