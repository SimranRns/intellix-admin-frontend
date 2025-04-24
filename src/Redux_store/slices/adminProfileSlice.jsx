// src/redux/slices/adminProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { view_admin_profile } from "../Api/adminProfile";

const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState: {
    profile: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(view_admin_profile.pending, (state) => {
        state.loading = true;
      })
      .addCase(view_admin_profile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(view_admin_profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProfileSlice.reducer;
