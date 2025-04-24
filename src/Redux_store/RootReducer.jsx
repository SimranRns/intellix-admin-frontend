import { combineReducers } from '@reduxjs/toolkit';
// import {teamReducer} from './slices/Team';
import { LeadsSliceReducer } from './slices/Leads';
import { CategorySliceReducer } from './slices/CategorySlice';

const RootReducer = combineReducers({
  // team: teamReducer,  
  Leads: LeadsSliceReducer,
  Category: CategorySliceReducer,
});

export default RootReducer;
