import { createSlice } from "@reduxjs/toolkit";
import { Add_Batches, get_Batches } from "../Api/Batches";


const BatchesSlice = createSlice({
    name: 'Batch',
    initialState: {
        Batches: [],
        loading: false,
        error: null,
        searchdata: []
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_Batches.pending, (state) => {
            state.loading = true;
          })
          .addCase(get_Batches.fulfilled, (state, action) => {
            state.loading = false;
            state.Batches = action.payload; // make sure this is array
          })
          .addCase(get_Batches.rejected, (state) => {
            state.loading = false;
          })


            // add 
            .addCase(Add_Batches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Add_Batches.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects.push(action.payload);
            })
            .addCase(Add_Batches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


         


    }
});

export default BatchesSlice.reducer;
