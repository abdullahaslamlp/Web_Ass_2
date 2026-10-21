import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventsApi, fetchEventByIdApi } from '../../services/ticketmasterApi';

// Async thunk to fetch paginated/filtered events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params = {}, { getState, rejectWithValue }) => {
    try {
      const state = getState().events.filters;
      const queryParams = {
        keyword: params.keyword !== undefined ? params.keyword : state.keyword,
        classificationName:
          params.classificationName !== undefined ? params.classificationName : state.classificationName,
        sort: params.sort !== undefined ? params.sort : state.sort,
        page: params.page !== undefined ? params.page : state.page,
        size: params.size !== undefined ? params.size : state.size,
      };

      const result = await fetchEventsApi(queryParams);
      return {
        events: result.events,
        page: result.page,
        source: result.source,
        usedParams: queryParams,
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch events');
    }
  }
);

// Async thunk to fetch featured events for landing page
export const fetchFeaturedEvents = createAsyncThunk(
  'events/fetchFeaturedEvents',
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetchEventsApi({
        keyword: '',
        classificationName: 'All',
        sort: 'date,asc',
        page: 0,
        size: 4,
      });
      return result.events;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch featured events');
    }
  }
);

// Async thunk to fetch single event details
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      const result = await fetchEventByIdApi(id);
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load event details');
    }
  }
);

const initialState = {
  events: [],
  featuredEvents: [],
  selectedEvent: null,
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
  dataSource: 'api', // 'ticketmaster' | 'mock'
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
    setKeyword: (state, action) => {
      state.filters.keyword = action.payload;
      state.filters.page = 0; // reset to first page upon filter change
    },
    setClassification: (state, action) => {
      state.filters.classificationName = action.payload;
      state.filters.page = 0;
    },
    setSort: (state, action) => {
      state.filters.sort = action.payload;
      state.filters.page = 0;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
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
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    // fetchEvents
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.dataSource = action.payload.source;
        state.filters.page = action.payload.page.number || 0;
        state.filters.totalPages = action.payload.page.totalPages || 1;
        state.filters.totalElements = action.payload.page.totalElements || action.payload.events.length;
        if (action.payload.usedParams) {
          state.filters.keyword = action.payload.usedParams.keyword;
          state.filters.classificationName = action.payload.usedParams.classificationName;
          state.filters.sort = action.payload.usedParams.sort;
        }
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred while fetching events.';
      });

    // fetchFeaturedEvents
    builder
      .addCase(fetchFeaturedEvents.fulfilled, (state, action) => {
        state.featuredEvents = action.payload;
      });

    // fetchEventById
    builder
      .addCase(fetchEventById.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedEvent = action.payload.event;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload || 'Failed to load event details.';
      });
  },
});

export const {
  setKeyword,
  setClassification,
  setSort,
  setPage,
  resetFilters,
  clearSelectedEvent,
} = eventsSlice.actions;

// Selectors
export const selectEvents = (state) => state.events.events;
export const selectFeaturedEvents = (state) => state.events.featuredEvents;
export const selectSelectedEvent = (state) => state.events.selectedEvent;
export const selectEventsLoading = (state) => state.events.loading;
export const selectDetailsLoading = (state) => state.events.detailsLoading;
export const selectEventsError = (state) => state.events.error;
export const selectDetailsError = (state) => state.events.detailsError;
export const selectEventsFilters = (state) => state.events.filters;
export const selectDataSource = (state) => state.events.dataSource;

export default eventsSlice.reducer;
