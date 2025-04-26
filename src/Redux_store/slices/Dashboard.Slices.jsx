import { createSlice } from "@reduxjs/toolkit";
import { Employesss, Department, Emi  } from "../Api/Dashboard.Api";

const initialState = {
    employees: {},
    departments: [],
    emi: {},    
    loading: false,
    error: null
};

const EmployessSlices = createSlice({
    name: "Employesss",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Employees API Cases
            .addCase(Employesss.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Employesss.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(Employesss.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })

            // ✅ Department API Cases
            .addCase(Department.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Department.fulfilled, (state, action) => {
                // console.log("data",action.payload);
                
                state.loading = false;
                state.departments = action.payload;
            })
            .addCase(Department.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })

            .addCase(Emi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Emi.fulfilled, (state, action) => {
                console.log("daa"); 
                console.log("RRRAAAAAMMM : : :",action.payload)
                state.loading = false;
                state.emi = action.payload;
            })
            .addCase(Emi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default EmployessSlices.reducer;
