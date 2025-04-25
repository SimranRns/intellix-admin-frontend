// src/redux/slices/adminProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { view_admin_profile,change_admin_password } from "../Api/adminProfile";

const adminProfileSlice = createSlice({
  name: "admin",
  initialState: {
    profile: {},
    loading: false,
    error: null,
    passwordChangeSuccess: null,
    passwordChangeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // View profile
      .addCase(view_admin_profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(view_admin_profile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(view_admin_profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change password
      .addCase(change_admin_password.pending, (state) => {
        state.loading = true;
        state.passwordChangeSuccess = null;
        state.passwordChangeError = null;
      })
      .addCase(change_admin_password.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordChangeSuccess = action.payload.message || "Password changed successfully.";
      })
      .addCase(change_admin_password.rejected, (state, action) => {
        state.loading = false;
        state.passwordChangeError = action.payload || "Password change failed.";
      });
  },
});

export default adminProfileSlice.reducer;
