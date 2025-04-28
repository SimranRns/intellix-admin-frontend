import { createAsyncThunk } from "@reduxjs/toolkit"

const BASE_URL = import.meta.env.VITE_BASE_URL
// get course
export const get_course = createAsyncThunk('getcourse', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${BASE_URL}/api/v1/coursesrouter/getallcoursescontroller`, {
            method: 'GET'
        })
        if (!responce.ok) {
            const errordata = responce.json()
            return rejectWithValue(errordata)
        }
        const result = await responce.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
// add course
export const add_course = createAsyncThunk('addcourse', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${BASE_URL}/api/v1/coursesrouter/addcourse`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!responce.ok) {
            const errordata = responce.json()
            return rejectWithValue(errordata)
        }
        const result = await responce.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})
// update course
export const update_course = createAsyncThunk('data', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${BASE_URL}/api/v1/coursesrouter/updatecoursescontroller`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!responce.ok) {
            const errordata = responce.json()
            return rejectWithValue(errordata)
        }
        const result = await responce.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})


// search 
export const searchCoursesByName = createAsyncThunk(
    'courses/searchByName',
    async (courseName, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/coursesrouter/Searchbycoursesnamecontroller`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course_name: courseName }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch courses');
            }

            return data.data; // Return the courses data
        } catch (error) {
            return rejectWithValue(error.message); // In case of an error, return the error message
        }
    }
);

export default { get_course, add_course, update_course, searchCoursesByName }