import axios from 'axios'
// action types 
const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS' // update campus should be on single campus 
const REMOVE_STUDENT = 'REMOVE_STUDENT'

// action creators 
export const setSingleCampus = (campus) => ({
  type: SET_SINGLE_CAMPUS,
  campus
});

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  };
};

const _removeStudent = (campus) =>{
  return {
    type: REMOVE_STUDENT,
    campus
  }
}



// thunk creators 
export const fetchSingleCampus = (id) => async (dispatch) =>{
  const {data} = await axios.get(`/api/campuses/${id}`)
  dispatch(setSingleCampus(data));
}

export const updateCampus = (campus) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(_updateCampus(data));
  };
};

export const removeStudent = (campus, student) =>{
  return async (dispatch) =>{
    const {data} = await axios.get(`/api/campuses/${campus.id}/${student.id}`)
    dispatch(_removeStudent(data))
  }

}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = {}


const singleCampusReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_SINGLE_CAMPUS: 
      return action.campus
    case UPDATE_CAMPUS:
      return action.campus
    case REMOVE_STUDENT:
      return action.campus
    default:
      return state
  }
}

export default singleCampusReducer