import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload; // { message, type }
    },
    hideToast: (state) => {
      state.toast = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { showToast, hideToast, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
