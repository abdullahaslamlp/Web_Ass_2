import React from 'react';

export const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="events-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image skeleton-pulse" />
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="skeleton-badge skeleton-pulse" />
            <div className="skeleton-line skeleton-pulse" style={{ width: '85%', height: '1.25rem' }} />
            <div className="skeleton-line skeleton-pulse" style={{ width: '60%', height: '0.875rem' }} />
            <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '0.875rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
              <div className="skeleton-line skeleton-pulse" style={{ width: '30%', height: '1rem' }} />
              <div className="skeleton-btn skeleton-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
