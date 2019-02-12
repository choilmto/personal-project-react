import {combineReducers} from 'redux';
import {selectionReducer} from './SelectionReducerAndActions';
import {dataReducer} from './DataReducerAndActions';
import {usernameReducer} from './UsernameReducerAndActions';

export const rootReducer = combineReducers ({
  display: selectionReducer,
  user: usernameReducer,
  data: dataReducer
})
