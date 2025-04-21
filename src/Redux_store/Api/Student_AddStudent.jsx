import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const GetStudent = createAsyncThunk(
  'getStudent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/student/allStudents?status=&session_id=&enrollment_id=&serial_no=&name=&father_name=&limit=2&page=1`, {
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

export default GetStudent