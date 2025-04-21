// src/redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'
import GetStudent from '../Api/Student_AddStudent';

const StudentSlice = createSlice({
  name: "student",
  initialState: {
    get_student: [],
    loading: false,
    error: null,
    searchData: [],
  },

  extraReducers: (builder) => {
    builder

      // get student
      .addCase(GetStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.get_student = action.payload;
      })
      .addCase(GetStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }

})

export default StudentSlice.reducer;
