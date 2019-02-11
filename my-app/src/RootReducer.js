import {combineReducers} from 'redux';
import {selectionReducer} from './SelectionReducer';
import {dataReducer} from './DataReducer';
import {usernameReducer} from './UsernameReducer';

export const rootReducer = combineReducers ({
  display: selectionReducer,
  user: usernameReducer,
  data: dataReducer
})
