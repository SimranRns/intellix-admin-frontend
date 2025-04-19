// src/redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'
import GetTeam from '../Api/TeamApi';

const teamSlice = createSlice({
  name: "team",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  extraReducers: (builder) => {
    builder

      // create Employee
      .addCase(GetTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(GetTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }

})

export default teamSlice.reducer;
