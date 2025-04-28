import { createSlice } from "@reduxjs/toolkit"
import { get_course, add_course, update_course, searchCoursesByName } from "../Api/Academic_course"


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

            // search
            .addCase(searchCoursesByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchCoursesByName.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload; // Store the courses data in the state
            })
            .addCase(searchCoursesByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message in the state
            });
    }

})
export default acad_course_slice.reducer