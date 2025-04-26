import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addEmis = createAsyncThunk(
  "emi/addEmis",
  async (emiData, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(emiData);

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

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getEmis = createAsyncThunk(
  'getEmis',
  async ({ filter, month, year }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      };

      const response = await fetch(
        `${BASE_URL}/api/v1/emi/getEmis?filter=${filter}&month=${month}&year=${year}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch EMIs');
      }
      console.log(result, "result from getEmis");
      
      return result; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const getEmisTotalAmounts = createAsyncThunk(
  "getEmisTotalAmounts",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const url = new URL(`${BASE_URL}/api/v1/emi/getEmisTotalAmounts`);
      url.searchParams.append("month", month);
      url.searchParams.append("year", year);

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch EMI total amounts");
      }
   console.log(result,"jfdsxcvbnm");

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const addOneShotEmis = createAsyncThunk(
  "emi/addOneShotEmis",
  async (emiData, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        student_id: emiData.student_id,
        amount: emiData.amount,
        emi_discount: emiData.emi_discount || 0,
        emi_duedate: emiData.due_date,
        remark: emiData.remark,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${BASE_URL}/api/v1/emi/addOneShotEmi`,
        requestOptions
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add one-shot EMI");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);