import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setKeyword,
  setClassification,
  setSort,
  resetFilters,
  fetchEvents,
  selectEventsFilters,
} from '../../features/events/eventsSlice';
import { Search, RotateCcw, Filter, ArrowUpDown } from 'lucide-react';

const CATEGORIES = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

export const EventFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectEventsFilters);

  const [localSearch, setLocalSearch] = useState(filters.keyword);

  // Sync internal state with external filter updates
  useEffect(() => {
    setLocalSearch(filters.keyword);
  }, [filters.keyword]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setKeyword(localSearch));
    dispatch(fetchEvents({ keyword: localSearch, page: 0 }));
  };

  const handleCategoryClick = (category) => {
    dispatch(setClassification(category));
    dispatch(fetchEvents({ classificationName: category, page: 0 }));
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    dispatch(setSort(newSort));
    dispatch(fetchEvents({ sort: newSort, page: 0 }));
  };

  const handleReset = () => {
    setLocalSearch('');
    dispatch(resetFilters());
    dispatch(fetchEvents({ keyword: '', classificationName: 'All', sort: 'date,asc', page: 0 }));
  };

  return (
    <div className="filter-container">
      {/* Search Input Row & Sort */}
      <form onSubmit={handleSearchSubmit} className="filter-search-row">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by event name, artist, venue, or city..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <Search size={16} />
          Search
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="sort-select" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowUpDown size={15} />
            Sort:
          </label>
          <select
            id="sort-select"
            className="form-input"
            style={{ width: 'auto', padding: '0.6rem 0.85rem', cursor: 'pointer' }}
            value={filters.sort}
            onChange={handleSortChange}
          >
            <option value="date,asc">Date: Earliest First</option>
            <option value="date,desc">Date: Latest First</option>
            <option value="name,asc">Name: A to Z</option>
            <option value="name,desc">Name: Z to A</option>
          </select>
        </div>

        {(filters.keyword || filters.classificationName !== 'All' || filters.sort !== 'date,asc') && (
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline"
            title="Reset all filters"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        )}
      </form>

      {/* Categories Bar */}
      <div className="filter-categories">
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
          Categories:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-pill ${filters.classificationName === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilters;
