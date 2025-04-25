// src/redux/Api/adminProfile.js
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

//get_admin
export const view_admin_profile = createAsyncThunk(
  "view_admin_profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/admin/profile/view`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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


//update_admin_profile
export const Update_Admin = createAsyncThunk("Update_Admin", async (data, { rejectWithValue }) => {
  console.log("Update_Admin", data);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/admin/update`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle API errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const result = await response.json();
    return result; // Successful response, return the result
  } catch (error) {
    // Handle both network errors and thrown errors
    console.error("Error updating admin:", error);
    return rejectWithValue(error.message || error);
  }
});

