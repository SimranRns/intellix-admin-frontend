// src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
import { createAsyncThunk } from '@reduxjs/toolkit'
import { data } from 'react-router'
const BASE_URL = import.meta.env.VITE_BASE_URL

////Create Department
export const create_department = createAsyncThunk(
  'create_department',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/departmentrouter/adddepartment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Agar backend response me error hai to
        return rejectWithValue(result || { message: "Something went wrong!" });
      }

      return result;
      
    } catch (error) {
      return rejectWithValue(error?.message || "Unknown error");
    }
  }
);


//////Get Teacher
export const get_Deparment = createAsyncThunk(
  'get_Deparment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/departmentrouter/getDepartment
`, {
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

///Delete_department
export const delete_department = createAsyncThunk('delete_department', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/departmentrouter/deleteDepartment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),   // id ko body me bhejna
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const view_department_users = createAsyncThunk(
  "department/viewUsers",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/departmentrouter/filterdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: body.id }) // <-- yaha body se id nikalni hai
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);




export default { create_department: [Function], get_Deparment: [Function], delete_department: [Function], view_department_users: [Function] }
