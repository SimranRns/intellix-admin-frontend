// src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL


///Create Employee
export const create_employee = createAsyncThunk(
  "create_employee",
  async (data, { rejectWithValue }) => {
    try {
      console.log("🚀 Sending employee payload:", data);

      const response = await fetch(`${BASE_URL}/api/v1/employee/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ API returned an error:", result);
        return rejectWithValue(result);
      }

      return result; // or result.data if your backend wraps it
    } catch (error) {
      console.error("💥 Request failed:", error);
      return rejectWithValue(error);
    }
  }
);

//////Get Teacher
export const GetTeam = createAsyncThunk(
  'getTeam',
  async ({ first_name, joining_date }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/search?first_name=${first_name}&joining_date=${joining_date}&page=1&limit=2000`, {
        method: 'GET',
      })
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }

      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong')
    }
  }
)

//DeleteEmployee

export const DeleteEmployee = createAsyncThunk(
  'DeleteEmployee',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/delete/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export default {
  GetTeam, create_employee, DeleteEmployee
}
