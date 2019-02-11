const FETCH_USERNAME_BEGIN = "FETCH_USERNAME_BEGIN";
const FETCH_USERNAME_SUCCESS = "FETCH_USERNAME_SUCCESS";
const FETCH_USERNAME_FAILURE = "FETCH_USERNAME_FAILURE";

const fetchUsernameBegin = () => ({type: FETCH_USERNAME_BEGIN})

const fetchUsernameSuccess = (username) => ({
  type: FETCH_USERNAME_SUCCESS,
  username
})

const fetchUsernameFailure = (error) => ({
  type: FETCH_USERNAME_FAILURE,
  error
})

const defaultState = {
  username: "",
  error: null,
  loading: false
}

const fetchUsernameReducer = (state = defaultState, action) {
  switch(action.type) {
    case FETCH_USERNAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERNAME_SUCCESS:
      return {
        loading: false,
        username: action.username
      };
    case FETCH_USERNAME_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
