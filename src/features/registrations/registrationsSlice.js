import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY_REGISTRATIONS = 'eventhub_registrations';

const loadRegistrations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse registrations from localStorage:', err);
    return [];
  }
};

const saveRegistrations = (registrations) => {
  try {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
  } catch (err) {
    console.error('Failed to save registrations to localStorage:', err);
  }
};

const initialState = {
  registrations: loadRegistrations(),
  lastFeedback: null, // { type: 'success' | 'error' | 'info', message: string }
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const { user, event } = action.payload;
      if (!user || !user.email) {
        state.lastFeedback = {
          type: 'error',
          message: 'You must be logged in to register for an event.',
        };
        return;
      }

      // Duplicate registration check
      const alreadyRegistered = state.registrations.some(
        (r) => r.userEmail.toLowerCase() === user.email.toLowerCase() && r.eventId === event.id
      );

      if (alreadyRegistered) {
        state.lastFeedback = {
          type: 'error',
          message: `You are already registered for "${event.name}".`,
        };
        return;
      }

      const venue = event._embedded?.venues?.[0];
      const preferredImage =
        event.images?.find((img) => img.ratio === '16_9' && img.width >= 600)?.url ||
        event.images?.[0]?.url ||
        '';

      const newRegistration = {
        id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        userId: user.id,
        userEmail: user.email.toLowerCase(),
        userName: user.name,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.dates?.start?.localDate || '',
        eventTime: event.dates?.start?.localTime || '',
        eventDateTime: event.dates?.start?.dateTime || `${event.dates?.start?.localDate || ''}T${event.dates?.start?.localTime || '00:00:00'}`,
        venueName: venue?.name || 'Venue TBA',
        venueCity: venue?.city?.name || '',
        venueState: venue?.state?.stateCode || venue?.country?.name || '',
        venueAddress: venue?.address?.line1 || '',
        category:
          event.classifications?.[0]?.segment?.name ||
          event.classifications?.[0]?.genre?.name ||
          'General',
        image: preferredImage,
        registeredAt: new Date().toISOString(),
      };

      state.registrations.push(newRegistration);
      saveRegistrations(state.registrations);

      state.lastFeedback = {
        type: 'success',
        message: `Successfully registered for "${event.name}"!`,
      };
    },

    cancelRegistration: (state, action) => {
      const { userEmail, eventId } = action.payload;
      if (!userEmail || !eventId) return;

      const targetIndex = state.registrations.findIndex(
        (r) => r.userEmail.toLowerCase() === userEmail.toLowerCase() && r.eventId === eventId
      );

      if (targetIndex === -1) {
        state.lastFeedback = {
          type: 'error',
          message: 'Registration record not found.',
        };
        return;
      }

      const removedEventName = state.registrations[targetIndex].eventName;
      state.registrations.splice(targetIndex, 1);
      saveRegistrations(state.registrations);

      state.lastFeedback = {
        type: 'info',
        message: `Your registration for "${removedEventName}" has been cancelled.`,
      };
    },

    clearRegistrationFeedback: (state) => {
      state.lastFeedback = null;
    },
  },
});

export const {
  registerForEvent,
  cancelRegistration,
  clearRegistrationFeedback,
} = registrationsSlice.actions;

// Selectors
export const selectAllRegistrations = (state) => state.registrations.registrations;
export const selectRegistrationFeedback = (state) => state.registrations.lastFeedback;

export const selectUserRegistrations = (userEmail) => (state) => {
  if (!userEmail) return [];
  return state.registrations.registrations.filter(
    (r) => r.userEmail.toLowerCase() === userEmail.toLowerCase()
  );
};

export const selectIsRegistered = (userEmail, eventId) => (state) => {
  if (!userEmail || !eventId) return false;
  return state.registrations.registrations.some(
    (r) => r.userEmail.toLowerCase() === userEmail.toLowerCase() && r.eventId === eventId
  );
};

export default registrationsSlice.reducer;
