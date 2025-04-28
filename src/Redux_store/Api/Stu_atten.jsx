import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchStudentAttendance = createAsyncThunk(
    'attendance/fetchStudentAttendance',
    async ({  month, year }, { rejectWithValue }) => {
      try {
        const url = `${BASE_URL}/api/v1/attendence/getsinglestudent/1234006?month=${month}&year=${year}`;
        const response = await fetch(url);
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || 'Failed to fetch attendance');
        }
  
        const data = await response.json();
        return data.data;
      } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
      }
    }
  );