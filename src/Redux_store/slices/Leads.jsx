
import { createSlice } from '@reduxjs/toolkit';
import { changestatusLeads, getallLeads, AddLeads, searchingleads } from '../Api/LeadsApi';

const LeadsSlice = createSlice({
  name: "LeadsSlice",
  initialState: {
    leads: [],
    loading: false,
    error: null,
    searchedLeads: [],
    leadData: null,
  },
  extraReducers: (builder) => {
    builder
      // Change Status Leads
      .addCase(changestatusLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(changestatusLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(changestatusLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Leads
      .addCase(getallLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(getallLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Leads
      .addCase(AddLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leadData = action.payload;
      })
      .addCase(AddLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add lead";
      })

      // Search Leads
      .addCase(searchingleads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchingleads.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedLeads = action.payload;
      })
      .addCase(searchingleads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to search leads";
      });
  }
});

export const LeadsSliceReducer = LeadsSlice.reducer;
