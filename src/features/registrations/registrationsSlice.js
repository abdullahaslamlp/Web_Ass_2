import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY_REGISTRATIONS = 'eventhub_registrations';

const getInitialRegistrations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load registrations:', err);
    return [];
  }
};

const initialState = {
  registrations: getInitialRegistrations(),
  lastActionMessage: null,
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    clearActionMessage: (state) => {
      state.lastActionMessage = null;
    },
  },
});

export const { clearActionMessage } = registrationsSlice.actions;
export default registrationsSlice.reducer;
