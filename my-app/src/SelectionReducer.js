import { eventFilter } from './AppProps';

const CHANGE_DISPLAY_GITHUB_EVENT = "CHANGE_DISPLAY_GITHUB_EVENT";

let defaultState;
try {
   defaultState = {selection: eventFilter[0].githubEventName};
} catch (err) {
  console.error("eventFilter is an empty array.", err);
}

export const setSelection = (selection) => ({
  type: CHANGE_DISPLAY_GITHUB_EVENT,
  selection
})

export const selectionReducer = (state = defaultState, action) => {
  if(action.type === CHANGE_DISPLAY_GITHUB_EVENT) {
    return {
      ...state,
      selection: action.selection
    };
  }
  return state;
}
