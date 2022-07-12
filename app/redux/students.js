import axios from 'axios'
// action types 
const SET_STUDENTS = 'SET_STUDENTS'

// action creators 
export const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});


export const fetchStudents = () => async (dispatch) =>{
  const {data} = await axios.get('/api/students')
  dispatch(setStudents(data));
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = [] 
const studentsReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_STUDENTS: 
      return action.students
    default:
      return state
  }
}

export default studentsReducer