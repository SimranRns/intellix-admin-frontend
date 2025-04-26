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
export const Emi = createAsyncThunk('getemi', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://adminv2-api-dev.intellix360.in/api/v1/Desboardservice/emicontroller`, {
            method: 'GET'
        }); 
        // console.log("API Response Data:", await response.json());
        // console.log(" Response status:", response.status);
        if (!response.ok) {
            const errorData = await response.json(); 
            return rejectWithValue(errorData);
        }
        
        const result = await response.json();
        // console.log("result : :",result)
        return result;
        
    } catch (error) {
        console.log("🔥 Catch Error:", error);
        return rejectWithValue(error);
    }
});

// ✅ 4. Students Attendance API
export const StudentsAttendance = createAsyncThunk('getStudentsAttendance', async (_, { rejectWithValue }) => {
    try {
        console.log(" Calling EMI API...");
        const response = await fetch(`https://adminv2-api-dev.intellix360.in/api/v1/Desboardservice/studentsAttendancecontroller`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        console.log("DATA DATA :  :" , result);
        
        return result;

    } catch (error) {
        return rejectWithValue(error);
    }
});


export default { Employesss, Department, Emi, StudentsAttendance };
