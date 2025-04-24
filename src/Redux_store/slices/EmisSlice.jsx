import { createSlice } from '@reduxjs/toolkit';
import { addEmis, getEmis, addOneShotEmis } from '../api/EmisApiStore';

const EmisSlice = createSlice({
  name: 'emis',
  initialState: {
    data: {
      missed: [],
      upcoming: [],
      paid: [],
      summary: {
        totalMissedFees: 0,
        totalCollectedFees: 0,
        totalUpcomingFees: 0,
      },
    },
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle addEmis (for EMI payments)
      .addCase(addEmis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmis.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming addEmis returns an array of EMI objects
        state.data.missed = [...state.data.missed, ...(Array.isArray(action.payload) ? action.payload : [action.payload])];
      })
      .addCase(addEmis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addOneShotEmis (for one-shot payments)
      .addCase(addOneShotEmis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOneShotEmis.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming addOneShotEmis returns a single EMI object
        state.data.missed = [...state.data.missed, action.payload];
      })
      .addCase(addOneShotEmis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getEmis
      .addCase(getEmis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmis.fulfilled, (state, action) => {
        console.log('getEmis fulfilled:', action.payload);
        state.loading = false;

        // Handle nested response (e.g., { data: { missed, upcoming, paid, summary } })
        const payload = action.payload.data || action.payload;

        state.data.missed = payload.missed || [];
        state.data.upcoming = payload.upcoming || [];
        state.data.paid = payload.paid || [];
        state.data.summary = payload.summary || {
          totalMissedFees: 0,
          totalCollectedFees: 0,
          totalUpcomingFees: 0,
        };
      })
      .addCase(getEmis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = EmisSlice.actions;
export default EmisSlice.reducer;