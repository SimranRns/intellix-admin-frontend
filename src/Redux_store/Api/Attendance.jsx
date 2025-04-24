// src/features/attendance/attendanceSlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL

// AsyncThunk for fetching students
export const get_stu_attendance = createAsyncThunk(
    "attendance/fetchStudents",
    async ({ sessionId, name = "", batch = "", enrollment_id = "", page = 1, limit = 10 }) => {
        const query = new URLSearchParams({ sessionId, name, batch, enrollment_id, page, limit });
        const response = await fetch(`${BASE_URL}/api/v1/attendence/getstudent?${query.toString()}`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error("Failed to fetch students");
        return await response.json(); // Assuming API returns a JSON list
    }
);
export default get_stu_attendance 