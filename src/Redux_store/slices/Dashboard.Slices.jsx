import { createSlice } from "@reduxjs/toolkit"; // yeh path tumhare actual thunk file ka hona chahiye
import { Employesss } from "../Api/Dashboard.Api";

const initialState = {
    employees: [],
    loading: false,
    error: null
};

const EmployessSlices = createSlice({
    name: "Employesss",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default EmployessSlices.reducer;
