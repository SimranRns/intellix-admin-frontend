import { createSlice } from "@reduxjs/toolkit";
import GetExStudent from "../Api/Student_ExStudent";
// import GetExStudent from "../Api/Student_AddStudent";


const initialState = {
  get_Exstudent: {
    students: [],  
    total: 0,
  },
  loading: false,
  error: null,
};

 const ExstudentSlice = createSlice({
  name: 'Exstudent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetExStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetExStudent.fulfilled, (state, action) => {
  state.loading = false;
  state.get_Exstudent.students = action.payload.students;
  state.get_Exstudent.total = action.payload.totalRecords;
})

      .addCase(GetExStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch students";
      });
  },
});

export default ExstudentSlice.reducer;