import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  setPage,
  resetFilters,
  selectEvents,
  selectEventsLoading,
  selectEventsError,
  selectEventsFilters,
  selectDataSource,
} from '../features/events/eventsSlice';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import Pagination from '../components/events/Pagination';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Compass, AlertCircle, RefreshCw, Info, CheckCircle } from 'lucide-react';

export const EventsPage = () => {
  const dispatch = useDispatch();

  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const filters = useSelector(selectEventsFilters);
  const dataSource = useSelector(selectDataSource);

  useEffect(() => {
    // Initial fetch if events are empty
    if (events.length === 0 && !loading) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length, loading]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(fetchEvents({ page: newPage }));
  };

  const handleRetry = () => {
    dispatch(fetchEvents());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(fetchEvents({ keyword: '', classificationName: 'All', sort: 'date,asc', page: 0 }));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Compass size={16} />
          Discovery Feed
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
          Explore Events
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Browse, filter, and discover upcoming live events obtained from the Ticketmaster Discovery API.
        </p>
      </div>

      {/* API Source Notification */}
      {dataSource === 'mock' ? (
        <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
          <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Interactive Mode:</strong> Displaying curated real-world event dataset (Ticketmaster API simulation mode).
            To connect to live Ticketmaster servers, set <code>VITE_TICKETMASTER_API_KEY</code> in your <code>.env</code> file.
          </div>
        </div>
      ) : (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Live Connection:</strong> Streamed directly from Ticketmaster Discovery API v2.
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <EventFilters />

      {/* Loading Skeleton */}
      {loading && <LoadingSkeleton count={filters.size || 8} />}

      {/* Error View */}
      {!loading && error && (
        <div className="alert alert-danger" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <AlertCircle size={20} />
            Unable to load events
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>{error}</p>
          <button onClick={handleRetry} className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start', background: 'white' }}>
            <RefreshCw size={14} /> Retry Fetch
          </button>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && events.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <span>
              Showing {events.length} {events.length === 1 ? 'event' : 'events'}
              {filters.totalElements > events.length ? ` of ${filters.totalElements}` : ''}
            </span>
            {filters.classificationName !== 'All' && (
              <span className="badge badge-primary">Category: {filters.classificationName}</span>
            )}
          </div>

          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <Pagination
            currentPage={filters.page}
            totalPages={filters.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Empty State */}
      {!loading && !error && events.length === 0 && (
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            margin: '2rem 0',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Compass size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Events Found
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.875rem' }}>
            We couldn't find any events matching your search or category filter. Try refining your keyword or resetting filters.
          </p>
          <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
