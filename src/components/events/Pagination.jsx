import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage = 0, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine visible page numbers
  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(0, currentPage - 2);
  let endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(0, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 0}
        className="page-btn"
        aria-label="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>

      {startPage > 0 && (
        <>
          <button onClick={() => onPageChange(0)} className="page-btn">
            1
          </button>
          {startPage > 1 && <span style={{ padding: '0 0.25rem', color: 'var(--text-muted)' }}>...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => {
            onPageChange(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`page-btn ${p === currentPage ? 'active' : ''}`}
        >
          {p + 1}
        </button>
      ))}

      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && <span style={{ padding: '0 0.25rem', color: 'var(--text-muted)' }}>...</span>}
          <button onClick={() => onPageChange(totalPages - 1)} className="page-btn">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        className="page-btn"
        aria-label="Next Page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
