// src/redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { GetTeam, create_employee, getoneemployee } from '../Api/TeamApi';

const teamSlice = createSlice({
  name: "team",
  initialState: {
    users: [],
    profile: {},
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
      // see profile of employee by single emp id 

      .addCase(getoneemployee.pending, (state) => {
        state.loading = true
      })
      .addCase(getoneemployee.fulfilled, (state, action) => {
        state.loading = false,
          state.profile = action.payload
      })
      .addCase(getoneemployee.rejected, (state, action) => {
        state.loading = false,
          state.error = action.payload
      })
      // add employee
      .addCase(create_employee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create_employee.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); 
      })
      .addCase(create_employee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

})

export default teamSlice.reducer;
