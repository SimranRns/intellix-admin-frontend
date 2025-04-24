import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
import DepartmentReducer from './slices/Department'
import ExEmployeeReducer from './slices/ExEmployee'
import { LeadsSliceReducer } from './slices/Leads';
import { CategorySliceReducer } from './slices/CategorySlice';
const RootReducer = combineReducers({
    team: teamReducer,
    Department : DepartmentReducer,
    ExEmployee : ExEmployeeReducer,
    Leads: LeadsSliceReducer,
  Category: CategorySliceReducer,
})



export default RootReducer;
