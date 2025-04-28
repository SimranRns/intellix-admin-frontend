import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getStudents = createAsyncThunk(
  "getStudents",
  async ({ limit, page, name = "" } = {}, { rejectWithValue }) => {
    try {
      // Construct query string dynamically
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        ...(name && { name }), // Include search param only if provided

      }).toString();
// console.log(queryParams);

      const url = `${BASE_URL}/api/v1/student/allStudents?${queryParams}`;

      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);

      // Check if response is OK (status 200-299)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      // Parse response as JSON
      const data = await response.json();
      console.log(data);
      return data; // Return the parsed data
    } catch (error) {
      // Reject with error message
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getSingleStudent = createAsyncThunk(
  "getSingleStudent",
  async ({ id }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      const response = await fetch(`${BASE_URL}/api/v1/student/singleStudent/${id}`, requestOptions);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();  // json() parse karo
      console.log(result , "single student data"); // Debugging line to check the result
      
      return result; // Ab ye proper data return hoga
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);


export const addStudentsExcel = createAsyncThunk(
  "students/addStudentsExcel",
  async ({ file, batch_id, course_id }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("batch_id", batch_id);
      formData.append("course_id", course_id);

      const response = await fetch(`${BASE_URL}/api/v1/student/uploadexcel`, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upload excel");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/student/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
        redirect: "follow",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add student");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateStudentsRt = createAsyncThunk(
  "students/updateStudentsRt",
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/student/updateStudentrt`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
          redirect: "follow",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update students");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const updateStudentStatus = createAsyncThunk(
  "students/updateStudentStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/student/updateStudentStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          redirect: "follow",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update student status");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getStudentRecipients = createAsyncThunk(
  "students/getStudentRecipients",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/receipt/generate/${id}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch recipients");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
