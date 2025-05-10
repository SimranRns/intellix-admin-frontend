import { createAsyncThunk } from "@reduxjs/toolkit";



const BASE_URL = import.meta.env.VITE_BASE_URL

const loginAdmin = createAsyncThunk("admin/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({ email, password });

        const response = await fetch(`${BASE_URL}/api/v1/admin/login`, {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        return rejectWithValue(error.message || "Login failed");
    }
    
});

export default loginAdmin;


