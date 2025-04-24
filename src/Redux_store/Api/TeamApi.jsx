// src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const GetTeam = createAsyncThunk(
  'getTeam',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/get`, {
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
// employee  profile by id
export const getoneemployee = createAsyncThunk(
  'profile', async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/getOne/${id}`, {
        method: 'GET'
      })
      if (!response.ok) {
        const errordata = await response.json()
        return rejectWithValue(errordata)
      }
      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// add employee 

export const add_employee = createAsyncThunk(
  "employee/add",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/employee/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




export default { GetTeam: [Function], getoneemployee: [Function], add_employee: [Function] }
