import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
import  StudentSliceReducer from './slices/Student'
import ExstudentSliceReducer from './slices/Student_ExStudent'
import loginSliceReducer from './slices/Login_Admin'

const RootReducer = combineReducers({
team: teamReducer,
student:StudentSliceReducer,
Exstudent:ExstudentSliceReducer,
login: loginSliceReducer
})

export default RootReducer
