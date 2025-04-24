import { createSlice } from "@reduxjs/toolkit"
import {get_course,add_course } from "../Api/Add_popular_course"

const course_slice = createSlice({
    name: 'courses',
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
            // add course

            .addCase(add_course.pending, (state) => {
                state.loading = true
            })
            .addCase(add_course.fulfilled, (state, action) => {
                state.loading = false,
                    state.course.push(action.payload)
            })
            .addCase(add_course.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})
export default course_slice.reducer