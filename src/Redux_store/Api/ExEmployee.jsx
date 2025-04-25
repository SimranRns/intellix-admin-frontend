import { createAsyncThunk } from "@reduxjs/toolkit"
const BASE_URL = import.meta.env.VITE_BASE_URL


////Get_Employee
export const get_ExEmployee = createAsyncThunk(
    'get_ExEmployee',
    async ({first_name}, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/employee/searchInActiveEmployee?first_name=${first_name}&page=1&limit=200`, {
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

  
  //Update_employee
  export const UpdateEmployee = createAsyncThunk("UpdateEmployee", async (data, { rejectWithValue }) => {
    console.log("UpdateEmployee", data);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/updateEmployeeStatus/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

  export default {get_ExEmployee,UpdateEmployee};