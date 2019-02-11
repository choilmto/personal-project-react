import { eventFilter } from './AppProps';

const CHANGE_DISPLAY_GITHUB_EVENT = "CHANGE_DISPLAY_GITHUB_EVENT";

try {
  const defaultState = {
    selection: eventFilter[0].githubEventName
  }
} catch (err) {
  console.error("eventFilter is an empty array.", err);
}

const setSelection = (selection) => ({
  type: CHANGE_DISPLAY_GITHUB_EVENT,
  selection
})

const selectionReducer = (state = defaultState, action) {
  if(action.type === CHANGE_DISPLAY_GITHUB_EVENT) {
    return {
      ...state,
      selection: action.selection
    };
  }
  return state;
}
