import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = import.meta.env.VITE_BASE_URL


// Add subject
export const Add_subject = createAsyncThunk(
    "Add_subject",
    async (data, { rejectWithValue }) => {
        try {
            console.log(" Sending subject payload:", data);

            const response = await fetch(`${BASE_URL}/api/v1/subjectrouter/addsubject`, {
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
export const get_subject = createAsyncThunk(
    "get_subject",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/subjectrouter/getallsubjectcontroller`, {
                method: "GET",
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("API Error:", result);
                return rejectWithValue(result);
            }

            return result.data; // ✅ Sirf data return karo (array of subjects)
        } catch (error) {
            console.error("Request Failed:", error);
            return rejectWithValue(error.message);
        }
    }
);

// update

export const update_Subject = createAsyncThunk(
    'subject/update',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/v1/subjectrouter/updatebysubjectnamecontroller`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update subject');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export default { Add_subject, get_subject, update_Subject };
