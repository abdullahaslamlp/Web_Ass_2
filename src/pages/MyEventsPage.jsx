import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import {
  selectUserRegistrations,
  cancelRegistration,
  selectRegistrationFeedback,
  clearRegistrationFeedback,
} from '../features/registrations/registrationsSlice';
import Modal from '../components/common/Modal';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  CalendarDays,
  History,
  XCircle,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const MyEventsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const userRegistrations = useSelector(selectUserRegistrations(user?.email));
  const feedback = useSelector(selectRegistrationFeedback);

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'all'
  const [modalState, setModalState] = useState({
    isOpen: false,
    registration: null,
  });

  // Separate upcoming vs completed events
  const { upcomingEvents, completedEvents } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const completed = [];

    userRegistrations.forEach((reg) => {
      let eventDateObj = null;
      if (reg.eventDateTime) {
        eventDateObj = new Date(reg.eventDateTime);
      } else if (reg.eventDate) {
        eventDateObj = new Date(reg.eventDate);
      }

      if (eventDateObj && !isNaN(eventDateObj.getTime())) {
        if (eventDateObj >= now) {
          upcoming.push(reg);
        } else {
          completed.push(reg);
        }
      } else {
        // Fallback to upcoming if date is ambiguous
        upcoming.push(reg);
      }
    });

    return { upcomingEvents: upcoming, completedEvents: completed };
  }, [userRegistrations]);

  const displayedEvents = useMemo(() => {
    if (activeTab === 'upcoming') return upcomingEvents;
    if (activeTab === 'completed') return completedEvents;
    return userRegistrations;
  }, [activeTab, upcomingEvents, completedEvents, userRegistrations]);

  const handleOpenCancelModal = (registration) => {
    setModalState({
      isOpen: true,
      registration,
    });
  };

  const handleConfirmCancel = () => {
    if (modalState.registration && user) {
      dispatch(
        cancelRegistration({
          userEmail: user.email,
          eventId: modalState.registration.eventId,
        })
      );
    }
    setModalState({ isOpen: false, registration: null });
  };

  const formatRegDate = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Ticket size={16} />
          Personal Event Hub
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
          My Registered Events
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
          Manage your upcoming registrations, review past completed events, and adjust reservations.
        </p>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
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
            <Ticket size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Total Registrations
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {userRegistrations.length}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
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
            <CalendarDays size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Upcoming Events
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>
              {upcomingEvents.length}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <History size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Past / Completed
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>
              {completedEvents.length}
            </div>
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
      {feedback && (
        <div
          className={`alert alert-${feedback.type === 'error' ? 'danger' : feedback.type === 'success' ? 'success' : 'info'}`}
          style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => dispatch(clearRegistrationFeedback())}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.75rem' }}>
        <button
          type="button"
          className={`category-pill ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events ({upcomingEvents.length})
        </button>
        <button
          type="button"
          className={`category-pill ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Past / Completed ({completedEvents.length})
        </button>
        <button
          type="button"
          className={`category-pill ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Registrations ({userRegistrations.length})
        </button>
      </div>

      {/* Event Cards List */}
      {displayedEvents.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {displayedEvents.map((reg) => {
            const isPast = completedEvents.some((c) => c.id === reg.id);
            return (
              <div
                key={reg.id}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  flexWrap: 'wrap',
                }}
              >
                {/* Event Thumbnail */}
                <div
                  style={{
                    width: '120px',
                    height: '90px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#0f172a',
                  }}
                >
                  <img
                    src={reg.image || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80'}
                    alt={reg.eventName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Event Details */}
                <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary">{reg.category || 'Event'}</span>
                    {isPast ? (
                      <span className="badge badge-neutral">Completed</span>
                    ) : (
                      <span className="badge badge-success">Upcoming</span>
                    )}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Registered on {formatRegDate(reg.registeredAt)}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.2rem 0' }}>
                    {reg.eventName}
                  </h3>

                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.84rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} style={{ color: 'var(--primary)' }} />
                      <span>{reg.eventDate || 'Date TBA'} {reg.eventTime ? `• ${reg.eventTime.slice(0, 5)}` : ''}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} style={{ color: 'var(--secondary)' }} />
                      <span>
                        {reg.venueName} {reg.venueCity ? `(${reg.venueCity})` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginLeft: 'auto' }}>
                  <Link to={`/events/${reg.eventId}`} className="btn btn-outline btn-sm">
                    View Details
                  </Link>

                  {!isPast && (
                    <button
                      type="button"
                      onClick={() => handleOpenCancelModal(reg)}
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--danger)', borderColor: '#fca5a5' }}
                      title="Cancel this registration"
                    >
                      <XCircle size={15} />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            margin: '1.5rem 0',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Ticket size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {activeTab === 'upcoming'
              ? 'No Upcoming Events Registered'
              : activeTab === 'completed'
              ? 'No Completed Events'
              : 'No Event Registrations Yet'}
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.875rem' }}>
            {activeTab === 'upcoming'
              ? 'You have not registered for any upcoming events yet. Discover world-class events in our directory!'
              : 'Once events you attended conclude, they will be archived here in your personal history.'}
          </p>
          <Link to="/events" className="btn btn-primary btn-sm">
            Explore Events Directory
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, registration: null })}
        onConfirm={handleConfirmCancel}
        title="Cancel Event Registration"
        message={`Are you sure you want to cancel your registration for "${modalState.registration?.eventName}"? You can re-register anytime if spots remain available.`}
        confirmText="Yes, Cancel Registration"
        cancelText="Keep Registration"
        confirmVariant="danger"
      />
    </div>
  );
};

export default MyEventsPage;
