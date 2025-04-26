import { createSlice } from '@reduxjs/toolkit';
import { GetTeam, Update_Employee, Update_Time, create_employee, getoneemployee, update_Employee_Status } from '../Api/TeamApi';

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
        state.Teachers.push(action.payload);
        console.log(action.payload, "*********************************************************************");
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
      .addCase(update_Employee_Status.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(update_Employee_Status.fulfilled, (state, action) => {
        state.loading = false;
        state.Teachers = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(update_Employee_Status.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // see profile of employee by single emp id 

      .addCase(getoneemployee.pending, (state) => {
        state.loading = true
      })
      .addCase(getoneemployee.fulfilled, (state, action) => {
        state.loading = false,
          state.profile = action.payload
      })
      .addCase(getoneemployee.rejected, (state, action) => {
        state.loading = false,
          state.error = action.payload
      })

      //Update_time
      .addCase(Update_Time.pending, (state) => {
        state.loading = true;
      })
      .addCase(Update_Time.fulfilled, (state, action) => {
        state.loading = false;
        state.Teachers = state.Teachers.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(Update_Time.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //Update_Employee
      .addCase(Update_Employee.pending, (state) => {
        state.loading = true;
        state.error = null; // clear previous errors
      })

      .addCase(Update_Employee.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.Teachers = state.Teachers.map((emp) =>
          emp.id === updated.id ? updated : emp
        );
      })
      .addCase(Update_Employee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default teamSlice.reducer;
export const { searchEmployee } = teamSlice.actions;
