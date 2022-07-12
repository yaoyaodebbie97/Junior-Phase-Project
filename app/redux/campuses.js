import axios from 'axios'
// action types 
const SET_CAMPUSES = 'SET_CAMPUSES'

// action creators 
export const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
});

export const fetchCampuses = () => async (dispatch) =>{
  const {data} = await axios.get('/api/campuses')
  dispatch(setCampuses(data));
}
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = []

const campusesReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_CAMPUSES: 
      return action.campuses
    default:
      return state
  }
}

export default campusesReducer