import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
import DepartmentReducer from './slices/Department'
import ExEmployeeReducer from './slices/ExEmployee'

const RootReducer = combineReducers({
    team: teamReducer,
    Department : DepartmentReducer,
    ExEmployee : ExEmployeeReducer
})

export default RootReducer
