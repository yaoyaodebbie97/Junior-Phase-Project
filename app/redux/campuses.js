import axios from 'axios'
// action types 
const SET_CAMPUSES = 'SET_CAMPUSES'
const CREATE_CAMPUS = 'CREATE_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'

// action creators 
const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
});
const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  };
};
const _deleteCampus = (campus) => {
  return {
    type: DELETE_CAMPUS,
    campus
  };
};

// Thunk creators 
export const fetchCampuses = () => async (dispatch) =>{
  const {data} = await axios.get('/api/campuses')
  dispatch(setCampuses(data));
}
export const createCampus = (campus) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/campuses', campus);
    dispatch(_createCampus(data));
  };
};
export const deleteCampus = (id) => {
  return async (dispatch) => {
    const {data} = await axios.delete(`/api/campuses/${id}`);
    dispatch(_deleteCampus(data));
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = []

const campusesReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_CAMPUSES: 
      return action.campuses
    case CREATE_CAMPUS: 
      return [...state, action.campus]
    case DELETE_CAMPUS: 
      return state.filter((campus) => campus.id !== action.campus.id)
    default:
      return state
  }
}

export default campusesReducer