import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'

const RootReducer = combineReducers({
team: teamReducer
})

export default RootReducer
