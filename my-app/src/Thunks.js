import { eventFilter, getReduceCallback, token } from './AppProps';
import { fetchDataBegin, fetchDataSuccess, fetchDataFailure } from './DataReducerAndActions';
import { fetchUsernameBegin, fetchUsernameSuccess, fetchUsernameFailure } from './UsernameReducerAndActions';

const convertStringToFetch = (url) =>
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })

const fetchEndpoints = (allEndpoints) =>
  Promise.all(allEndpoints.map(element => convertStringToFetch(element)))

//thunk
export const fetchUsernameThunk = (username) => {
  return (dispatch) => {
    dispatch(fetchUsernameBegin());
    let resolve = () => dispatch(fetchUsernameSuccess(username));
    let reject = (error) => dispatch(fetchUsernameFailure("Check username"));
    convertStringToFetch(`https://api.github.com/users/${username}${token}`)
    .then(resolve, reject);
  }
}

export const fetchDataThunk = (username) => {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    fetchEndpoints([`https://api.github.com/users/${username}/events${token}`,
      `https://api.github.com/users/${username}/repos${token}`])
    .then(responseArr => {
    //destructure events endpoint for each event
      let events = eventFilter
        .reduce(getReduceCallback(responseArr[0]), {ForkEvent: null, PullRequestEvent: null});

      //destructure repos endpoint for each event
      if(events.ForkEvent.length === 0) {
        events.ForkEvent = responseArr[1]
          .filter(element => element.fork)
          .map((element) => ({repo: element.name}));
      }

      //fetch all pull requests listed and mutate events object
      return fetchEndpoints(events.PullRequestEvent
        .map(element => element.JSONUrl))
      .then(response => {
        events.PullRequestEvent = events.PullRequestEvent.map((element, index) => ({
          ...element,
          status : response[index].state
        }));
        dispatch(fetchDataSuccess(events));
      })
      .catch((error) => {
        console.error("Check pull request endpoints");
        dispatch(fetchDataFailure(error));
      })
    })
    .catch((error) => {
      console.error("Check outer promise endpoint");
      dispatch(fetchDataFailure(error))}
    );
  };
}
