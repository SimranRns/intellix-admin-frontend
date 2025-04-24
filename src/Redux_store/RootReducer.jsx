import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './slices/Team'
import course_sliceReducer from './slices/Add_course'
import banner_sliceReducer from './slices/Banner_slice'
import school_sliceReducer from './slices/addschool_slice'
import notify_sliceReducer from './slices/Notification.jsx'
import attendance_sliceReducer from './slices/Attendance.jsx'
const RootReducer = combineReducers({
    team: teamReducer,
    banner: banner_sliceReducer,
    schools: school_sliceReducer,
    courses: course_sliceReducer,
    notify: notify_sliceReducer,
    attend: attendance_sliceReducer


})

export default RootReducer 
