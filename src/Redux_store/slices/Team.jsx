import { createSlice } from '@reduxjs/toolkit';
import { DeleteEmployee, GetTeam, create_employee } from '../Api/TeamApi';

const initialState = {
  Teachers: [],
  loading: false,
  error: null,
  Searchemployees: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.Searchemployees = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      //////Create
      .addCase(create_employee.pending, (state) => {
        state.loading = true;
      })
      .addCase(create_employee.fulfilled, (state, action) => {
        state.loading = false;
      
        // ✅ If action.payload is a single new employee
        state.Teachers.push(action.payload);
        console.log(payload,"*********************************************************************");
      })
      
      .addCase(create_employee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
        
      })

      //////Get
      .addCase(GetTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.Teachers = action.payload;
      })
      .addCase(GetTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      })

      //DeleteEmployee
      .addCase(DeleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(DeleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.ExEmployees = Array.isArray(action.payload) ? action.payload : [];
      })



      .addCase(DeleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });


  },
});

export default teamSlice.reducer;
export const { searchEmployee } = teamSlice.actions;
