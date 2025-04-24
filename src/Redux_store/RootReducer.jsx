import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
import EmiReducers from './slices/EmisSlice'
import studentReducer from './slices/StudentSlice'

const RootReducer = combineReducers({
team: teamReducer,
emis: EmiReducers,
// students: studentReducer, 
})

export default RootReducer
