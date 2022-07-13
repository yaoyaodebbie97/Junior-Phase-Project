import axios from 'axios'
// action types 
const SET_STUDENTS = 'SET_STUDENTS'
const CREATE_STUDENT = 'CREATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'


// action creators 
export const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});
const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  };
};
const _deleteStudent= (student) => {
  return {
    type: DELETE_STUDENT,
    student
  };
};

// thunk creators 
export const fetchStudents = () => async (dispatch) =>{
  const {data} = await axios.get('/api/students')
  dispatch(setStudents(data));
}
export const createStudent = (student) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/students', student);
    dispatch(_createStudent(data));
  };
};
export const deleteStudent = (id) => {
  return async (dispatch) => {
    const {data} = await axios.delete(`/api/students/${id}`);
    dispatch(_deleteStudent(data));
  };
};
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = [] 
const studentsReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_STUDENTS: 
      return action.students
    case CREATE_STUDENT: 
      return [...state, action.student]
    case DELETE_STUDENT: 
      return state.filter((student) => student.id !== action.student.id)
    default:
      return state
  }
}

export default studentsReducer