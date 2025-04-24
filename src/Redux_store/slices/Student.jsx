import { createSlice } from "@reduxjs/toolkit";
import GetStudent from "../Api/Student";



const initialState = {
  get_student: {
    students: [],  
    total: 0,
  },
  loading: false,
  error: null,
};

 const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetStudent.fulfilled, (state, action) => {
  state.loading = false;
  state.get_student.students = action.payload.students;
  state.get_student.total = action.payload.students.pagination.totalItems;
})

      .addCase(GetStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch students";
      });
  },
});

export default studentSlice.reducer;