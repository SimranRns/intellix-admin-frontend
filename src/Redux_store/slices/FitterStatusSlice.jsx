
import { createSlice } from '@reduxjs/toolkit';
import { changestatusLeads, getallLeads, AddLeads, searchingleads } from '../Api/LeadsApi';
import { FitterStatus } from '../Api/FitterStatusApi';

const StatusSlice = createSlice({
  name: "Status",
  initialState: {
    leads: [],
    loading: false,
    error: null,
    searchedLeads: [],
    leadData: null,
  },
  extraReducers: (builder) => {
    builder
 
      // FitterStatus
      .addCase(FitterStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FitterStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedLeads = action.payload;
      })
      .addCase(FitterStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to search leads";
      });
  }
});

export const StatusSliceReducer = StatusSlice.reducer;
