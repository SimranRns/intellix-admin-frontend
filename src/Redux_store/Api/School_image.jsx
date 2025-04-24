import { createAsyncThunk } from "@reduxjs/toolkit"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const get_school = createAsyncThunk(
    'get', async (_, { rejectWithValue }) => {
        try {
            const responce = await fetch(`${BASE_URL}/api/v1/schoolImage/get`, {
                method: 'GET'
            })
            if (!responce.ok) {
                const errordata = await responce.json()
                return rejectWithValue(errordata)
            }
            const data = await responce.json()
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
// update school
export const updateSchoolInfo = createAsyncThunk(
    'school',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/schoolImage/update`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update school info');
            }

            console.log(response,"***********************************************");
            return await response.json();
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);




export default { get_school, updateSchoolInfo } 