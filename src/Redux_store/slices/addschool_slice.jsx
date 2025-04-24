import { createSlice } from "@reduxjs/toolkit"
import { get_school, updateSchoolInfo } from "../Api/School_image"


const school_slice = createSlice({
    name: 'schools',
    initialState: {
        school: [],
        loading: false,
        error: null,
        searchdata: []
    },
    extraReducers: (builder) => {
        builder
            // get school
            .addCase(get_school.pending, (state) => {
                state.loading = true
            })
            .addCase(get_school.fulfilled, (state, action) => {
                state.loading = false,
                    state.school = action.payload
            })
            .addCase(get_school.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })


            // update schoolinfo 
            .addCase(updateSchoolInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSchoolInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.school = action.payload;
            })
            .addCase(updateSchoolInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }

})
export default school_slice.reducer