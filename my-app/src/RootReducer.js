import {combineReducers} from 'redux';
import {selectionReducer} from './SelectionReducerAndActions';
import {dataReducer} from './DataReducerAndActions';
import {usernameReducer} from './UsernameReducerAndActions';

const USER_LOGOUT = 'USER_LOGOUT';

export const logout = () => ({type: USER_LOGOUT})

const appReducer = combineReducers({
  display: selectionReducer,
  user: usernameReducer,
  data: dataReducer
})

export const rootReducer = (state, action) => {
 if (action.type === USER_LOGOUT) {
   state = undefined;
 }

 return appReducer(state, action)
}
