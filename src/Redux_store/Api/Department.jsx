// src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
import { createAsyncThunk } from '@reduxjs/toolkit'
import { data } from 'react-router'
const BASE_URL = import.meta.env.VITE_BASE_URL

////Create Department
export const create_department = createAsyncThunk(
  'create_department',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/departmentrouter/adddepartment`, {
        method: "Post",
        headers: {
          "content-type": "Application/json"
        },
        body: jSON.stringify(data)
      });
      const result = await response.json()
      // console.log(result, "****************************************");

      return result;

    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Unknown error" })
    }
  }
)

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
export const delete_department = createAsyncThunk('delete_department', async(id,{rejectWithValue})=>{
  try {
    const response = await fetch(`${BASE_URL}/api/v1/departmentrouter/deleteDepartment${id}`,{
      method:"DELETE",

    })
    const result = await response.json();
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})

export default {create_department:[Function],get_Deparment:[Function],delete_department:[Function]}
