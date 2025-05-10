import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL


// Add Batches
export const Add_Batches = createAsyncThunk(
    "Add_Batches",
    async (data, { rejectWithValue }) => {
        try {
            console.log(" Sending Batches payload:", data);

            const response = await fetch(`${BASE_URL}/api/v1/batchrouter/addbatch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(" API returned an error:", result);
                return rejectWithValue(result);
            }
            
            return result;
        } catch (error) {
            console.error(" Request failed:", error);
            return rejectWithValue(error);
        }
    }
);


// get api
export const get_Batches = createAsyncThunk(
    "get_Batches    ",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/batchrouter/getallbatchescontroller`, {
                method: "GET",
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("API Error:", result);
                return rejectWithValue(result);
            }

            return result.data;
        } catch (error) {
            console.error("Request Failed:", error);
            return rejectWithValue(error.message);
        }
    }
);
// update time 
export const update_time_Batches = createAsyncThunk(
    "update_Batches",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/batchrouter/timeupdate`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: data.id }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("API Error:", result);
                return rejectWithValue(result);
            }

            return result.data;
        } catch (error) {
            console.error("Request Failed:", error);
            return rejectWithValue(error.message);
        }
    }
);
// update batch

export const update_Batches = createAsyncThunk(
    "update_Batche",
    async (datas, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/batchrouter/batchupdate`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: datas.id }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("API Error:", result);
                return rejectWithValue(result);
            }

            return result.datas;
        } catch (error) {
            console.error("Request Failed:", error);
            return rejectWithValue(error.message);
        }
    }
);



export default { Add_Batches, get_Batches, update_time_Batches, update_Batches };
