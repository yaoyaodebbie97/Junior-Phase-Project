import axios from 'axios'
// action types 
const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT'

// action creators 
export const setSingleStudent = (student) => ({
  type: SET_SINGLE_STUDENT,
  student
});

export const fetchSingleStudent = (id) => async (dispatch) =>{
  const {data} = await axios.get(`/api/students/${id}`)
  dispatch(setSingleStudent(data));
}
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = {}

const singleStudentReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_SINGLE_STUDENT: 
      return action.student
    default:
      return state
  }
}

export default singleStudentReducer