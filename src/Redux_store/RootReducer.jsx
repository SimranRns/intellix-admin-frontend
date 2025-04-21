import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
// import StudentReducer from './slices/Student_AddStudent'
import  StudentSliceReducer from './slices/Student_AddStudent'

const RootReducer = combineReducers({
team: teamReducer,
student:StudentSliceReducer
})

export default RootReducer
