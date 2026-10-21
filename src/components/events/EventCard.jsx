import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { Calendar, MapPin, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';

export const EventCard = ({ event }) => {
  const currentUser = useSelector(selectCurrentUser);
  const registrations = useSelector((state) => state.registrations.registrations || []);

  const isRegistered = currentUser
    ? registrations.some(
        (r) => r.userEmail === currentUser.email && r.eventId === event.id
      )
    : false;

  // Image resolution fallback
  const preferredImage =
    event.images?.find((img) => img.ratio === '16_9' && img.width >= 600)?.url ||
    event.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80';

  // Format date & time
  const localDate = event.dates?.start?.localDate;
  const localTime = event.dates?.start?.localTime;
  let formattedDateTime = 'Date TBA';

  if (localDate) {
    try {
      const dateObj = new Date(`${localDate}T${localTime || '00:00:00'}`);
      formattedDateTime = dateObj.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      if (localTime) {
        const timeStr = dateObj.toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: '2-digit',
        });
        formattedDateTime += ` • ${timeStr}`;
      }
    } catch {
      formattedDateTime = localDate;
    }
  }

  // Venue & Location
  const venue = event._embedded?.venues?.[0];
  const venueName = venue?.name || 'Venue TBA';
  const locationStr = [venue?.city?.name, venue?.state?.stateCode || venue?.country?.name]
    .filter(Boolean)
    .join(', ');

  // Classification Category
  const categoryName =
    event.classifications?.[0]?.segment?.name ||
    event.classifications?.[0]?.genre?.name ||
    'General';

  // Price range
  const priceRange = event.priceRanges?.[0];
  const priceText = priceRange
    ? `${priceRange.currency === 'EUR' ? '€' : '$'}${Math.round(priceRange.min)} - ${
        priceRange.currency === 'EUR' ? '€' : '$'
      }${Math.round(priceRange.max)}`
    : 'Prices on Ticketmaster';

  return (
    <article className="event-card">
      <div className="event-card-media">
        <img
          src={preferredImage}
          alt={event.name}
          className="event-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="event-card-tag">{categoryName}</div>
        {isRegistered && (
          <div className="event-card-registered-tag">
            <CheckCircle2 size={13} />
            Registered
          </div>
        )}
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title" title={event.name}>
          {event.name}
        </h3>

        <div className="event-card-meta">
          <div className="event-card-meta-row">
            <Calendar size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span>{formattedDateTime}</span>
          </div>

          <div className="event-card-meta-row">
            <MapPin size={15} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {venueName} {locationStr ? `(${locationStr})` : ''}
            </span>
          </div>
        </div>

        <div className="event-card-footer">
          <span className="event-card-price">{priceText}</span>
          <Link to={`/events/${event.id}`} className="btn btn-outline btn-sm">
            View Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
