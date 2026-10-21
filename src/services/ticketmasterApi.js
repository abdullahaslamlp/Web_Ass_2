import { MOCK_EVENTS } from './mockData';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

/**
 * Filter mock events when API key is missing or quota is exhausted
 */
const filterMockEvents = ({ keyword = '', classificationName = 'All', sort = 'date,asc', page = 0, size = 12 }) => {
  let list = [...MOCK_EVENTS];

  if (keyword.trim()) {
    const q = keyword.toLowerCase().trim();
    list = list.filter((event) => {
      const matchName = event.name?.toLowerCase().includes(q);
      const matchVenue = event._embedded?.venues?.[0]?.name?.toLowerCase().includes(q);
      const matchCity = event._embedded?.venues?.[0]?.city?.name?.toLowerCase().includes(q);
      const matchSegment = event.classifications?.[0]?.segment?.name?.toLowerCase().includes(q);
      return matchName || matchVenue || matchCity || matchSegment;
    });
  }

  if (classificationName && classificationName !== 'All') {
    list = list.filter((event) => {
      const segName = event.classifications?.[0]?.segment?.name;
      return segName?.toLowerCase() === classificationName.toLowerCase();
    });
  }

  // Sorting
  if (sort.startsWith('date')) {
    const isAsc = sort.includes('asc');
    list.sort((a, b) => {
      const dateA = new Date(a.dates?.start?.dateTime || a.dates?.start?.localDate || 0);
      const dateB = new Date(b.dates?.start?.dateTime || b.dates?.start?.localDate || 0);
      return isAsc ? dateA - dateB : dateB - dateA;
    });
  } else if (sort.startsWith('name')) {
    const isAsc = sort.includes('asc');
    list.sort((a, b) => {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }

  const totalElements = list.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const startIndex = page * size;
  const paginatedEvents = list.slice(startIndex, startIndex + size);

  return {
    events: paginatedEvents,
    page: {
      number: page,
      size,
      totalPages,
      totalElements,
    },
    source: 'mock',
  };
};

/**
 * Fetch events from Ticketmaster Discovery API with graceful resilience fallback
 */
export const fetchEventsApi = async ({
  keyword = '',
  classificationName = 'All',
  sort = 'date,asc',
  page = 0,
  size = 12,
  city = '',
}) => {
  // If no API key provided or key is placeholder, use mock data immediately
  if (!API_KEY || API_KEY === 'your_ticketmaster_api_key_here' || API_KEY.trim() === '') {
    return filterMockEvents({ keyword, classificationName, sort, page, size });
  }

  const params = new URLSearchParams();
  params.append('apikey', API_KEY);
  params.append('page', String(page));
  params.append('size', String(size));

  if (keyword.trim()) {
    params.append('keyword', keyword.trim());
  }

  if (classificationName && classificationName !== 'All') {
    params.append('classificationName', classificationName);
  }

  if (city.trim()) {
    params.append('city', city.trim());
  }

  if (sort) {
    params.append('sort', sort);
  }

  try {
    const response = await fetch(`${BASE_URL}/events.json?${params.toString()}`);

    if (response.status === 429) {
      console.warn('Ticketmaster API rate limit reached (429). Falling back to mock dataset.');
      return filterMockEvents({ keyword, classificationName, sort, page, size });
    }

    if (!response.ok) {
      console.warn(`Ticketmaster API returned status ${response.status}. Using fallback dataset.`);
      return filterMockEvents({ keyword, classificationName, sort, page, size });
    }

    const data = await response.json();
    const rawEvents = data._embedded?.events || [];
    const pageInfo = data.page || {
      number: page,
      size,
      totalPages: 1,
      totalElements: rawEvents.length,
    };

    return {
      events: rawEvents,
      page: pageInfo,
      source: 'ticketmaster',
    };
  } catch (error) {
    console.warn('Network error while querying Ticketmaster API. Using fallback dataset:', error);
    return filterMockEvents({ keyword, classificationName, sort, page, size });
  }
};

/**
 * Fetch single event details by ID
 */
export const fetchEventByIdApi = async (id) => {
  if (!id) throw new Error('Event ID is required');

  if (API_KEY && API_KEY !== 'your_ticketmaster_api_key_here') {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`);
      if (response.ok) {
        const data = await response.json();
        return { event: data, source: 'ticketmaster' };
      }
    } catch (err) {
      console.warn('Could not fetch from Ticketmaster, checking local dataset:', err);
    }
  }

  // Lookup in mock data
  const localEvent = MOCK_EVENTS.find((e) => e.id === id);
  if (localEvent) {
    return { event: localEvent, source: 'mock' };
  }

  throw new Error(`Event with ID "${id}" could not be found.`);
};
