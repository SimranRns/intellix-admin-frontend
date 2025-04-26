// ✅ NO default export, only named exports
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const changestatusLeads = createAsyncThunk(
  "changestatusLeads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/leadsrouter/changestatusLeadsController`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// ✅ export getallLeads if needed
export const getallLeads = createAsyncThunk(
  "getLeads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/leadsrouter/getallLeadscontroller`,
        {
          method: "GET",
        }
      );  

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      // console.log("result : : ", result);

      return result.data.updatedData;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const AddLeads = createAsyncThunk(
  "addLeads",
  async (getPayload, { rejectWithValue }) => {
    try {
      console.log(getPayload); // Check payload before making API call
      const response = await fetch(
        `${BASE_URL}/api/v1/leadsrouter/addleadscontroller`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getPayload),
        }
      );
      console.log(response,"i am the response")
      

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result.data.updatedData;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);


// searchingleads
export const searchingleads = createAsyncThunk(
  "leads/search",
  async (payload, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const cleanPayload = {
        ...payload,
      };

      const raw = JSON.stringify(cleanPayload);

      const response = await fetch(
        `${BASE_URL}/api/v1/leadsrouter/searchingleadsController`,
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result.data.updatedData; // adjust if backend response differs
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  } 
);


