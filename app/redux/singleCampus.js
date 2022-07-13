import axios from 'axios'
// action types 
const SET_SINGLE_CAMPUS = 'SET_SINGLE_CAMPUS'

// action creators 
export const setSingleCampus = (campus) => ({
  type: SET_SINGLE_CAMPUS,
  campus
});

export const fetchSingleCampus = (id) => async (dispatch) =>{
  const {data} = await axios.get(`/api/campuses/${id}`)
  dispatch(setSingleCampus(data));
}
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = {}

const singleCampusReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_SINGLE_CAMPUS: 
      return action.campus
    default:
      return state
  }
}

export default singleCampusReducer