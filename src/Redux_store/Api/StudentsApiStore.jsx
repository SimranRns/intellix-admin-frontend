// // src/redux/commonApis/getTeam.js (or wherever you keep common API logic)
// import { createAsyncThunk } from '@reduxjs/toolkit'

// const BASE_URL = import.meta.env.VITE_BASE_URL

// export const GetStudents = createAsyncThunk(
//   'getStudents',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/v1/employee/get`, {
//         method: 'GET',


//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         return rejectWithValue(errorData)
//       }

//       const result = await response.json()
//       return result
//     } catch (error) {
//       return rejectWithValue(error.message || 'Something went wrong')
//     }
//   }
// );


// export const addEmis = createAsyncThunk(
//   "addStudentsExcel",
//   async (_, { rejectWithValue }) => {
//     try {
//         const formdata = new FormData();
//         formdata.append("file", fileInput.files[0], "/C:/Users/rajat singh/Downloads/final_excelxlsx1.xlsx");
//         formdata.append("batch_id", "1");
//         formdata.append("course_id", "1");
        
//         const requestOptions = {
//           method: "POST",
//           body: formdata,
//           redirect: "follow"
//         };
        
//         fetch("https://adminv2-api-dev.intellix360.in/api/v1/student/uploadexcel", requestOptions)
//           .then((response) => response.text())
//           .then((result) => console.log(result))
//           .catch((error) => console.error(error));
//     } catch (error) {
//       return rejectWithValue(error.message || "Something went wrong");
//     }
//   }
// );

