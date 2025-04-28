import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentAttendance } from "../Api/Stu_atten";

const stu_attendanceSlice = createSlice({
    name: 'attendance_stu',
    initialState: {
      studentAttendance: { data: [] },
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudentAttendance.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStudentAttendance.fulfilled, (state, action) => {
            state.loading = false;
            state.studentAttendance = { data: Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data] };
          })
          
          
        .addCase(fetchStudentAttendance.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default stu_attendanceSlice.reducer;