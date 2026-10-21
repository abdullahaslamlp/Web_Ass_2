import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  featuredEvents: [],
  selectedEvent: null,
  loading: false,
  error: null,
  filters: {
    keyword: '',
    classificationName: 'All',
    sort: 'date,asc',
    page: 0,
    size: 12,
    totalPages: 1,
    totalElements: 0,
  },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        keyword: '',
        classificationName: 'All',
        sort: 'date,asc',
        page: 0,
        size: 12,
        totalPages: 1,
        totalElements: 0,
      };
    },
  },
});

export const { setFilters, resetFilters } = eventsSlice.actions;
export default eventsSlice.reducer;
