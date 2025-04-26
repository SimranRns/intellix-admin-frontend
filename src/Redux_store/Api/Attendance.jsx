import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL


export const fetchAttendance = createAsyncThunk(
    'attendance/fetchAttendance',
    async ({ sessionId, name, batch, enrollment_id, page, limit },  { rejectWithValue }) => {
        try {
            const url = new URL(`${BASE_URL}/api/v1/attendence/getstudent`);
            url.searchParams.append('sessionId', sessionId);
            url.searchParams.append('name', name || '');
            url.searchParams.append('batch', batch || '');
            url.searchParams.append('enrollment_id', enrollment_id || '');
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);
      
            const response = await fetch(url);
            const data = await response.json();
      
            if (!response.ok) {
              throw new Error(data.message || 'Failed to fetch attendance');
            }
      
            return data;
          } catch (error) {
            return rejectWithValue(error.message);
          }
    }
);



