import { createAsyncThunk } from "@reduxjs/toolkit";



const BASE_URL = import.meta.env.VITE_BASE_URL

const GetExStudent = createAsyncThunk("Exstudent/getExStudent", async ({ page, email, sessionId, contact_no,  name, pageSize }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/student/inactive-students?sessionId=${sessionId}&name=${name}&page=${page}&pageSize=${pageSize}&email=${email}&contact_no=${contact_no}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

export default GetExStudent;