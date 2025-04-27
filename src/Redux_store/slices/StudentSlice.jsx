import { createSlice } from "@reduxjs/toolkit";
import {
  addStudent,
  addStudentsExcel,
  getSingleStudent,
  getStudentRecipients,
  getStudents,
  updateStudentsRt,
  updateStudentStatus,
} from "../Api/StudentsApiStore";

const initialState = {
  students: [], // List of students from getStudents
  recipients: [], // Data from studentRecipients
  loading: false, // Loading state for API calls
  error: null, // Error message if an API call fails
  total: 0, // Total number of students (for pagination)
  currentPage: 1, // Current page for pagination
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Students
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students || []; // Adjust based on API response structure
        console.log(action.payload.students, "students");

        state.total = action.payload.total || 0; // Adjust based on API response structure
        state.currentPage = action.payload.currentPage || 1; // Adjust based on API response structure
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch students";
      });

    // Add Students (Single)
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload.student); // Adjust based on API response structure
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add student";
      });

    // Add Students via Excel
    builder
      .addCase(addStudentsExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudentsExcel.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update students list if API returns new students
        if (action.payload.students) {
          state.students = [...state.students, ...action.payload.students]; // Adjust based on API response structure
        }
      })
      .addCase(addStudentsExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to upload Excel file";
      });

    // Update Students
    builder
      .addCase(updateStudentsRt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentsRt.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload.student; // Adjust based on API response structure
        state.students = state.students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
      })
      .addCase(updateStudentsRt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update student";
      });

    // Update Student Status
    builder
      .addCase(updateStudentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload.student; // Adjust based on API response structure
        state.students = state.students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
      })
      .addCase(updateStudentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update student status";
      });

    // Student Recipients
    builder
      .addCase(getStudentRecipients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentRecipients.fulfilled, (state, action) => {
        state.loading = false;
        state.recipients = action.payload.recipients || []; // Adjust based on API response structure
      })
      .addCase(getStudentRecipients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch student recipients";
      });

    builder
      .addCase(getSingleStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.singleStudent = action.payload.student || null; // Adjust based on API response structure
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch single student";
      });
  },
});

export const { resetError } = studentSlice.actions;
export default studentSlice.reducer;
