import axios from 'axios'
// action types 
const SET_CAMPUSES = 'SET_CAMPUSES'
const CREATE_CAMPUS = 'CREATE_CAMPUS'

// action creators 
export const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
});
const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  };
};



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

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = []

const campusesReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_CAMPUSES: 
      return action.campuses
    case CREATE_CAMPUS: 
      return [...state, action.campus]
    default:
      return state
  }
}

export default campusesReducer