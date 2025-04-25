import { createAsyncThunk } from "@reduxjs/toolkit"

const BASE_URL = import.meta.env.VITE_BASE_URL

// ✅ 1. Employees API
export const Employesss = createAsyncThunk('getcourse', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/Desboardservice/getallemployesss`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        // console.log("Employees Result:", result.data);
        return result.data;

    } catch (error) {
        return rejectWithValue(error);
    }
});


// ✅ 2. Department API
export const Department = createAsyncThunk('getdepartment', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/Desboardservice/Departmentcontroller`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error);
    }
});

export default { Employesss, Department };
