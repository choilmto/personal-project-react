const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
})
export const fetchDataSuccess = events => ({
  type: FETCH_DATA_SUCCESS,
  events
})
export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  error
})

const defaultState = {
  loading: false,
  events: {},
  error: ""
}

export const dataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.events
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
