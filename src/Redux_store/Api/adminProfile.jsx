// src/redux/Api/adminProfile.js
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

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

export const change_admin_password = createAsyncThunk(
  "change_admin_password",
  async (
    { id, new_password, confirm_password, current_password },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/admin/password/change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          data: {
            new_password,
            confirm_password,
            current_password,
          },
        }),
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

export default { view_admin_profile, change_admin_password };
