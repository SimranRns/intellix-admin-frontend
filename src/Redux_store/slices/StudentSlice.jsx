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
  students: [],
  updateStudentStatus:{}, // List of students from getStudents
  recipients: [], // Data from studentRecipients
  singleStudent: null, // Single student data
  loading: false, // Loading state for API calls
  error: null, // Error message if an API call fails
  total: 0, // Total number of students (for pagination)
  currentPage: 1, // Current page for pagination
  newStudent: {
    // Global state for adding a new student across multiple pages
    course_id: null,
    batch_id: null,
    name: "",
    address: "",
    adhar_no: "",
    contact_no: "",
    father_name: "",
    mother_name: "",
    dob: "",
    gender: "",
  },
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    // Reducer to update newStudent fields incrementally
    updateNewStudent: (state, action) => {
      state.newStudent = {
        ...state.newStudent,
        ...action.payload, // Merge new fields with existing newStudent data
      };
    },
    // Reducer to reset newStudent after submission or cancellation
    resetNewStudent: (state) => {
      state.newStudent = {
        course_id: null,
        batch_id: null,
        name: "",
        address: "",
        adhar_no: "",
        contact_no: "",
        father_name: "",
        mother_name: "",
        dob: "",
        gender: "",
      };
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
        state.students = action.payload.students || [];
        state.total = action.payload.total || 0;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch students";
      });

    // Add Student (Single)
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload.student);
        // Reset newStudent after successful addition
        state.newStudent = {
          course_id: null,
          batch_id: null,
          name: "",
          address: "",
          adhar_no: "",
          contact_no: "",
          father_name: "",
          mother_name: "",
          dob: "",
          gender: "",
        };
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
        if (action.payload.students) {
          state.students = [...state.students, ...action.payload.students];
        }
      })
      .addCase(addStudentsExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to upload Excel file";
      });

    // Update Student
    builder
      .addCase(updateStudentsRt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentsRt.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload.student;
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
        const updatedStudent = action.payload.student;
        state.students = state.students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
      })
      .addCase(updateStudentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update student status";
      });

    // Get Student Recipients
    builder
      .addCase(getStudentRecipients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentRecipients.fulfilled, (state, action) => {
        state.loading = false;
        state.recipients = action.payload.recipients || [];
      })
      .addCase(getStudentRecipients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch student recipients";
      });

    // Get Single Student
    builder
      .addCase(getSingleStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.singleStudent = action.payload.student || null;
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch single student";
      });
  },
});

export const { resetError, updateNewStudent, resetNewStudent } = studentSlice.actions;
export default studentSlice.reducer;