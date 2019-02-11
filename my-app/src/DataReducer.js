const FETCH_DATA_BEGINNING = "FETCH_DATA_BEGINNING";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

const fetchDataBeginning = () => ({
  type: FETCH_DATA_BEGINNING
})
const fetchDataSuccess = events => ({
  type: ACTION_FETCH_DATA_SUCCESS,
  events
})
const fetchDataFailure = error => ({
  type: ACTION_FETCH_DATA_FAILURE,
  error
})

const defaultState = {
  loading: false,
  events: {},
  error: ""
}

const dataReducer = (state = defaultState, action) {
  switch(action.type) {
    case FETCH_DATA_BEGINNING:
      return {
        ...state,
        loading: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        events
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error
      };
    default:
      return state;
  }
}
