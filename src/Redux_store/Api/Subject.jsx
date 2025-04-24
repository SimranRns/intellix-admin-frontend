import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL

// get banner 
export const get_banner_api = createAsyncThunk('get_banner', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/banner/get`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(errorData)
        }

        const result = await response.json()
        // console.log("ff", result);

        return result
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong')
    }
}
)