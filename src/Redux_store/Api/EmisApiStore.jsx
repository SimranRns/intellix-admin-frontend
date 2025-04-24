// src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addEmis = createAsyncThunk(
  "addEmis",
  async (emiData, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(emiData); // Use dynamic emiData

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${BASE_URL}/api/v1/emi/addEmi`,
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add EMI");
      }

      return result; // Return the API response
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getEmis = createAsyncThunk(
  "getEmis",
  async ({ filter, month, year }, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}/api/v1/emi/getEmis?filter=${filter}&month=${month}&year=${year}`;
      console.log("Fetching URL:", url);

      const requestOptions = {
        method: "Post", // Changed to GET for query parameters
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch EMIs");
      }

      const result = await response.json();
      console.log("API Result:", result);

      return result; // Ensure result has { missed, upcoming, paid, summary }
    } catch (error) {
      console.error("getEmis error:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const addOneShotEmis = createAsyncThunk(
  'addOneShotEmis',
  async (emiData, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      // Use dynamic emiData instead of hardcoded values
      const raw = JSON.stringify({
        student_id: emiData.student_id,
        amount: emiData.amount,
        emi_discount: emiData.emi_discount || 0,
        emi_duedate: emiData.due_date,
        remark: emiData.remark,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:4000/api/v1/emi/addOneShotEmi', requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add one-shot EMI');
      }

      console.log('addOneShotEmis result:', result);
      return result; // Return the API response (e.g., the added EMI object)
    } catch (error) {
      console.error('addOneShotEmis error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);