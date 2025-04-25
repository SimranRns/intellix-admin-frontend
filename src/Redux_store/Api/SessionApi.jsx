import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL

//create_Session
export const create_Session = createAsyncThunk(
  "create_Session",
  async (year, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/session/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(year),
      });

      const result = await response.json();

      if (!response.ok) {
        // If server returns 4xx/5xx response, treat it as an error
        return rejectWithValue(result.message || "Something went wrong");
      }

      return result;
    } catch (error) {
      // Only return a string or plain object to keep it serializable
      return rejectWithValue(error.message || "Network error");
    }
  }
);

  //Get_Session

 export const Get_Session = createAsyncThunk('Get_Session', async (_, { rejectWithValue }) => {
     try {
         const responce = await fetch(`${BASE_URL}/api/v1/session/get`, {
             method: 'GET'
         })
         if (!responce.ok) {
             const errordata = responce.json()
             return rejectWithValue(errordata)
         }
         const result = await responce.json()
         return result
     } catch (error) {
         return rejectWithValue(error)
     }
 })