import { createSlice } from "@reduxjs/toolkit";
import { fetchAttendance } from "../Api/Attendance";


const initialState = {
    data: [],
    total: 0,
    page: 1,
    limit: 5,
    search: {
      name: '',
      batch: '',
      enrollment_id: ''
    },
    sessionID: 19,
    loading: false,
    error: null,
  };

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
      setSearchFilters(state, action) {
        state.search = { ...action.payload };  // Spread karke naya object banana jaruri hai
      },
      
      setPage(state, action) {
        state.page = action.payload;
      },
      setLimit(state, action) {
        state.limit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAttendance.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAttendance.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data || [];  // ✅ सही data
          state.total = action.payload.total;  // ✅ सही total
          state.page = action.payload.page;   // ✅ current page update
          state.limit = action.payload.limit; // ✅ limit भी आ रही
      })
      
        .addCase(fetchAttendance.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch attendance';
        });
    },
  });
  
  export const { setSearchFilters, setPage, setLimit } = attendanceSlice.actions;
  export default attendanceSlice.reducer;
