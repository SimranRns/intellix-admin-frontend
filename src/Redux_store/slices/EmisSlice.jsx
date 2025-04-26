import { createSlice } from "@reduxjs/toolkit";
import {
  addEmis,
  getEmis,
  getEmisTotalAmounts,
  addOneShotEmis,
} from "../api/EmisApiStore";
import { data } from "react-router";

const EmisSlice = createSlice({
  name: "emis",
  initialState: {
    data: {
      totalAmount: 0, // Add totalAmount to initial state
      totalEmis: 0,
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
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.data.missed = [...state.data.missed, ...payload];
      })
      .addCase(addEmis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add EMI";
      })
      // Handle addOneShotEmis (for one-shot payments)
      .addCase(addOneShotEmis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOneShotEmis.fulfilled, (state, action) => {
        state.loading = false;
        state.data.missed = [...state.data.missed, action.payload];
      })
      .addCase(addOneShotEmis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add one-shot EMI";
      })
      // Handle getEmis
      .addCase(getEmis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmis.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload.data || action.payload;

        // Categorize EMIs from details array
        // const details = Array.isArray(payload?.data?.details)
        //   ? payload.data.details
        //   : [];
        const details = Array.isArray(payload?.details) ? payload?.details : [];
       
        console.log(details, "details from emis slice");

        const currentDate = new Date();

        state.data.missed = details.filter(
          (emi) => !emi.is_paid && new Date(emi.emi_duedate) < currentDate
        );
        state.data.upcoming = details.filter(
          (emi) => !emi.is_paid && new Date(emi.emi_duedate) >= currentDate
        );
        state.data.paid = details.filter((emi) => emi.is_paid);

        // Update summary
        state.data.summary = {
          totalMissedFees: payload.breakdown?.totalMissedFees || 0,
          totalCollectedFees: payload.breakdown?.totalCollectedFees || 0,
          totalUpcomingFees: payload.breakdown?.totalUpcomingFees || 0,
          totalEmis: payload.breakdown?.totalEmis || 0, // Include totalEmis
        };

        state.data.totalEmis = payload.summary?.totalEmis || 0;
      })
      .addCase(getEmis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch EMIs";
      })
      // Handle getEmisTotalAmounts
      .addCase(getEmisTotalAmounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmisTotalAmounts.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload.data || action.payload;

        state.data.totalAmount = payload.totalAmount || 0; // Store totalAmount
        state.data.totalEmis = payload.breakdown.totalEmis || 0; // Store totalEmis
        state.data.summary = {
          totalMissedFees: payload.breakdown.totalMissedFees || 0,
          totalCollectedFees: payload.breakdown.totalCollectedFees || 0,
          totalUpcomingFees: payload.breakdown.totalUpcomingFees || 0,
        };
      })

      .addCase(getEmisTotalAmounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch EMI total amounts";
      });
  },
});

export const { clearError } = EmisSlice.actions;
export default EmisSlice.reducer;
