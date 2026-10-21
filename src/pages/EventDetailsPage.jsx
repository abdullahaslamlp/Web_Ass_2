import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEventById,
  clearSelectedEvent,
  selectSelectedEvent,
  selectDetailsLoading,
  selectDetailsError,
} from '../features/events/eventsSlice';
import { selectCurrentUser, selectIsAuthenticated } from '../features/auth/authSlice';
import {
  registerForEvent,
  cancelRegistration,
  clearRegistrationFeedback,
  selectIsRegistered,
  selectRegistrationFeedback,
} from '../features/registrations/registrationsSlice';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  DollarSign,
  Info,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Ticket,
  Building,
} from 'lucide-react';

export const EventDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const event = useSelector(selectSelectedEvent);
  const loading = useSelector(selectDetailsLoading);
  const error = useSelector(selectDetailsError);

  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const isRegistered = useSelector(
    selectIsRegistered(currentUser?.email, event?.id)
  );
  const feedback = useSelector(selectRegistrationFeedback);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
    return () => {
      dispatch(clearSelectedEvent());
      dispatch(clearRegistrationFeedback());
    };
  }, [dispatch, id]);

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(registerForEvent({ user: currentUser, event }));
  };

  const handleCancelRegistration = () => {
    if (!currentUser || !event) return;
    dispatch(cancelRegistration({ userEmail: currentUser.email, eventId: event.id }));
  };

  if (loading) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div className="skeleton-card" style={{ maxWidth: '800px', margin: '0 auto', height: '400px' }}>
          <div className="skeleton-image skeleton-pulse" style={{ height: '240px' }} />
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="skeleton-line skeleton-pulse" style={{ width: '60%', height: '1.75rem' }} />
            <div className="skeleton-line skeleton-pulse" style={{ width: '40%', height: '1rem' }} />
            <div className="skeleton-line skeleton-pulse" style={{ width: '80%', height: '1rem' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '3rem 2rem',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '3rem auto',
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--danger-light)',
            color: 'var(--danger)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <AlertTriangle size={26} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Event Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          {error || 'The requested event could not be retrieved from the Ticketmaster API.'}
        </p>
        <Link to="/events" className="btn btn-primary btn-sm">
          <ArrowLeft size={15} />
          Back to Events Explorer
        </Link>
      </div>
    );
  }

  // Event parsing
  const bannerImage =
    event.images?.find((img) => img.ratio === '16_9' && img.width >= 1000)?.url ||
    event.images?.find((img) => img.ratio === '16_9')?.url ||
    event.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80';

  const venue = event._embedded?.venues?.[0];
  const localDate = event.dates?.start?.localDate;
  const localTime = event.dates?.start?.localTime;

  let formattedDate = 'Date TBA';
  let formattedTime = '';
  if (localDate) {
    try {
      const d = new Date(`${localDate}T${localTime || '00:00:00'}`);
      formattedDate = d.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      if (localTime) {
        formattedTime = d.toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: '2-digit',
        });
      }
    } catch {
      formattedDate = localDate;
    }
  }

  const category = event.classifications?.[0]?.segment?.name || 'General';
  const genre = event.classifications?.[0]?.genre?.name;
  const subGenre = event.classifications?.[0]?.subGenre?.name;

  const priceRange = event.priceRanges?.[0];
  const priceDisplay = priceRange
    ? `${priceRange.currency === 'EUR' ? '€' : '$'}${Math.round(priceRange.min)} - ${
        priceRange.currency === 'EUR' ? '€' : '$'
      }${Math.round(priceRange.max)}`
    : 'Free / Standard Admission';

  const ticketStatus = event.dates?.status?.code || 'onsale';

  return (
    <div>
      {/* Back button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          to="/events"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          Back to Events Explorer
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="event-details-hero">
        <img
          src={bannerImage}
          alt={event.name}
          className="event-details-hero-img"
        />
        <div className="event-details-hero-overlay">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary" style={{ background: 'white', color: 'var(--primary)' }}>
              {category}
            </span>
            {genre && (
              <span className="badge badge-neutral" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                {genre}
              </span>
            )}
            {ticketStatus === 'onsale' && (
              <span className="badge badge-success">On Sale</span>
            )}
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2 }}>
            {event.name}
          </h1>
        </div>
      </div>

      {/* Main Grid */}
      <div className="event-details-grid">
        {/* Left Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Key Date and Location Card */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Calendar size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Date & Time
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: '0.2rem' }}>
                  {formattedDate}
                </div>
                {formattedTime && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <Clock size={13} /> {formattedTime}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Venue Location
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginTop: '0.2rem' }}>
                  {venue?.name || 'Venue TBA'}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {[venue?.address?.line1, venue?.city?.name, venue?.state?.stateCode || venue?.country?.name]
                    .filter(Boolean)
                    .join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Description & Overview */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={18} style={{ color: 'var(--primary)' }} />
              About This Event
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '1rem' }}>
              {event.info || 'No extended synopsis provided for this event. Ticketmaster verified event.'}
            </p>

            {event.pleaseNote && (
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  borderLeft: '4px solid var(--accent)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  marginTop: '1.25rem',
                }}
              >
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                  Special Attendee Note:
                </strong>
                <span style={{ color: 'var(--text-muted)' }}>{event.pleaseNote}</span>
              </div>
            )}
          </div>

          {/* Venue & Classification Specifications */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building size={18} style={{ color: 'var(--secondary)' }} />
              Venue & Classification Specifications
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Primary Segment:</span>
                <div style={{ fontWeight: 600 }}>{category}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Genre:</span>
                <div style={{ fontWeight: 600 }}>{genre || 'N/A'}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sub-Genre:</span>
                <div style={{ fontWeight: 600 }}>{subGenre || 'N/A'}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Postal Code:</span>
                <div style={{ fontWeight: 600 }}>{venue?.postalCode || 'N/A'}</div>
              </div>
            </div>

            {event.url && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  View on Ticketmaster.com
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div>
          <div
            style={{
              position: 'sticky',
              top: '5.5rem',
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Admission & Pricing
              </span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                {priceDisplay}
              </div>
            </div>

            {/* Registration Feedback Notification */}
            {feedback && (
              <div className={`alert alert-${feedback.type === 'error' ? 'danger' : feedback.type === 'success' ? 'success' : 'info'}`}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Registration State Actions */}
            {isRegistered ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem',
                    textAlign: 'center',
                    color: '#065f46',
                  }}
                >
                  <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={18} />
                    You are registered!
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#047857' }}>
                    View this event on your <Link to="/my-events" style={{ textDecoration: 'underline', fontWeight: 600 }}>My Events</Link> page.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCancelRegistration}
                  className="btn btn-outline btn-danger btn-sm"
                  style={{ width: '100%', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                >
                  <XCircle size={15} />
                  Cancel Registration
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Ticket size={18} />
                  {isAuthenticated ? 'Register for Event' : 'Sign In to Register'}
                </button>
                {!isAuthenticated && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                    Quick registration takes less than 30 seconds.
                  </p>
                )}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Instant confirmation feedback</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Duplicate registration prevention</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Flexible cancellation anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
