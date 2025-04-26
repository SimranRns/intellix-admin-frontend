import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
import DepartmentReducer from './slices/Department'
import ExEmployeeReducer from './slices/ExEmployee'
import { LeadsSliceReducer } from './slices/Leads';
import { CategorySliceReducer } from './slices/CategorySlice';
import course_sliceReducer from './slices/Add_course'
import banner_sliceReducer from './slices/Banner_slice'
import school_sliceReducer from './slices/addschool_slice'
import notify_sliceReducer from './slices/Notification.jsx'
import attendance_sliceReducer from './slices/Attendance.jsx'
import loginSliceReducer from './slices/Login_Admin'
import { StatusSliceReducer } from './slices/FitterStatusSlice';
import head_yaer_sliceReducer from './slices/Header_session_slice'
import EmiReducers from './slices/EmisSlice'
import studentReducer from './slices/Student'
import adminProfileSliceReducer from "./slices/adminProfileSlice";
import SessionSliceReducer from './slices/SessionSlice'
import EmployessSlicesReducer from './slices/Dashboard.Slices'
import subject_sliceReducer from './slices/Subject_Slice'
import adminSliceReducer from "./slices/Logout_Admin"


const RootReducer = combineReducers({
    team: teamReducer,
    Department: DepartmentReducer,
    ExEmployee: ExEmployeeReducer,
    Leads: LeadsSliceReducer,
    Category: CategorySliceReducer,
    banner: banner_sliceReducer,
    schools: school_sliceReducer,
    courses: course_sliceReducer,
    notify: notify_sliceReducer,
    attend: attendance_sliceReducer,
    login: loginSliceReducer,
    Status: StatusSliceReducer,
    year: head_yaer_sliceReducer,
    emis: EmiReducers,
    students: studentReducer,
    adminProfile: adminProfileSliceReducer,
    Employesss:EmployessSlicesReducer,
    subj:subject_sliceReducer,
    logout: adminSliceReducer,
    Session:SessionSliceReducer
})



export default RootReducer;
