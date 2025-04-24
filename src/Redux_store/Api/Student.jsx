import { createAsyncThunk } from "@reduxjs/toolkit";



const BASE_URL = import.meta.env.VITE_BASE_URL

const GetStudent = createAsyncThunk("student/getStudent", async ({ page, limit, status, session_id, enrollment_id, serial_no, name, father_name }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/student/allStudents?status=${status}&session_id=${session_id}&enrollment_id=${enrollment_id}&serial_no=${serial_no}&name=${name}&father_name=${father_name}&limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

export default GetStudent;
