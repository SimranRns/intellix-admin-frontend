// src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL

///Create Employee
export const create_employee = createAsyncThunk(
  "create_employee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        
        return rejectWithValue(result);
      }

      return result; 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//////Get Teacher
export const GetTeam = createAsyncThunk(
  'getTeam',
  async ({ first_name, joining_date }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/search?first_name=${first_name}&joining_date=${joining_date}&page=1&limit=200`, {
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

//update_Employee_Status

export const update_Employee_Status = createAsyncThunk(
  'update_Employee_Status',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/employee/updateEmployeeStatus/${data.id}`, {
        method: "PUT",
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


//update_time 
export const Update_Time = createAsyncThunk("Update_Time", async (data, { rejectWithValue }) => {
  try {
    const { id, ...rest } = data; 

    const response = await fetch(`${BASE_URL}/api/v1/employee/updateTime/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(rest) 
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});
//Update_Employeee
export const Update_Employee = createAsyncThunk("employee/update", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/employee/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue(result);
    }
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});





export default {
  GetTeam, create_employee, update_Employee_Status, Update_Time,Update_Employee
}
