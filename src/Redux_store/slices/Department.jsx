import { createSlice } from '@reduxjs/toolkit';
import { get_Deparment, create_department, delete_department, view_department_users } from '../Api/Department';



const DepartmentSlice = createSlice({
  name: 'Department',
  initialState: {
    Department: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      //Create
      .addCase(create_department.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create_department.fulfilled, (state, action) => {
        state.loading = false
        state.Department = action.payload?.data || [];
      })
      .addCase(create_department.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      })

      //Get
      .addCase(get_Deparment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_Deparment.fulfilled, (state, action) => {
        state.loading = false;
        state.Department = action.payload;  // Assuming the data you get from the API is stored in 'payload'
      })
      .addCase(get_Deparment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      })


      //Delete
      .addCase(delete_department.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delete_department.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(delete_department.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      // view users in departement 
      .addCase(view_department_users.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    builder
      .addCase(view_department_users.fulfilled, (state, action) => {
        state.Department = action.payload.data.employesdata;
        // employesdata me list hai employees ki
      })

      .addCase(view_department_users.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
  },
});

export default DepartmentSlice.reducer;
