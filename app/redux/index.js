import { combineReducers } from 'redux'
import campusesReducer from './campuses'
import studentsReducer from './students'
import singleCampusReducer from './singleCampus'
import singleStudentReducer from './singleStudent'


const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  singleCampus: singleCampusReducer,
  singleStudent: singleStudentReducer
})

export default appReducer
