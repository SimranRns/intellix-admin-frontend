import { createSlice } from "@reduxjs/toolkit";
import get_stu_attendance from "../Api/Attendance";

const attendance_slice = createSlice({
    name: "attend",
    initialState: {
        att: [],
        loading: false,
        error: null,
        pagination: {
            total: 0,
            page: 1,
            limit: 10,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_stu_attendance.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_stu_attendance.fulfilled, (state, action) => {
                state.loading = false;
                state.att = action.payload.data; // Assuming the response contains `data`
                state.pagination.total = action.payload.total; // Total number of records
                state.pagination.page = action.payload.page; // Current page
                state.pagination.limit = action.payload.limit; // Records per page
            })
            .addCase(get_stu_attendance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Error message from API
            });
    },
});
export default attendance_slice.reducer