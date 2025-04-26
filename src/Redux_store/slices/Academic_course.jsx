import { createSlice } from "@reduxjs/toolkit"
import { get_course, add_course, update_course } from "../Api/Academic_course"


const acad_course_slice = createSlice({
    name: 'acad_courses',
    initialState: {
        course: [],
        loading: false,
        error: null,
        searchdata: []
    },
    extraReducers: (builder) => {
        builder
            // get course
            .addCase(get_course.pending, (state) => {
                state.loading = true
            })
            .addCase(get_course.fulfilled, (state, action) => {
                state.loading = false,
                    state.course = action.payload
            })
            .addCase(get_course.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            // add 
            .addCase(add_course.pending, (state) => {
                state.loading = true
            })
            .addCase(add_course.fulfilled, (state, action) => {
                state.loading = false,
                    state.course = action.payload

            })
            .addCase(add_course.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            
            // update
            .addCase(update_course.pending, (state) => {
                state.loading = true
            })
            .addCase(update_course.fulfilled, (state, action) => {
                state.loading = false,
                    state.course = action.payload
            })
            .addCase(update_course.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }

})
export default acad_course_slice.reducer