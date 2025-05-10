import { createAsyncThunk } from "@reduxjs/toolkit"
const BASE_URL = import.meta.env.VITE_BASE_URL


////Get_Employee
export const GetExStudent = createAsyncThunk(
  'GetExStudent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/student/inactive-students`, {
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

export default GetExStudent;