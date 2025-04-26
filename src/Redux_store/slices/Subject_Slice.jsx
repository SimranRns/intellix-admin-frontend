import { createSlice } from "@reduxjs/toolkit";
import { Add_subject, get_subject, update_Subject } from "../Api/Subject";

const subject_slice = createSlice({
    name: 'subj',
    initialState: {
        subjects: [],
        loading: false,
        error: null,
        searchdata: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_subject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_subject.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload;
            })
            .addCase(get_subject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // add 
            .addCase(Add_subject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Add_subject.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects.push(action.payload);
            })
            .addCase(Add_subject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // update
            .addCase(update_Subject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(update_Subject.fulfilled, (state, action) => {
                state.loading = false;
                const updatedSubject = action.payload;
                const index = state.subjects.findIndex(sub => sub.id === updatedSubject.id);
                if (index !== -1) {
                    state.subjects[index] = updatedSubject;
                }
            })
            .addCase(update_Subject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
});

export default subject_slice.reducer;
