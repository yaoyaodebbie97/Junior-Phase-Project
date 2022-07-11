import { combineReducers } from 'redux'
import campusesReducer from './campuses'
import studentsReducer from './students'

const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer
})

export default appReducer
